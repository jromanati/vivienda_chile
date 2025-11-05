import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmailHTML, contactEmailText } from "@/lib/emailTemplates";

export const runtime = "nodejs";

// const resend = new Resend(process.env.RESEND_API_KEY); // mueve la key a .env.local
const resend = new Resend('re_eDMQMvXR_L5y4RSCVKaBGvZGT3j132SLN');

export async function POST(req: Request) {
  try {
    const { name, email, message, phone, propertyId, serviceId, pageUrl, title } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Faltan campos requeridos" }, { status: 400 });
    }

    const html = contactEmailHTML({ name, email, message, phone, propertyId, serviceId, pageUrl, title });
    const text = contactEmailText({ name, email, message, phone, propertyId, serviceId, pageUrl, title });
    const { error } = await resend.emails.send({
      from: "WebSite <jose.roman@metrasolutions.com>",
      to: ["contacto@viviendachile.cl"],
      subject: "Nuevo contacto",
      html,       // ← string HTML listo
      // text,       // ← opcional, mejora entregabilidad
      tags: [{ name: "app", value: "website" }, { name: "type", value: "contact-form" }],
    });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Error al enviar correo" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, info: "POST /api/contact para enviar" });
}
