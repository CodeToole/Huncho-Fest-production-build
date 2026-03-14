"use server";

import { db } from "@/lib/firebase/firebase-admin";
import { z } from "zod";
import { postmarkClient, FROM_EMAIL } from "@/lib/postmark";

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
      artistName: String(formData.get("artist_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      musicLinks: String(formData.get("music_links") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      googleDriveLink: String(formData.get("drive_link") || "").trim(),
      numberOfTracks: String(formData.get("numberOfTracks") || "").trim(),
    };

    // 2. Validate data with Zod
    const validatedData = artistSubmissionSchema.parse(rawData);

    // 3. Perform integrations in parallel (Firestore, Webhook, Email)

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
        ig: validatedData.musicLinks || "",
        city: validatedData.city,
        tracks: validatedData.numberOfTracks,
        drive_link: validatedData.googleDriveLink || "",
        submission_type: "Artist Registration"
      }),
    }).then(res => {
      if (!res.ok) throw new Error(`Webhook responded with status ${res.status}`);
      return res;
    });

    // Initialize the client using your secure environment variable
    const postmarkPromise = postmarkClient.sendEmail({
      "From": FROM_EMAIL, // Must be your verified sender
      "To": validatedData.email,
      "Subject": "Huncho Fest: VIP Artist Registration Confirmed",
      "HtmlBody": "<strong>Welcome to the lineup!</strong> Your slot is pending. Complete your payment to lock it in.",
      "MessageStream": "outbound" 
    });

    const [firestoreResult, webhookResult, emailResult] = await Promise.allSettled([
      firestorePromise,
      webhookPromise,
      postmarkPromise,
    ]);

    if (firestoreResult.status === "rejected") {
       throw firestoreResult.reason;
    }

    if (webhookResult.status === "rejected") {
       console.error("Webhook failed, but protecting client revenue - proceeding to checkout.", webhookResult.reason);
    }

    if (emailResult.status === "rejected") {
       console.error("Postmark failed, proceeding to checkout:", emailResult.reason);
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
