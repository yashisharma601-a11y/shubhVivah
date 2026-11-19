import crypto from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET || "shubhvivah_super_secret_secure_key_2026";

/**
 * Hashes a plaintext password using crypto.scryptSync with a unique salt
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}
/**
 * Verifies a plaintext password against the stored scrypt hash and salt
 */
export function verifyPassword(password, hash, salt) {
  try {
    const checkHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(checkHash, "hex"));
  } catch {
    return false;
  }
}

/**
 * Creates an HMAC-SHA256 signed session token
 */
export function createSessionToken(user, expiresInDays = 7) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    user_type: user.user_type,
    business_name: user.business_name || null,
    category: user.category || null,
    city: user.city || null,
    exp: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payloadString)
    .digest("base64url");

  return `${payloadString}.${signature}`;
}

/**
 * Verifies and parses an HMAC-SHA256 signed session token
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadString, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payloadString)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadString, "base64url").toString("utf-8"));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Retrieves the currently authenticated user payload from the request cookies
 */
export async function getCurrentUser(request = null) {
  try {
    if (request && request.cookies) {
      const token = request.cookies.get("shubhvivah_session")?.value;
      if (token) return verifySessionToken(token);
    }
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("shubhvivah_session")?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

