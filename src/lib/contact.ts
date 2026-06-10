/**
 * The single network boundary of the frontend.
 *
 * In this frontend-only build it just validates and resolves after a short
 * delay. The backend track (see docs/PROJECT-PLAN-full.md) replaces the body
 * of `submitContact` with a POST to `/api/contact` (Resend + Turnstile) —
 * the call sites and UI stay exactly the same.
 */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  // Guard rails mirror the real endpoint's validation.
  if (
    !payload.name.trim() ||
    !EMAIL_RE.test(payload.email) ||
    payload.message.trim().length < 2
  ) {
    return { ok: false };
  }

  // Simulate network latency so the UI states are exercised.
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('[submitContact stub] would send:', payload);
  }

  return { ok: true };
}

export async function subscribeNewsletter(email: string): Promise<ContactResult> {
  if (!EMAIL_RE.test(email)) return { ok: false };
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { ok: true };
}
