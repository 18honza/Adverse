// Replaces the old `src/app/kontakt/actions.ts` Server Action.
// The contact form submits via fetch() so it can talk to either this Route
// Handler (Vercel build) or server/contact.php (static build) using the same
// code path. A Server Action would have required two separate form
// implementations, and it can't coexist with `output: "export"` anyway.
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  const fd = await req.formData();

  if ((fd.get("website") as string)?.trim()) {
    return NextResponse.json({ status: "success" });
  }

  const name = ((fd.get("name") as string) ?? "").trim();
  const email = ((fd.get("email") as string) ?? "").trim();
  const phone = ((fd.get("phone") as string) ?? "").trim();
  const message = ((fd.get("message") as string) ?? "").trim();

  const fields: string[] = [];
  if (!name || name.length > 100) fields.push("name");
  if (!isEmail(email)) fields.push("email");
  if (!message || message.length > 5000) fields.push("message");
  if (phone.length > 50) fields.push("phone");

  if (fields.length) {
    return NextResponse.json(
      { status: "error", error: "Zkontrolujte prosím vyplněná pole.", fields },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set", { name, email, phone, message });
    return NextResponse.json({ status: "success" });
  }

  try {
    const resend = new Resend(apiKey);
    const cleanName = name.replace(/[\r\n]+/g, " ");

    await resend.emails.send({
      from: "Adverse Web <noreply@adverse.cz>",
      to: site.team.map((t) => t.email),
      replyTo: email,
      subject: `Nová zpráva z webu Adverse — ${cleanName}`,
      text: [
        "Nová zpráva z kontaktního formuláře:",
        "",
        `Jméno: ${cleanName}`,
        `E-mail: ${email}`,
        `Telefon: ${phone || "—"}`,
        "",
        "Zpráva:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("[contact] Resend error", err);
    return NextResponse.json(
      { status: "error", error: "Něco se pokazilo při odesílání. Zkuste to prosím znovu." },
      { status: 500 },
    );
  }
}
