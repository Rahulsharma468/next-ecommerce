import { NextResponse } from "next/server";
import Cloudinary from "cloudinary";


export async function GET(request: any) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Get the signature using the Node.js SDK method api_sign_request
  const signature = Cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || ""
  );
  return NextResponse.json({ data: { signature, timestamp } }, { status: 200 });
}
