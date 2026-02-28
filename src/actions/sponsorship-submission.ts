"use server";

import { db } from "@/lib/firebase/firebase-admin";

export async function submitSponsorship(formData: FormData) {
    try {
        const data = {
            businessName: formData.get("businessName") as string,
            contactEmail: (formData.get("contactEmail") as string).toLowerCase(),
            howCanWeHelp: formData.get("howCanWeHelp") as string,
            timestamp: new Date().toISOString(),
        };

        if (!data.businessName || !data.contactEmail || !data.howCanWeHelp) {
            return { success: false, message: "Missing required fields" };
        }

        await db.collection("sponsorship_inquiries").add(data);

        return { success: true };
    } catch (error) {
        console.error("Sponsorship submission error:", error);
        return { success: false, message: "Server error" };
    }
}
