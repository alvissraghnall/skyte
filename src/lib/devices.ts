export type DeviceType = "ios" | "android";
export type NotchType = "island" | "notch" | "punch-hole" | "none";

export interface DeviceConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  type: DeviceType;
  notchType: NotchType;
  hasHomeIndicator: boolean;
  cornerRadius: number;
}

export const DEVICE_CONFIGS: Record<string, DeviceConfig> = {
  // iOS Flagships
  "iphone-16-pro": { id: "iphone-16-pro", name: "iPhone 16 Pro", width: 402, height: 874, type: "ios", notchType: "island", hasHomeIndicator: true, cornerRadius: 62 },
  "iphone-15-pro": { id: "iphone-15-pro", name: "iPhone 15 Pro", width: 393, height: 852, type: "ios", notchType: "island", hasHomeIndicator: true, cornerRadius: 56 },
  // "iphone-14-pro": { id: "iphone-14-pro", name: "iPhone 14 Pro", width: 393, height: 852, type: "ios", notchType: "island", hasHomeIndicator: true, cornerRadius: 56 },
  // "iphone-13-pro": { id: "iphone-13-pro", name: "iPhone 13 Pro", width: 390, height: 844, type: "ios", notchType: "notch", hasHomeIndicator: true, cornerRadius: 47 },
  // "iphone-12-pro": { id: "iphone-12-pro", name: "iPhone 12 Pro", width: 390, height: 844, type: "ios", notchType: "notch", hasHomeIndicator: true, cornerRadius: 47 },
  // "iphone-11-pro": { id: "iphone-11-pro", name: "iPhone 11 Pro", width: 375, height: 812, type: "ios", notchType: "notch", hasHomeIndicator: true, cornerRadius: 39 },

  // Android Flagships
  // "pixel-9-pro": { id: "pixel-9-pro", name: "Pixel 9 Pro", width: 412, height: 915, type: "android", notchType: "punch-hole", hasHomeIndicator: true, cornerRadius: 32 },
  "pixel-8-pro": { id: "pixel-8-pro", name: "Pixel 8 Pro", width: 412, height: 892, type: "android", notchType: "punch-hole", hasHomeIndicator: true, cornerRadius: 32 },
  "samsung-s24-ultra": { id: "samsung-s24-ultra", name: "Galaxy S24 Ultra", width: 412, height: 915, type: "android", notchType: "punch-hole", hasHomeIndicator: true, cornerRadius: 16 },
  "samsung-s23-ultra": { id: "samsung-s23-ultra", name: "Galaxy S23 Ultra", width: 412, height: 915, type: "android", notchType: "punch-hole", hasHomeIndicator: true, cornerRadius: 16 },
};
