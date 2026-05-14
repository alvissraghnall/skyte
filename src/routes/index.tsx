import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState("mobile-ui");
  const navigate = useNavigate();

  const handleGenerate = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (url) {
      navigate({ to: "/editor", search: { trackUrl: url } });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md flex flex-col overflow-x-hidden">
      {/* TopNavBar */}
      <header className="bg-surface flex justify-between items-center w-full px-margin-page h-16 border-b border-white/5 fixed top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-headline-md font-metropolis font-black text-primary tracking-tighter hover:opacity-80 transition-opacity"
          >
            SKYTE
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              to="/editor"
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            >
              Editor
            </Link>
            <Link
              to="/history"
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            >
              UI Library
            </Link>
            <Link
              to="/showcase"
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            >
              Showcase
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary font-label-md px-6 py-2 rounded-full hover:bg-primary-fixed transition-all font-bold scale-95 active:opacity-80">
            Go Pro
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-margin-page pt-32 pb-24">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-24 relative z-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background blur-3xl opacity-50 pointer-events-none"></div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="font-display-lg text-display-lg text-white mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
              1:1 <span className="text-primary">UI REPLICATION.</span>
              <br />
              PIXEL-PERFECT SPOTIFY SCREENSHOTS.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Paste any Spotify URL to instantly generate high-fidelity, flat UI
              screenshots. Export pure interface designs for your case studies
              or development reference.
            </p>

            {/* Input Form Card */}
            <div className="w-full max-w-3xl bg-surface-container rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
              <form
                onSubmit={handleGenerate}
                className="relative z-10 flex flex-col md:flex-row gap-4 items-center"
              >
                <div className="flex-grow w-full relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                    link
                  </span>
                  <input
                    type="text"
                    placeholder="Paste Spotify track URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-xl py-4 pl-12 pr-4 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 shadow-inner"
                  />
                </div>
                <div className="w-full md:w-auto relative">
                  <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full md:w-56 appearance-none bg-surface border border-white/10 rounded-xl py-4 pl-4 pr-10 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer transition-all shadow-inner"
                  >
                    <option value="mobile-ui">Mobile UI (9:16)</option>
                    <option value="desktop-ui">Desktop UI (16:9)</option>
                    <option value="tablet-ui">Tablet UI (4:3)</option>
                    <option value="raw-asset">Raw Asset Export</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                    expand_more
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-on-primary font-label-md font-bold px-8 py-4 rounded-xl hover:bg-primary-fixed active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_4px_20px_rgba(83,224,118,0.3)] hover:shadow-[0_4px_30px_rgba(83,224,118,0.5)]"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    capture
                  </span>
                  Generate UI
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* UI Screenshot Section (Bento Grid) */}
        <section className="mb-24 animate-in fade-in duration-1000 delay-300">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">
                RECENT UI REPLICATIONS
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Flat, front-facing UI exports for professional workflows.
              </p>
            </div>
            <Link
              to="/showcase"
              className="hidden md:flex items-center gap-2 text-primary font-label-md hover:text-primary-fixed transition-colors"
            >
              Browse UI Gallery{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
            {/* Large Featured UI Export */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-container rounded-2xl overflow-hidden relative group border border-white/5">
              <div className="absolute inset-0 p-8 flex items-center justify-center bg-surface-container-low">
                <img
                  alt="Mobile UI Screenshot"
                  className="h-full w-auto object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6DgeFxCDb0FHNaiBbpZ-hTxGbhD2C4alhVag35MfsW95HqwOYq7GeNNYcoF-T3xBhqG5Cd0JwAqbmEPOPxfoF3EKGyiV-MmYfrW1KMvx8XSlsWhi4_OAAXFuQNFI3B49Puiq4qq0P-4c1sYY7wcd5FHxhKdoCn7HbP3rfx6F1Ho1B8jiqvrIxDY7wB-oLWOylt6HSI2_M-GphWTlZs945kLqnbKGiDne5iTBE1IRqQz4pb77oCbkSX5ezzGpc0cRJ16auyuJIH4E"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-primary font-label-sm mb-3 border border-primary/20">
                    1:1 Replication
                  </div>
                  <h3 className="font-headline-md text-white">
                    Now Playing - Mobile UI
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-surface-container-highest backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-white/10">
                    <span className="material-symbols-outlined">
                      content_copy
                    </span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-fixed transition-colors shadow-lg">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Small UI Card 1 - Desktop */}
            <div className="bg-surface-container rounded-2xl overflow-hidden relative group border border-white/5">
              <div className="absolute inset-0 p-4 flex items-center justify-center bg-surface-container-low">
                <img
                  alt="Desktop UI Export"
                  className="w-full h-auto object-contain shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1s_WUBJsJycGJx5YjvajK7VUg3skGwY1p7GxQ23QD8jhsnlr5dEZNC8MU0y0OJMWH5w52hsd9kLVTIsIldNBqwYMGaYVCYI96j3UMsc_5L4j6xgRBLmZ22O5qqHRkj6-qfSU-4tLoALV62kaxzPmrSP__FK5AEwNIWsqJwxGQfEQAto0Xt0rIffs7WRD4ADIR_QlrtUgAbtgwzuFG9ykTMYrdM5gAY67XMP0yHAraslCh9HCL_FBMk8wEOqJEdvOdvYFqTCKKbjY"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <h3 className="font-label-md text-white uppercase tracking-wider">
                  Artist Page - Desktop
                </h3>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>

            {/* Small UI Card 2 - Playlist */}
            <div className="bg-surface-container rounded-2xl overflow-hidden relative group border border-white/5">
              <div className="absolute inset-0 p-4 flex items-center justify-center bg-surface-container-low">
                <img
                  alt="Playlist UI Export"
                  className="h-full w-auto object-contain shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4G10JCPl_Mbuaga-zjsRY2rHBtUkzEsy4KXLZubZxlLc-D-0KAca27sYtJJPuJHDUAz8YVkPrFj_kkPTB1VUqqK-TNUaZuj0UkJKZQ4tgTIDdENaQrm_DcEfnEwht-uLs37bvC7La9VEwW9x8a4gzoYDWvS2P4g9s4F72x9PbOfaqiskkJBuSa62e1vSAPpFZlZ3QzCaCxZqZvYD6pOjmQdf7Czkh89soyEo7vCw55gm34UT_SgMYPl628dsiDyEoHNtGLaC0FpY"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <h3 className="font-label-md text-white uppercase tracking-wider">
                  Playlist - Tablet
                </h3>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background text-on-surface-variant font-hanken text-label-sm py-8 border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity w-full px-margin-page flex justify-between items-center z-10">
        <div>&copy; 2026 SKYTE. Not affiliated with Spotify AB.</div>
        <nav className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            API Documentation
          </a>
        </nav>
      </footer>
    </div>
  );
}
