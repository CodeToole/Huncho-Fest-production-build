"use server";

import { db } from "@/lib/firebase/firebase-admin";
import { z } from "zod";

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

    // 3. Store in Firestore (Server-side only)
    const submissionRef = await db.collection("artist_registrations").add({
      ...validatedData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // Waitaminute Data Pipeline: Fire lead to Google Sheets Webhook asynchronously
    try {
      await fetch("https://script.google.com/macros/s/AKfycbw2ULk-jYXsaLzBZi-v9pDAFbMYyHcp8XUAIoxi7dzQOw71NmU11POxSRvwdS9-KOTC1g/exec", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          name: formData.get("artist_name"),
          email: formData.get("email"),
          ig: formData.get("music_links") // Pushing the music link to the 4th column
        }),
      });
    } catch (error) {
      console.error("Webhook failed, but protecting client revenue - proceeding to checkout.", error);
    }

    return {
      success: true,
      id: submissionRef.id,
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
