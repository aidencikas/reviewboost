interface ContactFormData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  quantity: string;
  message: string;
  language?: string;
  website?: string; // honeypot
}

interface ValidationErrors {
  [key: string]: string;
}

// --- Constants ---

const MAX_LENGTHS = {
  businessName: 150,
  contactPerson: 150,
  email: 254,
  phone: 50,
  message: 5000,
} as const;

const MAX_QUANTITY = 10_000;
const MAX_BODY_SIZE = 16_384; // 16 KB — generous for form data

// --- Validation ---

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.businessName?.trim()) {
    errors.businessName = 'Business name is required';
  } else if (data.businessName.length > MAX_LENGTHS.businessName) {
    errors.businessName = `Business name must be ${MAX_LENGTHS.businessName} characters or less`;
  }

  if (!data.contactPerson?.trim()) {
    errors.contactPerson = 'Contact person is required';
  } else if (data.contactPerson.length > MAX_LENGTHS.contactPerson) {
    errors.contactPerson = `Contact person must be ${MAX_LENGTHS.contactPerson} characters or less`;
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (data.email.length > MAX_LENGTHS.email) {
    errors.email = `Email must be ${MAX_LENGTHS.email} characters or less`;
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && data.phone.length > MAX_LENGTHS.phone) {
    errors.phone = `Phone must be ${MAX_LENGTHS.phone} characters or less`;
  }

  if (data.message && data.message.length > MAX_LENGTHS.message) {
    errors.message = `Message must be ${MAX_LENGTHS.message} characters or less`;
  }

  if (data.quantity) {
    const qty = parseInt(data.quantity, 10);
    if (isNaN(qty) || qty < 1) {
      errors.quantity = 'Quantity must be at least 1';
    } else if (qty > MAX_QUANTITY) {
      errors.quantity = `Quantity must be ${MAX_QUANTITY.toLocaleString()} or less`;
    }
  }

  return errors;
}

// --- HTML escaping for email content ---

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- Email templates ---

function buildBusinessEmail(data: ContactFormData): string {
  const qty = data.quantity ? parseInt(data.quantity, 10) : 'Not specified';
  return `
NEW REVIEWBOOST INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Business:    ${escapeHtml(data.businessName)}
Contact:     ${escapeHtml(data.contactPerson)}
Email:       ${escapeHtml(data.email)}
Phone:       ${escapeHtml(data.phone || 'Not provided')}
Quantity:    ${qty}

Message:
${escapeHtml(data.message || 'No message provided')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This inquiry was submitted through the ReviewBoost website contact form.
  `.trim();
}

function buildCustomerConfirmation(
  data: ContactFormData,
  language: string,
): { subject: string; html: string } {
  const isLT = language === 'lt';

  const subject = isLT
    ? 'ReviewBoost — Gavome jūsų užklausą'
    : 'ReviewBoost — We received your inquiry';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; line-height: 1.6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: 700; color: #2563eb; }
    .content { padding: 24px; background: #f8fafc; border-radius: 12px; }
    .footer { text-align: center; margin-top: 32px; font-size: 13px; color: #64748b; }
    .highlight { color: #2563eb; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">ReviewBoost</div>
    </div>
    <div class="content">
      ${isLT
        ? `
        <p>Sveiki <strong>${escapeHtml(data.contactPerson)}</strong>,</p>
        <p>Ačiū, kad susisiekėte su <span class="highlight">ReviewBoost</span>.</p>
        <p>Gavome jūsų užklausą dėl <strong>${escapeHtml(data.businessName)}</strong> ir susisieksime su jumis kuo greičiau.</p>
        <p>Paprastai atsakome per 24 valandas.</p>
        <p>Pagarbiai,<br><strong>ReviewBoost komanda</strong></p>
      `
        : `
        <p>Hello <strong>${escapeHtml(data.contactPerson)}</strong>,</p>
        <p>Thank you for contacting <span class="highlight">ReviewBoost</span>.</p>
        <p>We've received your inquiry regarding <strong>${escapeHtml(data.businessName)}</strong> and will get back to you as soon as possible.</p>
        <p>We typically respond within 24 hours.</p>
        <p>Best regards,<br><strong>The ReviewBoost Team</strong></p>
      `}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ReviewBoost. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, html };
}

// --- Rate limiting (simple in-memory — resets on cold start) ---

const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  submissions.set(ip, recent);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

// --- Resend API ---

async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'noreply@reviewboost.lt';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `ReviewBoost <${fromEmail}>`,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('Resend API error:', response.status, body);
      return {
        success: false,
        error: `Email delivery failed (${response.status})`,
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Resend API request failed:', err);
    return { success: false, error: 'Email service unavailable' };
  }
}

// --- CORS headers ---

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
} as const;

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// --- Handler ---

export default async function handler(request: Request): Promise<Response> {
  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // Rate limiting
  const clientIP =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';
  if (isRateLimited(clientIP)) {
    return jsonResponse(
      { error: 'Too many requests. Please try again later.' },
      429,
    );
  }

  // Body size check
  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_SIZE) {
    return jsonResponse({ error: 'Request body too large' }, 400);
  }

  // Parse JSON
  let data: ContactFormData;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  // Honeypot check — silently reject bots with a fake success
  if (data.website) {
    return jsonResponse({ success: true }, 200);
  }

  // Trim whitespace
  data.businessName = data.businessName?.trim() || '';
  data.contactPerson = data.contactPerson?.trim() || '';
  data.email = data.email?.trim() || '';
  data.phone = data.phone?.trim() || '';
  data.message = data.message?.trim() || '';
  data.language = data.language?.trim() || 'lt';

  // Validate
  const errors = validate(data);
  if (Object.keys(errors).length > 0) {
    return jsonResponse({ error: 'Validation failed', errors }, 400);
  }

  // Get contact email
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    console.error('CONTACT_EMAIL environment variable is not set');
    return jsonResponse({ error: 'Server configuration error' }, 500);
  }

  // Send business notification email
  const businessSubject = `New ReviewBoost Inquiry — ${data.businessName}`;
  const businessHtml = `<pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(buildBusinessEmail(data))}</pre>`;

  const businessResult = await sendEmail(
    contactEmail,
    businessSubject,
    businessHtml,
  );
  if (!businessResult.success) {
    return jsonResponse(
      { error: 'Unable to send inquiry. Please try again later.' },
      500,
    );
  }

  // Send customer confirmation (best-effort, don't fail the request)
  const confirmation = buildCustomerConfirmation(data, data.language);
  await sendEmail(data.email, confirmation.subject, confirmation.html).catch(
    () => {
      console.warn('Failed to send customer confirmation email');
    },
  );

  return jsonResponse({ success: true }, 200);
}
