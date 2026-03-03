"use server";

import { db } from "@/lib/firebase/firebase-admin";

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

        return { success: true };
    } catch (error) {
        console.error("Newsletter submission error:", error);
        return { success: false, message: "Server error" };
    }
}
