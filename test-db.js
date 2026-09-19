const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin using environment variables instead of hardcoded service account file
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (projectId && clientEmail && privateKey) {
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
} else {
  initializeApp();
}

const db = getFirestore();

async function ping() {
  const res = await db.collection('artist_registrations').add({
    artistName: 'Test Artist',
    email: 'test@waitaminutedigital.com',
    instagram: '@waitaminute',
    driveLink: 'https://drive.google.com/test',
    timestamp: new Date(),
  });
  console.log('✅ Success! Document ID:', res.id);
}

ping();
