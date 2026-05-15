/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { DeviceChrome } from "#/components/DeviceChrome";
import { Header } from "#/components/Header";

import { SettingsModal } from "#/components/SettingsModal";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { DEVICE_CONFIGS } from "#/lib/devices";
import { historyStorage } from "#/lib/storage";
import { getSpotifyTrack } from "#/server/spotify";
import { CheckIcon, PauseIcon } from "@phosphor-icons/react";

const editorSearchSchema = z.object({
  trackUrl: z.string().optional(),
  device: z.string().optional(),
});

export const Route = createFileRoute("/editor")({
  validateSearch: (search) => editorSearchSchema.parse(search),
  loaderDeps: ({ search: { trackUrl } }) => ({ trackUrl }),
  loader: async ({ deps: { trackUrl } }) => {
    if (!trackUrl) return null;
    return getSpotifyTrack({ data: trackUrl });
  },
  pendingComponent: () => (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4 h-screen bg-background">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-on-surface-variant animate-pulse font-label-md tracking-wider uppercase">
        Fetching Spotify Metadata...
      </p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4 h-screen bg-background text-error">
      <span className="material-symbols-outlined text-6xl">error</span>
      <p className="text-xl text-on-surface">{error.message}</p>
      <Link to="/" className="text-primary hover:underline font-label-md">
        Return to Home
      </Link>
    </div>
  ),
  component: Editor,
});

