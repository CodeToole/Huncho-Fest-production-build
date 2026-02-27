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
  instagramHandle: z.string()
    .min(1, "Instagram Handle is required")
    .regex(/^@?[\w.]+$/, "Invalid Instagram Handle format")
    .transform(val => val.startsWith("@") ? val : `@${val}`)
    .trim(),
  googleDriveLink: z.string()
    .url("Invalid Google Drive Link")
    .refine(url => url.includes("drive.google.com") || url.includes("docs.google.com"), {
      message: "Must be a valid Google Drive or Docs link"
    })
    .trim(),
});

export type ArtistSubmission = z.infer<typeof artistSubmissionSchema>;

export async function submitArtist(formData: FormData) {
  try {
    // 1. Extract and Sanitize data
    const rawData = {
      artistName: formData.get("artistName"),
      email: formData.get("email"),
      instagramHandle: formData.get("instagramHandle"),
      googleDriveLink: formData.get("googleDriveLink"),
    };

    // 2. Validate data with Zod
    const validatedData = artistSubmissionSchema.parse(rawData);

    // 3. Store in Firestore (Server-side only)
    const submissionRef = await db.collection("submissions").add({
      ...validatedData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

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
