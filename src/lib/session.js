/**
 * Universal Session Token Verifier (Edge & Node.js Compatible)
 * Uses standard Web Crypto API (crypto.subtle) with zero external dependencies.
 */

const AUTH_SECRET = process.env.AUTH_SECRET || "shubhvivah_super_secret_secure_key_2026";

function decodeBase64Url(str) {
  try {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(base64), (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return null;
  }
}

function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Verifies an HMAC-SHA256 signed session token asynchronously
 * 100% Web Crypto API standards compliant (Edge Runtime & Node.js)
 */
export async function verifySessionTokenUniversal(token, secret = AUTH_SECRET) {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadString, signature] = parts;
  if (!payloadString || !signature) return null;

  try {
    const enc = new TextEncoder();
    const cryptoSubtle = globalThis.crypto?.subtle;
    if (!cryptoSubtle) return null;

    const key = await cryptoSubtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await cryptoSubtle.sign("HMAC", key, enc.encode(payloadString));
    const expectedSignature = arrayBufferToBase64Url(signatureBuffer);

    if (signature !== expectedSignature) {
      return null;
    }

    const jsonString = decodeBase64Url(payloadString);
    if (!jsonString) return null;

    const payload = JSON.parse(jsonString);

    // Verify expiration timestamp
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}
