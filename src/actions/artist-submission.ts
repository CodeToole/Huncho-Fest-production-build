"use server";

import { db } from "@/lib/firebase/firebase-admin";
import { z } from "zod";
import { resend } from "@/lib/resend";

// Schema for Artist Submission with robust validation
const artistSubmissionSchema = z.object({
  artistName: z.string()
    .min(1, "Artist Name is required")
    .max(100, "Artist Name is too long")
    .trim(),
  email: z.string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  musicLinks: z.string().url().optional().or(z.literal('')),
  city: z.string()
    .min(1, "City is required")
    .trim(),
  numberOfTracks: z.enum(["1 Track", "2 Tracks"]),
  googleDriveLink: z.string()
    .trim()
    .refine(url => {
      if (!url) return true;
      try {
        new URL(url);
        return url.includes("drive.google.com") || url.includes("docs.google.com");
      } catch {
        return false;
      }
    }, {
      message: "If provided, must be a valid Google Drive or Docs link"
    }),
});

export type ArtistSubmission = z.infer<typeof artistSubmissionSchema>;

export async function submitArtist(formData: FormData) {
  try {
    // 1. Extract and Sanitize data
    const rawData = {
      artistName: formData.get("artist_name"),
      email: formData.get("email"),
      musicLinks: formData.get("music_links"),
      city: formData.get("city"),
      googleDriveLink: formData.get("drive_link"),
      numberOfTracks: formData.get("numberOfTracks"),
    };

    // 2. Validate data with Zod
    const validatedData = artistSubmissionSchema.parse(rawData);

    // 3. Perform integrations in parallel (Firestore, Webhook, Resend)
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    const firestorePromise = db.collection("artist_registrations").add({
      ...validatedData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // Waitaminute Data Pipeline: Fire lead to Google Sheets Webhook asynchronously
    const webhookPromise = fetch("https://script.google.com/macros/s/AKfycbw2ULk-jYXsaLzBZi-v9pDAFbMYyHcp8XUAIoxi7dzQOw71NmU11POxSRvwdS9-KOTC1g/exec", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        name: validatedData.artistName,
        email: validatedData.email,
        ig: validatedData.musicLinks || "" // Pushing the music link to the 4th column
      }),
    }).then(res => {
      if (!res.ok) throw new Error(`Webhook responded with status ${res.status}`);
      return res;
    });

    // Capture lead into Resend Audience
    const resendPromise = audienceId
      ? resend.contacts.create({
          email: validatedData.email,
          firstName: validatedData.artistName,
          audienceId: audienceId,
        })
      : Promise.resolve();

    const [firestoreResult, webhookResult, resendResult] = await Promise.allSettled([
      firestorePromise,
      webhookPromise,
      resendPromise,
    ]);

    if (firestoreResult.status === "rejected") {
       throw firestoreResult.reason;
    }

    if (webhookResult.status === "rejected") {
       console.error("Webhook failed, but protecting client revenue - proceeding to checkout.", webhookResult.reason);
    }

    if (resendResult.status === "rejected") {
       console.error("Failed to add artist to Resend Audience:", resendResult.reason);
    }

    return {
      success: true,
      id: firestoreResult.value.id,
      message: "Submission received successfully! We'll reach out soon.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Please correct the errors in the form.",
      };
    }

    console.error("Artist submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
