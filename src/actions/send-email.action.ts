"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container: "max-w-2xl mx-auto px-4 py-8",
  header: "text-2xl font-bold mb-4",
  paragraph: "text-gray-600 mb-6",
  link: "text-blue-500 hover:underline",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Better Auth - ${subject}`,
    html: `
    <div style="${styles.container}">
    <h1 style="${styles.header}">${subject}</h1>
    <p style="${styles.paragraph}">${meta.description}</p>
    <a href="${meta.link}" style="${styles.link}">Click here</a>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("Send email action:", err);
    return { success: false };
  }
}
