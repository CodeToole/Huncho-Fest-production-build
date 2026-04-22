"use server";

import { db } from "@/lib/firebase/firebase-admin";
import { z } from "zod";
import { postmarkClient, FROM_EMAIL } from "@/lib/postmark";

// Updated Schema to match the new payload
const artistSubmissionSchema = z.object({
  firstName: z.string()
    .min(1, "First Name is required")
    .trim(),
  lastName: z.string()
    .min(1, "Last Name is required")
    .trim(),
  email: z.string()
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  phone: z.string()
    .min(10, "Phone number is required")
    .trim(),
  trackSelection: z.enum(["1 Track Slot", "2 Track Slot", "3 Track Slot"]),
});

export type ArtistSubmission = z.infer<typeof artistSubmissionSchema>;

export async function submitArtist(formData: FormData) {
  try {
    // 1. Extract and Sanitize data
    const rawData = {
      firstName: String(formData.get("first_name") || "").trim(),
      lastName: String(formData.get("last_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      trackSelection: String(formData.get("trackSelection") || "").trim(),
    };

    // 2. Validate data
    const validatedData = artistSubmissionSchema.parse(rawData);

    // 3. Integrations (Firestore, Google Sheets, Postmark)
    
    // Firestore Promise
    const firestorePromise = db.collection("artist_registrations").add({
      ...validatedData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // Google Sheets Webhook Promise
    const webhookPromise = fetch("https://script.google.com/macros/s/AKfycbw2ULk-jYXsaLzBZi-v9pDAFbMYyHcp8XUAIoxi7dzQOw71NmU11POxSRvwdS9-KOTC1g/exec", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        ...validatedData,
        submission_type: "Artist Registration",
        timestamp: new Date().toISOString()
      }),
    });

    // Internal Notification Email (Postmark)
    const emailPromise = postmarkClient.sendEmail({
      "From": FROM_EMAIL,
      "To": "jay@hunchofest.com", // Jay's primary contact
      "Bcc": "agency@hunchofest.com", // Agency monitoring
      "Subject": `New Artist Registration: ${validatedData.firstName} ${validatedData.lastName}`,
      "TextBody": `New Artist Registration: ${validatedData.firstName} ${validatedData.lastName} has registered for a ${validatedData.trackSelection} slot. Their phone number is ${validatedData.phone} and email is ${validatedData.email}. Please contact them to retrieve their tracks.`,
      "MessageStream": "outbound"
    });

    // Fire all integrations
    const [firestoreResult] = await Promise.allSettled([
      firestorePromise,
      webhookPromise,
      emailPromise
    ]);

    if (firestoreResult.status === "rejected") {
       throw firestoreResult.reason;
    }

    return {
      success: true,
      id: firestoreResult.value.id,
      message: "Artist data synced successfully.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed.",
      };
    }

    console.error("Artist submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred during synchronization.",
    };
  }
}
