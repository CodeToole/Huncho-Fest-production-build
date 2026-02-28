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
  musicLinks: z.string()
    .trim()
    .url("Invalid URL format"),
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

    // 3. Store in Firestore (Server-side only)
    const submissionRef = await db.collection("artist_registrations").add({
      ...validatedData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // 4. Trigger Firebase Email Extension
    try {
      // Map validated data to expected payload variables
      const submissionData = {
        emailAddress: validatedData.email,
        artistGroupName: validatedData.artistName
      };

      await db.collection('mail').add({
        to: submissionData.emailAddress,
        message: {
          subject: "Registration Confirmed - Huncho Fest 2026",
          html: "<h1>You're Locked In!</h1><p>Thank you for registering for Huncho Fest, " + submissionData.artistGroupName + ".</p><p>We have successfully received your information and track selection.</p><p>If you have any questions, reply directly to this email.</p><br><p>- The Huncho Fest Team</p>"
        }
      });
    } catch (emailError) {
      console.error("Failed to queue confirmation email:", emailError);
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
