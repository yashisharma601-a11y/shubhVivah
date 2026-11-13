import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") || formData.get("photo") || formData.get("document");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No file provided." },
        { status: 400 }
      );
    }

    // Validate size (max 8MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 8MB limit. Please upload a smaller file." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Determine extension
    let ext = "bin";
    const mime = file.type || "";
    if (mime.includes("jpeg") || mime.includes("jpg")) ext = "jpg";
    else if (mime.includes("png")) ext = "png";
    else if (mime.includes("webp")) ext = "webp";
    else if (mime.includes("pdf")) ext = "pdf";
    else {
      const parts = (file.name || "").split(".");
      if (parts.length > 1) {
        ext = parts.pop().toLowerCase().replace(/[^a-z0-9]/g, "");
      }
    }

    const filename = `reg-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: mime,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}

