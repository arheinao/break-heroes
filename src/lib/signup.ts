const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface SignupPayload {
  email: string;
  destination: string | null;
}

export async function submitSignup(payload: SignupPayload): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    await new Promise((r) => setTimeout(r, 600));
    console.info(
      "[signup] Supabase env not configured — simulated success.",
      payload,
    );
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/email_signups`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: payload.email.trim().toLowerCase(),
      destination: payload.destination?.trim() || null,
      created_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Signup failed (${res.status}). ${text.slice(0, 120)}`,
    );
  }
}
