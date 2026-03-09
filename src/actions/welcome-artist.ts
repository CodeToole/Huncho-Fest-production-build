"use server";

import { z } from "zod";
import { resend } from "@/lib/resend";

const welcomeSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  artistName: z.string().trim().optional(),
});

export async function sendWelcomeEmail(email: string, artistName?: string) {
  try {
    const validatedData = welcomeSchema.parse({ email, artistName });
    const displayName = validatedData.artistName || "Artist";

    const { error } = await resend.emails.send({
      from: "Huncho Fest <noreply@hunchofest.com>",
      to: validatedData.email,
      subject: "Welcome to Huncho Fest 2026! 🚀 (Important Next Steps)",
      html: `
        <div style="background-color: #1a1a1a; color: #ffffff; font-family: Helvetica, Arial, sans-serif; padding: 40px 20px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #2a2a2a; border-radius: 16px; padding: 40px; border: 2px solid #701AFF;">
            <h1 style="color: #FFB800; font-size: 32px; font-weight: 900; text-transform: uppercase; margin-top: 0; font-style: italic; letter-spacing: -1px;">
              WHAT'S GOOD, ${displayName.toUpperCase()}! 🔥
            </h1>
            <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.9); margin-bottom: 30px;">
              You're officially locked in for <strong>Huncho Fest 2026</strong>! We're hyped to have you on the roster and can't wait to see you tear up the stage. The city is ready.
            </p>
            
            <div style="background-color: #1a1a1a; padding: 25px; border-radius: 12px; margin-bottom: 30px; text-align: left; border-left: 4px solid #FFB800;">
              <h2 style="color: #FFB800; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 15px; text-transform: uppercase;">
                Important Next Steps
              </h2>
              <ul style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.6; padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 10px;"><strong>Performance Times:</strong> Slot times will be finalized and sent out on <strong>March 10th</strong>.</li>
                <li style="margin-bottom: 10px;"><strong>Promo Assets:</strong> Keep an eye on your inbox! Official promo graphics are dropping soon for you to share with your fans.</li>
                <li style="margin-bottom: 0;"><strong>Arrival Time:</strong> On the day of the fest, please ensure you arrive at least <strong>1 hour before</strong> your set time to check-in and get mic'd up.</li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 40px;">
              If you have any questions before the event, just reply directly to this email.
            </p>

            <p style="font-size: 16px; font-weight: bold; color: rgba(255,255,255,0.9); margin-top: 40px; font-style: italic;">
              Let's make history.<br><br>
              - The Huncho Fest Team
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error sending welcome email:", error);
      return { success: false, message: "Failed to send welcome email." };
    }

    return { success: true, message: "Welcome email sent successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message || "Invalid input data.",
      };
    }

    console.error("Error sending welcome email:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
