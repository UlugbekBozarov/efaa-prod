// src/core/fingerprint.ts
import FingerprintJS from "@fingerprintjs/fingerprintjs";

let visitorId: string | null = null;

export async function initVisitorId() {
  if (!visitorId) {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    visitorId = await result.visitorId;
  }
  return visitorId;
}

// Getter
export function getVisitorId() {
  if (!visitorId) {
    console.warn("Visitor ID not initialized yet!");
  }
  return visitorId;
}
