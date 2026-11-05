import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getServices, saveService, deleteService } from "@/lib/db";

export async function GET(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const services = await getServices(user.id);
  return NextResponse.json({ success: true, services });
}

export async function POST(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const service = await saveService({
      ...body,
      vendor_id: user.id,
      vendor_name: user.business_name || user.name,
      status: "pending", // Newly submitted service goes to admin for approval
    });
    return NextResponse.json({ success: true, service });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const service = await saveService({
      ...body,
      vendor_id: user.id,
    });
    return NextResponse.json({ success: true, service });
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
    await deleteService(id, user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

