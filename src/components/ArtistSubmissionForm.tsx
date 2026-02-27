"use client";

import { useState } from "react";
import { submitArtist } from "@/actions/artist-submission";

export default function ArtistSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitArtist(formData);

    setLoading(false);

    if (result.success) {
      setSuccess(result.message);
      e.currentTarget.reset();
    } else {
      setErrors(result.errors || {});
      alert(result.message);
    }
  };

  return (
    <section className="p-8 max-w-lg mx-auto bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Huncho Fest Artist Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Artist Name</label>
          <input
            name="artistName"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Huncho the Artist"
          />
          {errors.artistName && <p className="text-red-400 text-xs mt-1">{errors.artistName[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="contact@huncho.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instagram Handle</label>
          <input
            name="instagramHandle"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="@huncho_fest"
          />
          {errors.instagramHandle && <p className="text-red-400 text-xs mt-1">{errors.instagramHandle[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Google Drive Link (EPK/Tracks)</label>
          <input
            name="googleDriveLink"
            type="url"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="https://drive.google.com/..."
          />
          {errors.googleDriveLink && <p className="text-red-400 text-xs mt-1">{errors.googleDriveLink[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-lg font-bold transition-all shadow-lg active:scale-95"
        >
          {loading ? "Submitting..." : "Submit Submission"}
        </button>

        {success && (
          <div className="mt-6 p-4 bg-green-900/40 border border-green-500 rounded text-green-400 text-center animate-pulse">
            {success}
          </div>
        )}
      </form>
    </section>
  );
}
