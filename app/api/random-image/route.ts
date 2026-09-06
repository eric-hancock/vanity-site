import { NextRequest, NextResponse } from "next/server";
import { getRandomImage } from "@/lib/image-manifest";

export async function GET(request: NextRequest) {
  const excludeId = request.nextUrl.searchParams.get("exclude") ?? undefined;
  const image = getRandomImage(excludeId);

  return NextResponse.json(image, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
