import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if the token is available
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      console.error("BLOB_READ_WRITE_TOKEN environment variable is not set")
      return NextResponse.json(
        {
          error: "Server configuration error. Please contact support.",
          details: "Blob storage token not configured",
        },
        { status: 500 },
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const filename = formData.get("filename") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, and PDF files are allowed." },
        { status: 400 },
      )
    }

    console.log(`Uploading file: ${filename}, size: ${file.size} bytes, type: ${file.type}`)

    // Upload to Vercel Blob with explicit token
    const blob = await put(filename, file, {
      access: "public",
      token: token, // Explicitly pass the token
    })

    console.log(`File uploaded successfully: ${blob.url}`)

    return NextResponse.json({
      url: blob.url,
      filename: filename,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
