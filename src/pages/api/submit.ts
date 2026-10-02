import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { submitChoice, InvalidChoiceError } from "../../lib/db";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "That request wasn't valid JSON." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const choiceId =
    body && typeof body === "object" && "choiceId" in body
      ? (body as Record<string, unknown>).choiceId
      : undefined;

  try {
    const db = env.RESPONSES_DB;
    const payload = await submitChoice(db, choiceId);
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof InvalidChoiceError) {
      return new Response(
        JSON.stringify({ error: "Please choose one of the four project directions." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.error("POST /api/submit failed", error);
    return new Response(
      JSON.stringify({ error: "We couldn't save that response. Please try again." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
};
