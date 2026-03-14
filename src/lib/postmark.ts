import * as postmark from "postmark";

const serverToken = process.env.POSTMARK_SERVER_TOKEN;

if (!serverToken) {
  console.warn("POSTMARK_SERVER_TOKEN is not defined in environment variables.");
}

export const postmarkClient = new postmark.ServerClient(serverToken || "");

export const FROM_EMAIL = "info@hunchofest.com";
