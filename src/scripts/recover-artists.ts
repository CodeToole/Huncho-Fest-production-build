import { sendRecoveryEmail } from '../actions/send-recovery-email';

// The 15 abandoned carts identified from Analytics and Square [cite: 2026-03-02]
const abandonedArtists = [
    { name: "Artist One", email: "example1@gmail.com", tracks: 1 },
    { name: "Artist Two", email: "example2@gmail.com", tracks: 2 },
    // ... add the rest from your Firebase list [cite: 2026-03-02]
];

async function runRecoveryBlast() {
    console.log("🚀 Starting Waitaminute Recovery Strike...");

    for (const artist of abandonedArtists) {
        // Now passing the tracks argument properly
        const result = await sendRecoveryEmail(artist.email, artist.name, artist.tracks);
        if (result.success) {
            console.log(`✅ Sent to ${artist.name}`);
        } else {
            console.log(`❌ Failed for ${artist.name}:`, result.error);
        }
    }

    console.log("🏁 Blast Complete. Check Resend dashboard for opens.");
}

runRecoveryBlast();
