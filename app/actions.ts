"use server";

import { Resend } from "resend";
import { autoReply } from "@/app/autoreply";

export async function SendEmails(formData: FormData) {
    const message = formData.get("message") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send messages to me
    await resend.emails.send({
        from: "arun-karki.com.np@arun-karki.com.np",
        to: ["contact@arun-karki.com.np"],
        subject: "New message from portfolio",
        html: `
            <h3>New message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `,
        replyTo: [email],
    });

    // Send auto reply to visitor
    await resend.emails.send({
        from: "noreply@arun-karki.com.np",
        to: [email],
        subject: "Thanks for contacting me!",
        html: autoReply,
        replyTo: ["arunkarki721@gmail.com"],
    });
}
