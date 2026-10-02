import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getResults } from "../../lib/db";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const db = env.RESPONSES_DB;
    const payload = await getResults(db);
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/results failed", error);
    return new Response(
      JSON.stringify({ error: "Results are unavailable right now. Please try again." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
};
