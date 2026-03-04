"use server";

import { db } from "@/lib/firebase/firebase-admin";
import { resend } from "@/lib/resend";

export async function submitNewsletter(formData: FormData) {
    try {
        const email = formData.get("email") as string;

        if (!email) {
            return { success: false, message: "Missing email field" };
        }

        const data = {
            email: email.toLowerCase(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("newsletter_subscribers").add(data);

        // Send Welcome Email
        try {
            await resend.emails.send({
                from: "Huncho Fest <noreply@hunchofest.com>",
                to: email.toLowerCase(),
                subject: "Welcome to the List - Huncho Fest 2026",
                html: `
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
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // We don't fail the whole user operation just because the email failed
        }

        return { success: true };
    } catch (error) {
        console.error("Newsletter submission error:", error);
        return { success: false, message: "Server error" };
    }
}
