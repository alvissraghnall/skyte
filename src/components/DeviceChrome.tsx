/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { DeviceConfig } from "#/lib/devices";

interface DeviceChromeProps {
  device: DeviceConfig;
  showTime: boolean;
  showStatus: boolean;
  systemTime: string;
  children: ReactNode;
  bg?: () => string;
}

export function DeviceChrome({
  device,
  showTime,
  showStatus,
  systemTime,
  children,
  bg
}: DeviceChromeProps) {
  const isIOS = device.type === "ios";

  return (
    <div
      className="relative shrink-0 flex flex-col z-10 transition-all duration-300 hover:scale-[1.01]"
      style={{
        width: device.width,
        height: device.height,
        borderRadius: device.cornerRadius,
        // Layered box shadow: outer glow, frame depth, drop shadow
        boxShadow: [
          `0 0 0 1px rgba(255,255,255,0.08)`,
          `0 0 0 9px #111`,
          `0 0 0 10px rgba(255,255,255,0.06)`,
          `0 32px 80px rgba(0,0,0,0.7)`,
          `0 8px 24px rgba(0,0,0,0.5)`,
        ].join(", "),
        overflow: "hidden",
        background: bg?.(),
      }}
    >
      {/* Screen glare / reflection — top-left diagonal sheen */}
      <div
        className="absolute inset-0 pointer-events-none z-[70]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 25%, transparent 50%)",
          borderRadius: device.cornerRadius,
        }}
      />

      {/* Hardware Features (Notch / Island / Punch-hole) */}
      <DeviceHardware device={device} />

      {/* Status Bar */}
      <StatusBar
        device={device}
        showTime={showTime}
        showStatus={showStatus}
        systemTime={systemTime}
      />

      {/* Screen content */}
      <div className="flex-1 w-full relative z-0 overflow-hidden bg-black">{children}</div>

      {/* Home Indicator / Gesture Bar */}
      {device.hasHomeIndicator && (
        <div
          className="absolute bottom-0 w-full flex items-end justify-center pointer-events-none z-50"
          style={{ height: isIOS ? 34 : 28, paddingBottom: isIOS ? 8 : 6 }}
        >
          <div
            className="rounded-full"
            style={{
              width: isIOS ? 134 : 148,
              height: isIOS ? 5 : 4,
              background: isIOS
                ? "rgba(255,255,255,0.4)"
                : "rgba(255,255,255,0.22)",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Hardware Logic ───────────────────────────────────────────────────────────────
function DeviceHardware({ device }: { device: DeviceConfig }) {
  const [islandMode, setIslandMode] = useState<"bland" | "media">("bland");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIslandMode(Math.random() > 0.4 ? "media" : "bland");
  }, [device.id]); // Reset on device change

  switch (device.notchType) {
    case "island":
      return (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[60] pointer-events-none flex items-center transition-all duration-500 ease-in-out"
          style={{
            top: 11.5,
            height: 35,
            width: islandMode === "media" ? 140 : 120,
            background: "#000",
            borderRadius: 40,
            border: "1px solid rgba(255,255,255,0.05)",
            padding: islandMode === "media" ? "0 8px" : "0",
            boxShadow: "inset 0 0 6px rgba(255,255,255,0.08)",
          }}
        >
          {islandMode === "media" && (
            <div className="flex w-full items-center justify-between opacity-100 transition-opacity duration-500 delay-200">
              {/* Fake album art circle */}
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: 22,
                  height: 22,
                  background: "linear-gradient(135deg, #1DB954, #106b30)",
                  boxShadow: "0 0 4px rgba(29,185,84,0.4)",
                }}
              />
              {/* Equalizer waveform */}
              <div className="flex items-end gap-[3px]" style={{ height: 14, marginRight: 6 }}>
                {[
                  { h: 8, delay: "0ms" },
                  { h: 12, delay: "120ms" },
                  { h: 6, delay: "240ms" },
                  { h: 10, delay: "60ms" },
                  { h: 14, delay: "180ms" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="rounded-full animate-pulse"
                    style={{
                      width: 2.5,
                      height: bar.h,
                      background: "#1DB954",
                      animationDelay: bar.delay,
                      animationDuration: "0.9s",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Camera dot */}
          <div
            className="absolute rounded-full transition-opacity duration-500"
            style={{
              right: 11,
              top: "50%",
              transform: "translateY(-50%)",
              width: 11,
              height: 11,
              background: "#070707",
              boxShadow: "inset 0 1px 3px rgba(255,255,255,0.15)",
              opacity: islandMode === "media" ? 0 : 1,
            }}
          />
        </div>
      );

    case "notch":
      return (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bg-black z-[60] pointer-events-none flex justify-center items-center"
          style={{
            width: device.width * 0.5,
            height: 30,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <div
            className="rounded-full"
            style={{ width: 48, height: 5, background: "#111", opacity: 0.5, marginTop: 8 }}
          />
          <div
            className="rounded-full"
            style={{
              width: 11,
              height: 11,
              background: "#070707",
              marginTop: 8,
              marginLeft: 14,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15)",
            }}
          />
        </div>
      );

    case "punch-hole":
      return (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
          style={{
            top: 10,
            width: 12,
            height: 12,
            background: "#000",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)",
          }}
        />
      );

    default:
      return null;
  }
}

// ─── Status Bar ───────────────────────────────────────────────────────────────────
function StatusBar({
  device,
  showTime,
  showStatus,
  systemTime,
}: Omit<DeviceChromeProps, "children">) {
  const isIOS = device.type === "ios";

  if (isIOS) {
    return (
      <div
        className="absolute top-0 w-full flex justify-between items-end z-50 text-white pointer-events-none transition-opacity duration-300"
        style={{
          height: 50,
          paddingLeft: 26,
          paddingRight: 20,
          paddingBottom: 6,
          opacity: showStatus || showTime ? 1 : 0,
        }}
      >
        {/* Left: time */}
        <div
          style={{ opacity: showTime ? 1 : 0, transition: "opacity 0.2s" }}
          className="flex items-center gap-1"
        >
          <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.3px" }}>
            {systemTime}
          </span>
        </div>

        {/* Right: status icons */}
        <div
          className="flex items-center"
          style={{ gap: 7, opacity: showStatus ? 1 : 0, transition: "opacity 0.2s" }}
        >
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>
    );
  }

  // Android layout
  return (
    <div
      className="absolute top-0 w-full flex justify-between items-center z-50 text-white/90 pointer-events-none transition-opacity duration-300"
      style={{
        height: 40,
        paddingLeft: 18,
        paddingRight: 14,
        opacity: showStatus || showTime ? 1 : 0,
      }}
    >
      {/* Left: time + notification icons */}
      <div className="flex items-center" style={{ gap: 10 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            opacity: showTime ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {systemTime}
        </span>
        {showStatus && (
          <div className="flex items-center" style={{ gap: 7, opacity: 0.85 }}>
            <SpotifyIcon style={{ width: 13, height: 13 }} />
             {/* Message notification dot */}
             <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Right: connectivity + battery */}
      <div
        className="flex items-center"
        style={{ gap: 5, opacity: showStatus ? 1 : 0, transition: "opacity 0.2s" }}
      >
        {/* Signal bars */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="1" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="1" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="1" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="1" />
        </svg>
        {/* Wifi */}
        <svg width="15" height="12" viewBox="0 0 19.2 13.8" fill="white">
          <path d="M9.6 2.8c2.8 0 5.5 1 7.5 2.9.2.1.4.1.6 0l1.4-1.4c.1-.1.1-.2.1-.3s-.1-.2-.2-.3c-5.3-4.9-13.7-4.9-19 0-.1.1-.1.2-.1.3s.1.2.2.3l1.4 1.4c.2.2.4.2.6 0 2-1.9 4.7-2.9 7.5-2.9zM9.6 7.5c1.5 0 3 .6 4.1 1.6.2.2.4.2.6 0l1.4-1.5c.1-.1.1-.2.1-.3s-.1-.2-.2-.3c-3.4-3.2-8.7-3.2-12.1 0-.1.1-.1.2-.1.3s.1.2.2.3l1.4 1.5c.1.2.4.2.6 0 1.1-1 2.6-1.6 4.1-1.6zM12.4 10.6c0 .1 0 .2-.1.3l-2.4 2.8c-.1.1-.2.1-.3.1s-.2 0-.3-.1l-2.4-2.8c-.1-.1-.1-.2-.1-.3 0-.1.1-.2.2-.3 1.5-1.5 3.8-1.5 5.3 0 .1.1.1.2.1.3z" />
        </svg>
        {/* Battery */}
        <svg width="22" height="11" viewBox="0 0 30.4 14.1" fill="none">
          <path
            d="M4 0h19.5c2.2 0 4 1.8 4 4v6.1c0 2.2-1.8 4-4 4h-19.5c-2.2 0-4-1.8-4-4v-6.1c0-2.2 1.8-4 4-4z"
            stroke="white"
            strokeWidth="0.8"
          />
          <path d="M28.9 4.8v4.7c.9-.4 1.5-1.3 1.5-2.3s-.6-1.9-1.5-2.4z" fill="white" opacity="0.4" />
          <path
            d="M4.7 2.1h18.1c1.4 0 2.6 1.2 2.6 2.6v4.7c0 1.4-1.2 2.6-2.6 2.6h-18.1c-1.4 0-2.6-1.2-2.6-2.6v-4.7c0-1.4 1.2-2.6 2.6-2.6z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────────
function SpotifyIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.439-3.3c-.3.42-.84.54-1.26.24-3.24-1.98-8.16-2.58-11.94-1.44-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.26 9.72-.6 13.5 1.68.42.24.54.84.24 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.18c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.2-1.2 11.22-.96 15.12 1.62.54.36.72 1.08.36 1.62-.36.54-1.08.72-1.62.36z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 30.4 14.1" fill="none" className="opacity-95">
      <path
        d="M4 0h19.5c2.2 0 4 1.8 4 4v6.1c0 2.2-1.8 4-4 4h-19.5c-2.2 0-4-1.8-4-4v-6.1c0-2.2 1.8-4 4-4z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path d="M28.9 4.8v4.7c.9-.4 1.5-1.3 1.5-2.3s-.6-1.9-1.5-2.4z" fill="currentColor" opacity="0.4" />
      <path
        d="M4.7 2.1h18.1c1.4 0 2.6 1.2 2.6 2.6v4.7c0 1.4-1.2 2.6-2.6 2.6h-18.1c-1.4 0-2.6-1.2-2.6-2.6v-4.7c0-1.4 1.2-2.6 2.6-2.6z"
        fill="currentColor"
      />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="18" height="11" viewBox="0 0 21.1 12.2" fill="none" className="opacity-95">
      <path
        d="M21.1 1.1c0-.6-.5-1.1-1.1-1.1h-1.1c-.6 0-1.1.5-1.1 1.1v9.9c0 .6.5 1.1 1.1 1.1h1.1c.6 0 1.1-.5 1.1-1.1v-9.9zM13.1 2.4h1.1c.6 0 1.1.5 1.1 1.2v7.4c0 .7-.5 1.2-1.1 1.2h-1.1c-.6 0-1.1-.5-1.1-1.2v-7.4c0-.7.5-1.2 1.1-1.2zM8.1 5.1h-1.1c-.6 0-1.1.5-1.1 1.2v4.7c0 .7.5 1.2 1.1 1.2h1.1c.6 0 1.1-.5 1.1-1.2v-4.7c0-.7-.5-1.2-1.1-1.2zM2.1 7.5h-1.1c-.6 0-1.1.5-1.1 1.2v2.3c0 .6.5 1.2 1.1 1.2h1.1c.6 0 1.1-.6 1.1-1.2v-2.3c0-.7-.5-1.2-1.1-1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 19.2 13.8" fill="none" className="opacity-95">
      <path
        d="M9.6 2.8c2.8 0 5.5 1 7.5 2.9.2.1.4.1.6 0l1.4-1.4c.1-.1.1-.2.1-.3s-.1-.2-.2-.3c-5.3-4.9-13.7-4.9-19 0-.1.1-.1.2-.1.3s.1.2.2.3l1.4 1.4c.2.2.4.2.6 0 2-1.9 4.7-2.9 7.5-2.9zM9.6 7.5c1.5 0 3 .6 4.1 1.6.2.2.4.2.6 0l1.4-1.5c.1-.1.1-.2.1-.3s-.1-.2-.2-.3c-3.4-3.2-8.7-3.2-12.1 0-.1.1-.1.2-.1.3s.1.2.2.3l1.4 1.5c.1.2.4.2.6 0 1.1-1 2.6-1.6 4.1-1.6zM12.4 10.6c0 .1 0 .2-.1.3l-2.4 2.8c-.1.1-.2.1-.3.1s-.2 0-.3-.1l-2.4-2.8c-.1-.1-.1-.2-.1-.3 0-.1.1-.2.2-.3 1.5-1.5 3.8-1.5 5.3 0 .1.1.1.2.1.3z"
        fill="currentColor"
      />
    </svg>
  );
}