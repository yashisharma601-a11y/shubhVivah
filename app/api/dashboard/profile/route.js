import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";

/**
 * Calculates Age dynamically from Date of Birth
 */
function calculateAge(dobString) {
  if (!dobString) return null;
  const birth = new Date(dobString);
  if (isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age > 0 ? age : null;
}

/**
 * Calculates dynamic profile completion percentage
 * - Personal Details: 20%
 * - Education & Career: 20%
 * - Family Details: 15%
 * - Lifestyle Details: 10%
 * - Partner Preferences: 20%
 * - Profile Photograph: 15%
 */
function calculateProfileCompletion(user) {
  if (!user) return { total: 0, message: "Please log in", breakdown: {} };

  // Personal (20%)
  const personalFields = ["name", "gender", "dob", "marital_status", "religion", "city", "height"];
  const personalCompleted = personalFields.filter((f) => Boolean(user[f] && String(user[f]).trim()));
  const personalScore = Math.round((personalCompleted.length / personalFields.length) * 20);

  // Education & Career (20%)
  const eduFields = ["highest_qualification", "profession", "occupation", "annual_income"];
  const eduCompleted = eduFields.filter((f) => Boolean(user[f] && String(user[f]).trim()));
  const educationScore = Math.round((eduCompleted.length / eduFields.length) * 20);

  // Family (15%)
  const familyFields = ["father_name", "mother_name", "family_type", "family_status"];
  const familyCompleted = familyFields.filter((f) => Boolean(user[f] && String(user[f]).trim()));
  const familyScore = Math.round((familyCompleted.length / familyFields.length) * 15);

  // Lifestyle (10%)
  const lifestyleFields = ["diet", "hobbies", "languages_known"];
  const lifestyleCompleted = lifestyleFields.filter((f) => Boolean(user[f] && String(user[f]).trim()));
  const lifestyleScore = Math.round((lifestyleCompleted.length / lifestyleFields.length) * 10);

  // Partner Preferences (20%)
  const prefFields = ["pref_age_min", "pref_marital_status", "pref_religion", "pref_education"];
  const prefCompleted = prefFields.filter((f) => Boolean(user[f] && String(user[f]).trim()));
  const preferenceScore = Math.round((prefCompleted.length / prefFields.length) * 20);

  // Profile Photograph (15%)
  const photoScore = user.avatar_url && String(user.avatar_url).trim().length > 0 ? 15 : 0;

  const total = Math.min(100, personalScore + educationScore + familyScore + lifestyleScore + preferenceScore + photoScore);

  let message = "Complete your profile to improve your matchmaking experience.";
  if (total >= 95) {
    message = "Your profile is almost complete! You have excellent visibility among matches.";
  } else if (total >= 60) {
    message = `Your profile is ${total}% complete. Complete more sections to receive 3x more match requests!`;
  } else {
    message = `Your profile is ${total}% complete. Complete your profile to improve your matchmaking experience.`;
  }

  return {
    total,
    message,
    breakdown: {
      personal: { score: personalScore, max: 20 },
      education: { score: educationScore, max: 20 },
      family: { score: familyScore, max: 15 },
      lifestyle: { score: lifestyleScore, max: 10 },
      preferences: { score: preferenceScore, max: 20 },
      photo: { score: photoScore, max: 15 },
    },
  };
}

/**
 * Format user for public/profile consumption (strips sensitive password & salts)
 */
function sanitizeProfile(user) {
  if (!user) return null;
  const { password_hash, salt, reset_otp, reset_otp_expires, ...safe } = user;
  const age = calculateAge(safe.dob);
  const completion = calculateProfileCompletion(safe);
  const profileId = `SV-${String(safe.id).padStart(5, "0")}`;

  return {
    ...safe,
    profile_id: profileId,
    age: age || safe.age || null,
    completion,
    verification_status: safe.verification_status || (safe.status === "active" ? "verified" : "not_verified"),
    verification_remarks: safe.verification_remarks || null,
  };
}

// GET /api/dashboard/profile - Fetch authenticated user's profile
export async function GET(request) {
  try {
    const sessionUser = await getCurrentUser(request);
    if (!sessionUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in to view your profile." },
        { status: 401 }
      );
    }

    const user = await findUserById(sessionUser.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User account not found." },
        { status: 404 }
      );
    }

    const profile = sanitizeProfile(user);

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load profile: " + error.message },
      { status: 500 }
    );
  }
}

// PUT /api/dashboard/profile - Update authenticated user's profile sections
export async function PUT(request) {
  try {
    const sessionUser = await getCurrentUser(request);
    if (!sessionUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in to update your profile." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Prevent overwriting sensitive system fields
    const {
      id,
      password_hash,
      salt,
      reset_otp,
      reset_otp_expires,
      user_type,
      created_at,
      ...allowedUpdates
    } = body;

    // Auto calculate age if dob provided
    if (allowedUpdates.dob) {
      const calcAge = calculateAge(allowedUpdates.dob);
      if (calcAge) allowedUpdates.age = calcAge;
    }

    // Set verification to pending review if key identification fields change
    if (allowedUpdates.name || allowedUpdates.dob || allowedUpdates.gender) {
      const currentUser = await findUserById(sessionUser.id);
      if (currentUser && currentUser.verification_status === "not_verified") {
        allowedUpdates.verification_status = "verification_pending";
      }
    }

    const updatedUser = await updateUser(sessionUser.id, allowedUpdates);
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to update profile record." },
        { status: 404 }
      );
    }

    const sanitized = sanitizeProfile(updatedUser);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully!",
      profile: sanitized,
    });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile: " + error.message },
      { status: 500 }
    );
  }
}
