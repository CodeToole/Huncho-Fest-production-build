# Waitaminute Digital - Battlefield Log
## Agency-Grade Security & Architecture Audit
**Project:** @CodeToole/the-actors-collection-live (Huncho Fest)
**Audited By:** Jules

### 1. Secret Leak Detection
**Vulnerability:** A hardcoded Resend API key was found tracked in the `.env.local` file.
**Impact:** Exposes the project's email-sending capabilities and infrastructure to unauthorized actors if the codebase is shared or if the file is tracked in git.
**Fix:** The `.env.local` file was removed from git tracking (`git rm --cached .env.local`) since it's already in `.gitignore`. Secrets should be properly injected via `.env` files that remain strictly untracked or via a secrets manager like Vercel or Firebase Secret Manager.
**Production-Ready Patch (Git Command):**
```bash
git rm --cached .env.local
```

### 2. Redirect Failsafe Audit
**Vulnerability:** In `src/components/ArtistRegistration.tsx`, the `submitArtist(formData)` was being fired asynchronously but not awaited, and a `setTimeout` of 2 seconds was hardcoded to run the checkout redirect ("The Unstoppable Square Redirect"). This introduces a race condition where the lead capture could fail entirely if the network was slow, or block execution prematurely. (Note: The prompt referenced `LeadCaptureForm.tsx` and `CheckInDash.tsx`, but the exact logic matching the audit resided in `ArtistRegistration.tsx`).
**Impact:** Loss of leads/revenue.
**Fix:** Wrapped the submission call in a `try/catch/finally` block. The redirect logic has been housed inside the `finally` block to guarantee it runs *after* the database sync attempts, without relying on an arbitrary timer.
**Production-Ready Patch:**
```tsx
// src/components/ArtistRegistration.tsx
    try {
      // 2. Fire to database but await to ensure no race conditions before redirect
      await submitArtist(formData);
    } catch (err) {
      console.error("Database sync skipped or failed:", err);
    } finally {
      // Save pending artist data for post-checkout welcome email
      const artistName = formData.get("artist_name") as string;
      const email = formData.get("email") as string;
      if (artistName) localStorage.setItem("hf_pending_artist_name", artistName);
      if (email) localStorage.setItem("hf_pending_artist_email", email);

      // 3. The Unstoppable Square Redirect - Now in finally block
      if (numberOfTracks === "1 Track") {
        window.location.assign("https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/V7YKVUMWICIJ5FGYYJUZOIYU?src=sheet");
      } else {
        window.location.assign("https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/KONZMQ5K3W7JOFYQ4VWUHTND?src=sheet");
      }
    }
```

### 3. Input Sanitization
**Vulnerability:** Across the server actions (`artist-submission.ts`, `newsletter-submission.ts`, and `welcome-artist.ts`), data coming directly from `formData.get()` and parameters were not being wrapped in `String().trim()`. Though Zod was applying some validation, directly parsing `formData.get()` without sanitizing to string first can lead to NoSQL injection patterns or Firestore serialization crashes with unexpected object payloads.
**Impact:** Malicious payloads could bypass schema restrictions, crashing the API route or polluting Firestore.
**Fix:** Explicitly wrapped every form entry in `String(value || "").trim()` before feeding it to Zod.
**Production-Ready Patch:**
```typescript
// Example from src/actions/artist-submission.ts
    // 1. Extract and Sanitize data
    const rawData = {
      artistName: String(formData.get("artist_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      musicLinks: String(formData.get("music_links") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      googleDriveLink: String(formData.get("drive_link") || "").trim(),
      numberOfTracks: String(formData.get("numberOfTracks") || "").trim(),
    };
```

### 4. Wasm Compatibility (Future Proofing)
**Audit Finding:** The prompt requested to identify if the current `/door` route structure can be migrated to Flutter WebAssembly without breaking existing Firestore listeners.
**Status:** During the repository scan, no `/door` route or related files were identified in the standard `src/app` or components directory.
**Architectural Recommendation:** Should a `/door` route be implemented in the future, transitioning it to Flutter WebAssembly will rely on a new Dart-based Firestore SDK implementation. To avoid breaking existing Next.js/React listeners, you will need to decouple your Real-time Firestore snapshot listeners to a separate backend microservice or stick to standard HTTP/REST polling for the WebAssembly boundary if Dart interoperability becomes a bottleneck.
