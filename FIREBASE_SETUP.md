# Huncho Fest - Firebase Integration

## Setup Instructions

1.  **Firebase Console**:
    -   Create a new project at [Firebase Console](https://console.firebase.google.com/).
    -   Register a "Web" app to get your project ID.
    -   Go to **Project Settings** > **Service Accounts** > **Generate new private key**.
2.  **Environment Variables**:
    -   Create a `.env.local` file in the root directory.
    -   Copy the variables from `.env.local.example`.
    -   Paste your `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` (ensure `
` is preserved).
3.  **Firestore Database**:
    -   Enable Cloud Firestore in your project.
    -   Select "Production Mode" or "Test Mode" (the `firestore.rules` file in this project will override it upon deploy).
4.  **Deployment**:
    -   Install Firebase CLI: `npm install -g firebase-tools` (if not already installed).
    -   Log in: `firebase login`.
    -   Deploy rules: `firebase deploy --only firestore:rules`.

## Project Structure

-   `src/actions/artist-submission.ts`: Secure backend logic for form processing and validation.
-   `src/lib/firebase/firebase-admin.ts`: Firebase Admin SDK initialization.
-   `src/components/ArtistSubmissionForm.tsx`: A robust, styled React form with real-time error feedback.
-   `firestore.rules`: Strict access control to protect your data.
