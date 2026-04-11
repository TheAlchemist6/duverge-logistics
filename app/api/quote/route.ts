import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_SERVICES = [
  "LTL (Less Than Truckload)",
  "Truckload",
  "Warehousing",
  "International Shipping",
  "White-Glove Delivery",
  "Last-Mile Delivery",
  "Expedited Delivery",
  "Heavy Hauling",
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isValidPhone(phone: string): boolean {
  return /^\d{10,15}$/.test(phone.replace(/\D/g, ""));
}

function isValidName(name: string): boolean {
  return /^[a-zA-Z\s'-]{2,50}$/.test(name.trim());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, company, email, phone, service, load } = body;

    // Validate required fields
    if (!name || !company || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate name
    if (!isValidName(name)) {
      return NextResponse.json(
        { success: false, error: "Invalid name." },
        { status: 400 }
      );
    }

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Validate phone
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    // Validate service if provided
    if (service && !ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json(
        { success: false, error: "Invalid service type." },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Duverge Logistics <noreply@duvergelogistics.com>",
      to: ["Info@duvergelogistics.com"],
      replyTo: email.trim(),
      subject: `Quote Request from ${name.trim()} — ${company.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 8px;">
            New Quote Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${company.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            ${service ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            ` : ""}
          </table>
          ${load ? `
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <strong style="color: #64748b;">Load Details:</strong>
            <p style="margin: 8px 0 0; white-space: pre-wrap;">${load.trim()}</p>
          </div>
          ` : ""}
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">
            Submitted via duverge-logistics.vercel.app
          </p>
        </div>
      `,
      text: `
New Quote Request

Name: ${name.trim()}
Company: ${company.trim()}
Email: ${email.trim()}
Phone: ${phone}
${service ? `Service: ${service}` : ""}
${load ? `\nLoad Details:\n${load.trim()}` : ""}

Submitted via duverge-logistics.vercel.app
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json(
      { success: false, error: "Invalid request format." },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
