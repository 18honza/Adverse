"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: string; fields?: string[] };

const MAX_NAME = 100;
const MAX_PHONE = 50;
const MAX_MESSAGE = 5000;

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot
  if ((formData.get("website") as string)?.trim()) {
    return { status: "success" };
  }

  const name = ((formData.get("name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();

  const fields: string[] = [];
  if (!name || name.length > MAX_NAME) fields.push("name");
  if (!isEmail(email)) fields.push("email");
  if (!message || message.length > MAX_MESSAGE) fields.push("message");
  if (phone.length > MAX_PHONE) fields.push("phone");

  if (fields.length) {
    return {
      status: "error",
      error: "Zkontrolujte prosím vyplněná pole.",
      fields,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / preview without API key — log and pretend success so UI is testable
    console.warn(
      "[contact] RESEND_API_KEY not set; logging submission instead",
      { name, email, phone, message },
    );
    return { status: "success" };
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

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Resend error", err);
    return {
      status: "error",
      error: "Něco se pokazilo při odesílání. Zkuste to prosím znovu.",
    };
  }
}
