import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

async function readAvailability() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "vendor_availability.json");
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeAvailability(data) {
  try {
    const backupDir = path.join(process.cwd(), "src", "data");
    await fs.mkdir(backupDir, { recursive: true });
    const filePath = path.join(backupDir, "vendor_availability.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing vendor availability:", err);
  }
}

export async function GET(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const all = await readAvailability();
  const list = all.filter((a) => a.vendor_id === user.id);
  return NextResponse.json({ success: true, availability: list });
}

export async function POST(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const { date, reason } = await request.json();
    if (!date) return NextResponse.json({ success: false, message: "Date is required" }, { status: 400 });

    const all = await readAvailability();
    const existing = all.find((a) => a.vendor_id === user.id && a.date === date);
    if (existing) {
      return NextResponse.json({ success: true, message: "Date is already marked", item: existing });
    }

    const newItem = {
      id: all.length > 0 ? Math.max(...all.map((a) => a.id || 0)) + 1 : 1,
      vendor_id: user.id,
      date,
      reason: reason || "Booked / Personal Unavailable",
      created_at: new Date().toISOString(),
    };
    all.push(newItem);
    await writeAvailability(all);
    return NextResponse.json({ success: true, message: "Date marked as unavailable", item: newItem });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const id = searchParams.get("id");

    const all = await readAvailability();
    const filtered = all.filter((a) => {
      if (a.vendor_id !== user.id) return true;
      if (id && a.id === Number(id)) return false;
      if (date && a.date === date) return false;
      return true;
    });

    await writeAvailability(filtered);
    return NextResponse.json({ success: true, message: "Date marked as available" });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

