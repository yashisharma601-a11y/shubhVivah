import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getChecklist, saveChecklistItem, toggleChecklistItem, deleteChecklistItem } from "@/lib/db";

export async function GET(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const items = await getChecklist(user.id);
  return NextResponse.json({ success: true, items });
}

export async function POST(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const item = await saveChecklistItem({
      ...body,
      couple_id: user.id,
    });
    return NextResponse.json({ success: true, item });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await request.json();
    const updated = await toggleChecklistItem(id, user.id);
    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await deleteChecklistItem(id, user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

