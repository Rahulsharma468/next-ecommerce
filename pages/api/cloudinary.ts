import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from "next-auth/react";
import fs from "fs";

// Set formidable options to store the uploaded file temporarily
export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Check for session and role
  getSession({ req }).then(async (session: any) => {
    if (!session || session.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const form = new IncomingForm();
    form.parse(req, async (err, fields, files: any) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }

      // Check if file is present
      const file = files.file ? files.file[0] : null;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = file.filepath;

      try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "HASTHETHICS",
        });

        // Delete temporary file after uploading
        fs.unlinkSync(filePath);

        return res.status(200).json({ imageUrl: result.secure_url });
      } catch (error) {
        console.error("Upload to Cloudinary failed", error);
        return res.status(500).json({ error: "Upload to Cloudinary failed" });
      }
    });
  });
}
