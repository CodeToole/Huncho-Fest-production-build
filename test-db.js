const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// This uses your local service account credentials
const serviceAccount = require('./service-account.json'); 

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function ping() {
  const res = await db.collection('artist_registrations').add({
    artistName: 'Test Artist',
    email: 'test@waitaminutedigital.com',
    instagram: '@waitaminute',
    driveLink: 'https://drive.google.com/test',
    timestamp: new Date()
  });
  console.log('✅ Success! Document ID:', res.id);
}

ping();
