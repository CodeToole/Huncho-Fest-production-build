import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import { db } from '../lib/firebase/firebase-admin';

async function listLiveArtists() {
    console.log("Fetching live artists...");
    try {
        const snapshot = await db.collection("artist_registrations").get();
        let count = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`- Artist: ${data.artistName || 'N/A'} | Email: ${data.email || 'N/A'} | Tracks: ${data.numberOfTracks || 'N/A'}`);
            count++;
        });

        console.log(`\nTotal registrations: ${count}`);
    } catch (error) {
        console.error("Error fetching artists:", error);
    }
}

listLiveArtists();
