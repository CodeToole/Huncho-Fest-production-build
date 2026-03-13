"use server";

import * as postmark from "postmark";

export async function sendRecoveryEmail(email: string, name: string, tracks: number) {
  try {
    const checkoutUrl = tracks === 2
      ? "https://square.link/u/FmIxZoXc?src=sheet"
      : "https://square.link/u/hy2YzQ0o?src=sheet";
    const priceText = tracks === 2 ? "$100 for 2 tracks" : "$60 for 1 track";

    const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN || "");
    const data = await postmarkClient.sendEmail({
      From: "hello@waitaminutedigital.com",
      To: email,
      Subject: "Complete Your Registration - Huncho Fest 2026",
      MessageStream: "outbound",
      HtmlBody: `
        <div style="background-color: #1a1a1a; color: #ffffff; font-family: Helvetica, Arial, sans-serif; padding: 40px 20px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #2a2a2a; border-radius: 16px; padding: 40px; border: 2px solid #701AFF;">
            <h1 style="color: #FFB800; font-size: 32px; font-weight: 900; text-transform: uppercase; margin-top: 0; font-style: italic; letter-spacing: -1px;">
              Don't Miss the Main Stage, ${name}!
            </h1>
            <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.9); margin-bottom: 30px;">
              We noticed you started your registration for Huncho Fest 2026 but didn't quite cross the finish line. The stage is calling, and spots are filling up fast.
            </p>
            <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.9); margin-bottom: 20px;">
              Lock in your performance slot now and show Mobile, AL what you're made of. Minutes matter—don't wait.
            </p>
            <p style="font-size: 20px; font-weight: bold; color: #FFB800; margin-bottom: 30px;">
              Registration Fee: ${priceText}
            </p>
            <a href="${checkoutUrl}" style="background-color: #FFB800; color: #1a1a1a; padding: 18px 40px; font-size: 20px; font-weight: 900; text-decoration: none; border-radius: 12px; text-transform: uppercase; display: inline-block; box-shadow: 0 0 20px rgba(255, 184, 0, 0.3);">
              Complete Registration
            </a>
            <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-top: 40px; font-style: italic;">
              If you have any questions, reply directly to this email. We're here to help you get the mic.<br><br>
              - The Waitaminute & Huncho Fest Team
            </p>
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send recovery email:", error);
    return { success: false, error };
  }
}
