"use client";

import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-charcoal/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
      <a
        href="/"
        className="text-2xl md:text-3xl font-black text-gold uppercase tracking-tighter"
      >
        HUNCHO FEST
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-10 items-center">
        <a
          href="#media"
          className="text-sm font-black text-white/80 hover:text-gold uppercase tracking-widest transition-colors"
        >
          Media
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-gold hover:text-white transition-colors p-2 rounded-xl bg-white/5"
        aria-label="Toggle mobile menu"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mobileOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-charcoal/95 backdrop-blur-xl border-b border-white/5 py-6 px-6 md:hidden">
          <a
            href="#media"
            className="block text-sm font-black text-white/80 hover:text-gold uppercase tracking-widest transition-colors py-3"
            onClick={() => setMobileOpen(false)}
          >
            Media
          </a>
        </div>
      )}
    </nav>
  );
}
