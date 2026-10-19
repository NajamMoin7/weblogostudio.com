import { validateContact } from "@/lib/forms";
import { handleSubmission } from "@/lib/submission";

export async function POST(request) {
  return handleSubmission(request, {
    kind: "contact",
    validate: validateContact,
    build: (d) => ({
      subject: `Website enquiry: ${d.subject}`,
      replyTo: d.email,
      fields: [
        ["Name", d.name],
        ["Email", d.email],
        ["Subject", d.subject],
        ["Message", d.message],
        ["Privacy consent", d.consent ? "Yes" : "No"],
      ],
    }),
  });
}
