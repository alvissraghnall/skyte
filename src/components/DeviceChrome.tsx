import type { ReactNode } from "react";
import type { DeviceConfig } from "#/lib/devices";

interface DeviceChromeProps {
  device: DeviceConfig;
  showTime: boolean;
  showStatus: boolean;
  systemTime: string;
  children: ReactNode;
}

export function DeviceChrome({
  device,
  showTime,
  showStatus,
  systemTime,
  children,
}: DeviceChromeProps) {
  const isIOS = device.type === "ios";

  return (
    <div
      className="relative shrink-0 bg-black overflow-hidden flex flex-col z-10 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[8px] border-[#1f1f1f]"
      style={{
        width: device.width,
        height: device.height,
        borderRadius: device.cornerRadius,
      }}
    >
      {/* Hardware Features (Notch/Island/Punch-hole) */}
      <DeviceHardware device={device} />

      {/* Status Bar */}
      <StatusBar
        device={device}
        showTime={showTime}
        showStatus={showStatus}
        systemTime={systemTime}
      />

      {/* Content */}
      <div className="flex-1 w-full relative z-0">{children}</div>

      {/* Home Indicator */}
      {device.hasHomeIndicator && (
        <div className="absolute bottom-0 w-full h-8.5 flex items-center justify-center pointer-events-none z-50">
          <div
            className="w-35 h-1.25 rounded-full bg-white/40"
            style={{
              backgroundColor: isIOS
                ? "rgba(255,255,255,0.4)"
                : "rgba(255,255,255,0.2)",
              width: isIOS ? 134 : 148,
              marginBottom: 8,
            }}
          />
        </div>
      )}
    </div>
  );
}

function DeviceHardware({ device }: { device: DeviceConfig }) {
  switch (device.notchType) {
    case "island":
      return (
        <div className="absolute left-1/2 -translate-x-1/2 top-[11.5px] w-31.25 h-9.25 bg-black rounded-[40px] z-[60] border border-white/5 pointer-events-none" />
      );
    case "notch":
      return (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bg-black z-60 pointer-events-none"
          style={{
            width: device.width * 0.5,
            height: 30,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      );
    case "punch-hole":
      return (
        <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-4 h-4 bg-[#111] rounded-full z-[60] border border-white/5 pointer-events-none" />
      );
    default:
      return null;
  }
}

function StatusBar({
  device,
  showTime,
  showStatus,
  systemTime,
}: Omit<DeviceChromeProps, "children">) {
  const isIOS = device.type === "ios";

  // iOS layouts
  if (isIOS) {
    return (
      <div
        className={`absolute top-0 w-full h-12.5 flex justify-between items-end px-8 pb-1 z-50 text-white transition-opacity duration-300 ${showStatus || showTime ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`flex-1 flex justify-start transition-opacity ${showTime ? "opacity-100" : "opacity-0"}`}
        >
          <span className="font-semibold text-[17px] tracking-tight ml-2">
            {systemTime}
          </span>
        </div>

        <div
          className={`flex-1 flex justify-end items-center gap-1.5 h-6 transition-opacity ${showStatus ? "opacity-100" : "opacity-0"}`}
        >
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>
    );
  }

  // Android layout (centered time or left aligned depending on hole)
  return (
    <div
      className={`absolute top-0 w-full h-10 flex justify-between items-center px-6 z-50 text-white/90 transition-opacity duration-300 ${showStatus || showTime ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`transition-opacity ${showTime ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-sm font-medium">{systemTime}</span>
      </div>
      <div
        className={`flex items-center gap-2 transition-opacity ${showStatus ? "opacity-100" : "opacity-0"}`}
      >
        <span className="material-symbols-outlined text-[16px]">
          signal_cellular_4_bar
        </span>
        <span className="material-symbols-outlined text-[16px]">wifi</span>
        <span className="material-symbols-outlined text-[18px]">
          battery_full
        </span>
      </div>
    </div>
  );
}

// iOS Specific Icons from user provided SVGs
function BatteryIcon() {
  return (
    <svg
      width="27"
      height="13"
      viewBox="0 0 30.4 14.1"
      fill="none"
      className="opacity-90"
    >
      <path
        d="M4 0h19.5c2.2 0 4 1.8 4 4v6.1c0 2.2-1.8 4-4 4h-19.5c-2.2 0-4-1.8-4-4v-6.1c0-2.2 1.8-4 4-4z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M28.9 4.8v4.7c.9-.4 1.5-1.3 1.5-2.3s-.6-1.9-1.5-2.4z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M4.7 2.1h18.1c1.4 0 2.6 1.2 2.6 2.6v4.7c0 1.4-1.2 2.6-2.6 2.6h-18.1c-1.4 0-2.6-1.2-2.6-2.6v-4.7c0-1.4 1.2-2.6 2.6-2.6z"
        fill="currentColor"
      />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 21.1 12.2"
      fill="none"
      className="opacity-90"
    >
      <path
        d="M21.1 1.1c0-.6-.5-1.1-1.1-1.1h-1.1c-.6 0-1.1.5-1.1 1.1v9.9c0 .6.5 1.1 1.1 1.1h1.1c.6 0 1.1-.5 1.1-1.1v-9.9zM13.1 2.4h1.1c.6 0 1.1.5 1.1 1.2v7.4c0 .7-.5 1.2-1.1 1.2h-1.1c-.6 0-1.1-.5-1.1-1.2v-7.4c0-.7.5-1.2 1.1-1.2zM8.1 5.1h-1.1c-.6 0-1.1.5-1.1 1.2v4.7c0 .7.5 1.2 1.1 1.2h1.1c.6 0 1.1-.5 1.1-1.2v-4.7c0-.7-.5-1.2-1.1-1.2zM2.1 7.5h-1.1c-.6 0-1.1.5-1.1 1.2v2.3c0 .6.5 1.2 1.1 1.2h1.1c.6 0 1.1-.6 1.1-1.2v-2.3c0-.7-.5-1.2-1.1-1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 19.2 13.8"
      fill="none"
      className="opacity-90"
    >
      <path
        d="M9.6 2.8c2.8 0 5.5 1 7.5 2.9.2.1.4.1.6 0l1.4-1.4c.1-.1.1-.2.1-.3s-.1-.2-.2-.3c-5.3-4.9-13.7-4.9-19 0-.1.1-.1.2-.1.3s.1.2.2.3l1.4 1.4c.2.2.4.2.6 0 2-1.9 4.7-2.9 7.5-2.9zM9.6 7.5c1.5 0 3 .6 4.1 1.6.2.2.4.2.6 0l1.4-1.5c.1-.1.1-.2.1-.3s-.1-.2-.2-.3c-3.4-3.2-8.7-3.2-12.1 0-.1.1-.1.2-.1.3s.1.2.2.3l1.4 1.5c.1.2.4.2.6 0 1.1-1 2.6-1.6 4.1-1.6zM12.4 10.6c0 .1 0 .2-.1.3l-2.4 2.8c-.1.1-.2.1-.3.1s-.2 0-.3-.1l-2.4-2.8c-.1-.1-.1-.2-.1-.3 0-.1.1-.2.2-.3 1.5-1.5 3.8-1.5 5.3 0 .1.1.1.2.1.3z"
        fill="currentColor"
      />
    </svg>
  );
}
