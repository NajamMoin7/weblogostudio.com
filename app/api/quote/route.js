import { budgetOptions, labelFor, timelineOptions, validateQuote } from "@/lib/forms";
import { handleSubmission } from "@/lib/submission";
import { getService, services } from "@/data/services";

const slugs = services.map((s) => s.slug);

export async function POST(request) {
  return handleSubmission(request, {
    kind: "quote",
    validate: (body) => validateQuote(body, slugs),
    build: (d) => ({
      subject: `Quote request from ${d.name}${d.business ? ` (${d.business})` : ""}`,
      replyTo: d.email,
      fields: [
        ["Name", d.name],
        ["Email", d.email],
        ["Business", d.business],
        ["Services", d.services.map((s) => getService(s)?.title ?? s).join(", ")],
        ["Budget", labelFor(budgetOptions, d.budget)],
        ["Timeline", labelFor(timelineOptions, d.timeline)],
        ["Project description", d.description],
        ["Reference website", d.referenceUrl],
        ["Files link", d.filesUrl],
        ["Privacy consent", d.consent ? "Yes" : "No"],
      ],
    }),
  });
}
