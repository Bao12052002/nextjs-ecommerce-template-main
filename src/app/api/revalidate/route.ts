// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");

  // 1. Kiểm tra mật khẩu
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // 2. Kiểm tra xem có tag cần xóa không
  if (!tag) {
    return NextResponse.json({ message: "Missing tag param" }, { status: 400 });
  }

  // 3. Thực hiện xóa cache ngay lập tức
  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}