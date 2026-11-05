import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const sessionUser = await getCurrentUser(request);
    if (!sessionUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in to upload a photo." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("photo");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No image file provided." },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid image format. Please upload JPEG, PNG, or WebP." },
        { status: 400 }
      );
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "Image size exceeds 5MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate safe filename
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const filename = `avatar-${sessionUser.id}-${Date.now()}.${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    // Update user record in database
    await updateUser(sessionUser.id, { avatar_url: publicUrl });

    return NextResponse.json({
      success: true,
      message: "Profile photograph updated successfully!",
      avatar_url: publicUrl,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload photo: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const sessionUser = await getCurrentUser(request);
    if (!sessionUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await updateUser(sessionUser.id, { avatar_url: "" });

    return NextResponse.json({
      success: true,
      message: "Profile photograph removed successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to remove photo: " + error.message },
      { status: 500 }
    );
  }
}

