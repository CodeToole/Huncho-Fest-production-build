"use server";

import { z } from "zod";
import * as postmark from "postmark";
import { db } from "@/lib/firebase/firebase-admin";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
});

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const rawData = {
      email: String(formData.get("email") || "").trim(),
    };

    const validatedData = newsletterSchema.parse(rawData);

    // Optional legacy steps: Keep Firestore record and Welcome Email
    try {
      await db.collection("newsletter_subscribers").add({
        email: validatedData.email,
        createdAt: new Date().toISOString(),
      });

      const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN || "");
      await postmarkClient.sendEmail({
        From: "info@hunchofest.com",
        To: validatedData.email,
        Subject: "Welcome to the List - Huncho Fest 2026",
        MessageStream: "outbound",
        HtmlBody: `
            <div style="background-color: #1a1a1a; color: #ffffff; font-family: Helvetica, Arial, sans-serif; padding: 40px 20px; text-align: center;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #2a2a2a; border-radius: 16px; padding: 40px; border: 2px solid #701AFF;">
                <h1 style="color: #FFB800; font-size: 32px; font-weight: 900; text-transform: uppercase; margin-top: 0; font-style: italic; letter-spacing: -1px;">
                  Welcome to the Waitaminute Family
                </h1>
                <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.9); margin-bottom: 30px;">
                  You're officially locked in. Get ready for exclusive updates, early access, and behind-the-scenes heat for Huncho Fest 2026.
                </p>
                <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.9); margin-bottom: 40px;">
                  We're bringing the city out. Stay tuned.
                </p>
                <a href="https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/V7YKVUMWICIJ5FGYYJUZOIYU" style="background-color: #FFB800; color: #1a1a1a; padding: 18px 40px; font-size: 20px; font-weight: 900; text-decoration: none; border-radius: 12px; text-transform: uppercase; display: inline-block; box-shadow: 0 0 20px rgba(255, 184, 0, 0.3);">
                  Register to Perform
                </a>
                <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-top: 40px; font-style: italic;">
                  If you have matters to discuss, reply directly to this email.<br><br>
                  - The Waitaminute & Huncho Fest Team
                </p>
              </div>
            </div>
        `,
      });
    } catch (legacyError) {
      console.error("Failed to process default welcome email and firestore insert:", legacyError);
    }

    return {
      success: true,
      message: "Successfully subscribed to the newsletter!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message || "Invalid email format.",
      };
    }

    console.error("Newsletter submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