function Editor() {
  const { trackUrl, device } = Route.useSearch();
  const trackData = Route.useLoaderData();
  const [isSaved, setIsSaved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Editor States
  const [aspectRatio, setAspectRatio] = useState(
    device && DEVICE_CONFIGS[device] ? device : "iphone-16-pro",
  );
  const [timestamp, setTimestamp] = useState("1:10"); // Matched to "Nostalgia" screenshot
  const [systemTime, setSystemTime] = useState(timeNow(DEVICE_CONFIGS[aspectRatio].type === "ios"));
  const [showTime, setShowTime] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  
  // NEW: Vibe State to mimic specific screenshots
  // "red" matches Nostalgia, "blue" matches State of Mind
  const [vibe, setVibe] = useState<"red" | "blue">("red"); 

  function timeNow(isIOS: boolean = false): string {
    const _ = new Date(),
      h = ((_.getHours()<10 && !isIOS)?'0':'') + _.getHours(),
      m = (_.getMinutes()<10?'0':'') + _.getMinutes();
    return `${h}:${m}`;
  }

  const getProgressWidth = () => {
    const [mins, secs] = timestamp.split(":").map(Number);
    if (Number.isNaN(mins) || Number.isNaN(secs)) return "25%";
    const totalSecs = mins * 60 + secs;
    const duration = 105; // 1:45 for Nostalgia
    return `${Math.min(100, (totalSecs / duration) * 100)}%`;
  };

  // Dynamic Gradients based on the two screenshots provided
  const getVibeGradient = () => {
    if (vibe === "red") {
      return "linear-gradient(180deg, #4A1010 0%, #121212 60%)";
    } else {
      return "linear-gradient(180deg, #101a4a 0%, #121212 60%)";
    }
  };

  const getLikeButtonColor = () => {
    return "#121212";
  }

  const exportDimensions = {
    width: DEVICE_CONFIGS[aspectRatio].width * 3,
    height: DEVICE_CONFIGS[aspectRatio].height * 3,
  };

  const handleSave = () => {
    if (!trackUrl || !trackData) return;

    historyStorage.save({
      id: crypto.randomUUID(),
      trackUrl,
      timestamp: Date.now(),
      metadata: {
        title: trackData.title,
        artist: trackData.artist,
        albumArt: trackData.albumArt,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Fallback / Default Artwork if no track loaded
  const defaultAlbumArt = vibe === "red" 
    ? "https://i.scdn.co/image/ab67616d0000b27386e65e6133437614922e688d" // Placeholder similar to Nostalgia
    : "https://i.scdn.co/image/ab67616d0000b273b05a30115a355f280920758c"; // Placeholder blue/artistic

  const displayTitle = trackData?.title || (vibe === "red" ? "Nostalgia" : "STATE OF MIND");
  const displayArtist = trackData?.artist || (vibe === "red" ? "Zinoleesky" : "DJ Tunez, Wizkid");
  const displayArt = trackData?.albumArt || defaultAlbumArt;

  return (
    <div className="flex flex-col h-screen bg-background text-on-surface font-body-md overflow-hidden">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />

      <div className="flex flex-1 mt-16 h-[calc(100vh-64px)] w-full overflow-hidden">
        {/* SideNavBar */}
        <aside className="fixed left-0 top-16 bottom-0 w-sidebar-width flex flex-col p-4 border-r border-white/10 bg-surface-container z-40">
          {/* Header/Profile */}
          <div className="flex items-center gap-3 mb-8 px-2 py-4 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-white/10 overflow-hidden shrink-0">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuZQvUDIr14wpw_fE3SNPRrEerl9wCxWfrpfNx7DyoqIZsnCmpZEC204icWTBgEdXNvU9vWgEsgEkhgoH8jZyOFEpeyLTTQGakFk3reRRcHr9n68SMPKMPezik0sMi9UiyDFgj5RccvMPSOnkaaYLJnReeadOlzufRzWurRj1oIVj0Msy-yIklA0DqXhDP9aZhFI3ESp-eehRt-sjpiu2Y98X7KVaykDmLCCI271xlSaubU5DHo-Gr8eURqfydCBTYBIEQeW7lrzY"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface line-clamp-1">
                Project Alpha
              </span>
              <span className="font-label-sm text-on-surface-variant">
                Spotify Mobile Layout
              </span>
            </div>
          </div>
          {/* Navigation Tabs */}
          <nav className="flex flex-col gap-2 flex-1 font-hanken text-label-md">
            <Link
              to="/editor"
              activeProps={{
                className: "bg-secondary-container text-primary translate-x-1",
              }}
              inactiveProps={{
                className:
                  "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest",
              }}
              className="flex items-center gap-4 rounded-lg px-4 py-3 transition-transform"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                auto_awesome
              </span>
              Generator
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-4 px-4 py-3 h-auto text-on-surface-variant hover:text-on-surface"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                layers
              </span>
              Layers
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-4 px-4 py-3 h-auto text-on-surface-variant hover:text-on-surface"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                ios_share
              </span>
              Export
            </Button>
            <Link
              to="/history"
              activeProps={{
                className: "bg-secondary-container text-primary translate-x-1",
              }}
              inactiveProps={{
                className:
                  "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest",
              }}
              className="flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                history
              </span>
              History
            </Link>
          </nav>
          {/* CTA */}
          <div className="mt-auto pt-4">
            <Button size="lg" className="w-full h-auto py-3">
              <span className="material-symbols-outlined text-[18px] mr-2">
                play_arrow
              </span>
              Generate Now
            </Button>
          </div>
        </aside>

        {/* Main Workspace Canvas */}
        <main className="ml-sidebar-width flex-1 flex h-full relative bg-background overflow-hidden">
          <div className="flex-1 flex flex-col relative pt-100 overflow-auto h-full animate-in fade-in duration-500 custom-scrollbar">
            <div className="min-h-full flex items-center justify-center p-12 lg:p-20">
              {/* Atmospheric Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#B02626]/10 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
              <div className="absolute top-1/3 left-1/3 w-100 h-100 bg-[#1a1a1a]/30 rounded-full blur-[80px] pointer-events-none"></div>

              <DeviceChrome
                device={DEVICE_CONFIGS[aspectRatio]}
                showTime={showTime}
                showStatus={showStatus}
                systemTime={systemTime}
                bg={getVibeGradient}
              >
                {/* HIGH FIDELITY SPOTIFY SCREEN */}
                <div 
                  className="w-full h-full flex flex-col text-white relative pt-16"
                  style={{ background: getVibeGradient() }}
                >
                  {/* 1. Top Navigation Bar */}
                  <div className="flex justify-between items-center px-6 py-4 z-20">
                    <span className="material-symbols-outlined text-[28px] cursor-pointer">keyboard_arrow_down</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-70 text-center">
                      Playing from playlist
                    </span>
                    <span className="material-symbols-outlined text-[28px] cursor-pointer">more_horiz</span>
                  </div>

                  {/* 2. Album Art */}
                  {/* Shadow logic: Large diffused shadow at bottom, smaller sharp shadow for depth */}
                  <div className="px-6 mb-8 z-10">
                    <div className="w-full aspect-square bg-[#222] rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden relative">
                        {/* Inner subtle shine on the art */}
                        <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none z-10"></div>
                        <img
                          alt="Album Cover"
                          className="w-full h-full object-cover"
                          src={displayArt}
                        />
                    </div>
                  </div>

                  {/* 3. Track Info & Action Row */}
                  <div className="px-8 flex justify-between items-end mb-8 z-10">
                    <div className="flex-1 mr-4 overflow-hidden">
                      <h1 className="text-[26px] font-bold leading-tight mb-1 text-white truncate tracking-tight">
                        {displayTitle}
                      </h1>
                      <p className="text-[17px] text-white/70 font-medium truncate">
                        {displayArtist}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <CheckIcon alt="Like" className="w-5 h-5" style={{ color: getLikeButtonColor() }} size={4} />
                    </div>
                  </div>

                  {/* 4. Scrubber / Progress Bar */}
                  <div className="w-full mb-8 px-8 group cursor-pointer z-10">
                    {/* The track */}
                    <div className="w-full h-[4px] bg-white/20 rounded-full relative overflow-hidden">
                      {/* The fill */}
                      <div
                        className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1DB954] transition-colors duration-200"
                        style={{ width: getProgressWidth() }}
                      />
                      {/* The handle (thumb) - invisible by default, shows on hover */}
                      <div
                        className="absolute top-1/2 -mt-1.5 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ left: `calc(${getProgressWidth()} - 6px)` }}
                      />
                    </div>
                    {/* Timestamps */}
                    <div className="flex justify-between text-[11px] text-white/60 font-medium mt-2 font-mono tracking-wide">
                      <span>{timestamp}</span>
                      <span>1:45</span>
                    </div>
                  </div>

                  {/* 5. Playback Controls */}
                  <div className="flex justify-between items-center w-full px-8 mb-10 z-10">
                    <LocalIcon name="shuffle" alt="Shuffle" className="w-7 h-7 bg-white opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                    <LocalIcon name="previous" alt="Previous" className="w-7 h-7 bg-white hover:scale-105 transition-transform cursor-pointer" />
                    {/* Play/Pause Button */}
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-white/10">
                      {/* <LocalIcon name="pause" alt="Pause" className="w-8 h-8" /> */}
                      <PauseIcon alt="Pause" className="w-5 h-5" size={6} />
                    </div>
                    <LocalIcon name="next" alt="Next" className="w-7 h-7 bg-white hover:scale-105 transition-transform cursor-pointer" />
                    <LocalIcon name="repeat" alt="Repeat" className="w-7 h-7 bg-white opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>

                  {/* 6. Bottom Context Actions (Devices, Share, Queue) */}
                  <div className="mt-auto flex justify-between items-center px-8 pb-12 z-10">
                    <LocalIcon name="connecttoadevice" alt="Devices" className="w-6 h-6 bg-white opacity-95 hover:opacity-100 transition-opacity cursor-pointer" />
                    <div className="flex gap-8">
                      <LocalIcon name="share" alt="Share" className="w-6 h-6 bg-white opacity-95 hover:opacity-100 transition-opacity cursor-pointer" />
                      <LocalIcon name="queue" alt="Queue" className="w-6 h-6 bg-white opacity-95 hover:opacity-100 transition-opacity cursor-pointer" />
                    </div>
                  </div>
                </div>
              </DeviceChrome>
            </div>
          </div>

          {/* Live Indicator Chip */}
          <div className="absolute top-6 right-6 bg-surface-container/80 backdrop-blur-md border border-primary/30 text-primary font-label-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_12px_rgba(83,224,118,0.15)] z-20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            Preview Live
          </div>
        </main>

        {/* Right Control Panel */}
        <aside className="w-[320px] bg-surface-container glass-overlay border-l border-white/5 h-full flex flex-col z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-label-md text-on-surface uppercase tracking-wider">
              Canvas Controls
            </h3>
            <Button variant="ghost" size="icon">
              <span className="material-symbols-outlined text-[20px]">
                more_vert
              </span>
            </Button>
          </div>
          <div className="p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar flex-1">
            
            {/* vibe Selector */}
            <div className="flex flex-col gap-3">
              <label className="font-label-md text-on-surface-variant">
                Screenshot Vibe
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={vibe === "red" ? "default" : "outline"}
                  className="h-auto py-3 font-label-sm"
                  onClick={() => setVibe("red")}
                >
                  Nostalgia (Red)
                </Button>
                <Button 
                  variant={vibe === "blue" ? "default" : "outline"}
                  className="h-auto py-3 font-label-sm"
                  onClick={() => setVibe("blue")}
                >
                  State of Mind (Blue)
                </Button>
              </div>
            </div>

            {/* Aspect Ratio Control */}
            <div className="flex flex-col gap-3">
              <label className="font-label-md text-on-surface-variant">
                Device Model
              </label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="w-full bg-surface-container-lowest border-white/10 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-auto">
                  <SelectValue placeholder="Select device model..." />
                </SelectTrigger>
                <SelectContent className="bg-surface-container-lowest cursor-pointer">
                  {Object.entries(DEVICE_CONFIGS).map(([id, config]) => (
                    <SelectItem key={id} value={id}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timestamp Control */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-on-surface-variant">
                  Timestamp
                </label>
                <span className="text-xs text-tertiary-container font-mono bg-surface-container-highest px-2 py-0.5 rounded">
                  MM:SS
                </span>
              </div>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant group-focus-within:text-primary transition-colors text-[18px]">
                  schedule
                </span>
                <Input
                  className="w-full bg-surface-container-lowest border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all h-auto"
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                />
              </div>
              <p className="font-label-sm text-on-surface-variant/70 mt-1">
                Adjusts the progress bar position.
              </p>
            </div>

            {/* System Time Control */}
            <div className="flex flex-col gap-3">
              <label className="font-label-md text-on-surface-variant">
                System Time
              </label>
              <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant group-focus-within:text-primary transition-colors text-[18px]">
                  history
                </span>
                <Input
                  className="w-full bg-surface-container-lowest border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all h-auto"
                  type="text"
                  value={systemTime}
                  onChange={(e) => setSystemTime(e.target.value)}
                />
              </div>
            </div>

            {/* Status Bar Toggles */}
            <div className="flex flex-col gap-3">
              <label className="font-label-md text-on-surface-variant">
                Status Bar Toggles
              </label>
              <div className="flex flex-col gap-3 bg-surface-container-lowest border border-white/5 rounded-lg p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-on-surface font-body-md text-sm">
                    Show Time
                  </span>
                  <input
                    checked={showTime}
                    onChange={(e) => setShowTime(e.target.checked)}
                    className="w-4 h-4 rounded text-primary bg-surface-container-highest border-white/10 focus:ring-primary focus:ring-offset-surface-container"
                    type="checkbox"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-on-surface font-body-md text-sm">
                    Show Battery & Signals
                  </span>
                  <input
                    checked={showStatus}
                    onChange={(e) => setShowStatus(e.target.checked)}
                    className="w-4 h-4 rounded text-primary bg-surface-container-highest border-white/10 focus:ring-primary focus:ring-offset-surface-container"
                    type="checkbox"
                  />
                </label>
              </div>
            </div>

            {/* Quality Settings */}
            <div className="flex flex-col gap-3">
              <label className="font-label-md text-on-surface-variant">
                Export Resolution
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-2 font-label-sm">
                  1x (HD)
                </Button>
                <Button
                  variant="secondary"
                  className="h-auto py-2 font-label-sm"
                >
                  2x (Retina)
                </Button>
              </div>
            </div>
          </div>
          
          {/* Primary Action Area */}
          <div className="p-6 mt-auto border-t border-white/5 bg-surface-container-lowest/50 space-y-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSave}
              disabled={isSaved || !trackData}
              className="w-full h-auto py-4 font-headline-md text-base"
            >
              <span className="material-symbols-outlined text-[20px] mr-2">
                {isSaved ? "check" : "bookmark"}
              </span>
              {isSaved ? "Saved to Library" : "Save to Library"}
            </Button>
            <Button
              size="lg"
              className="w-full h-auto py-4 font-headline-md text-base shadow-[0_4px_14px_rgba(83,224,118,0.2)]"
            >
              <span className="material-symbols-outlined text-[20px] mr-2">
                download
              </span>
              Download PNG
            </Button>
            <p className="text-center font-label-sm text-on-surface-variant/60 pt-1">
              {exportDimensions.width} x {exportDimensions.height} px •{" "}
              {(
                (exportDimensions.width * exportDimensions.height * 4) /
                (1024 * 1024)
              ).toFixed(1)}{" "}
              MB
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LocalIcon({
  name,
  className,
  alt,
}: {
  name: string;
  className?: string;
  alt?: string;
}) {
  return (
    <div
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={alt}
      style={{
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(/icons/${name}.svg)`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}