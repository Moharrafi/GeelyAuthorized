import nodemailer from 'nodemailer';

const normalizeTab = (tab) => {
  const normalized = String(tab || '').trim().toLowerCase();
  if (normalized === 'pre-book' || normalized === 'pre book' || normalized === 'prebook') {
    return 'pre-book';
  }
  if (normalized === 'book-now' || normalized === 'book now' || normalized === 'booknow') {
    return 'book-now';
  }
  if (normalized === 'test-drive' || normalized === 'test drive' || normalized === 'uji coba') {
    return 'test-drive';
  }
  return normalized || 'unknown';
};

const formatTabLabel = (tab) => {
  switch (tab) {
    case 'pre-book':
      return 'Pre-Book';
    case 'book-now':
      return 'Book Now';
    case 'test-drive':
      return 'Test Drive';
    default:
      return 'Booking';
  }
};

const formatSubject = (tab) => {
  switch (tab) {
    case 'pre-book':
      return 'New Pre-Book Request';
    case 'book-now':
      return 'New Book Now Request';
    case 'test-drive':
      return 'New Test Drive Request';
    default:
      return 'New Booking Request';
  }
};

const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const portEnv = Number(process.env.SMTP_PORT || 465);
  const secure = portEnv === 465;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Missing SMTP credentials.');
  }

  return nodemailer.createTransport({
    host,
    port: portEnv,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const {
    tab,
    name,
    email,
    phone,
    province,
    city,
    model,
    consent
  } = req.body || {};

  if (!name || !email || !phone || !province || !city) {
    res.status(400).json({ ok: false, error: 'Missing required fields.' });
    return;
  }

  try {
    const normalizedTab = normalizeTab(tab);
    const subject = formatSubject(normalizedTab);
    const rows = [
      { label: 'Tab', value: formatTabLabel(normalizedTab) },
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Province', value: province },
      { label: 'City', value: city },
      { label: 'Preferred Model', value: model || '-' },
      { label: 'Consent', value: consent ? 'Yes' : 'No' }
    ];

    const transporter = createTransporter();
    const to = process.env.SMTP_TO || 'diananistii@gmail.com';
    const fromName = process.env.SMTP_FROM_NAME || 'Diana Nisti';
    const fromEmail = process.env.SMTP_USER;

    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject,
      text: rows.map((row) => `${row.label}: ${row.value}`).join('\n'),
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#0b1220; padding:24px; color:#e2e8f0;">
          <div style="max-width:640px; margin:0 auto; background:#0f172a; border:1px solid #1f2937; border-radius:18px; overflow:hidden; box-shadow:0 12px 30px rgba(2,6,23,0.35);">
            <div style="height:6px; background:linear-gradient(90deg,#38bdf8 0%,#0ea5e9 50%,#1d4ed8 100%);"></div>
            <div style="padding:22px 24px 18px; border-bottom:1px solid #1f2937;">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <img src="https://geelysmgroup.com/wp-content/uploads/2025/01/Geely-white-1.png" alt="Geely" style="height:28px; display:block;" />
              </div>
              <div style="font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#94a3b8;">Pemesanan Geely</div>
              <div style="font-size:22px; font-weight:700; margin-top:8px; color:#f8fafc;">${subject}</div>
              <div style="font-size:12px; color:#94a3b8; margin-top:6px;">Submission details</div>
            </div>
            <div style="padding:20px 24px 8px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate; border-spacing:0 8px; font-size:14px; color:#e2e8f0;">
                ${rows
                  .map(
                    (row, idx) => `
                      <tr style="background:${idx % 2 === 0 ? '#0b1324' : '#0f172a'};">
                        <td style="padding:12px 14px; color:#94a3b8; width:38%; border-radius:10px 0 0 10px; border:1px solid #1f2937; border-right:none;">
                          ${row.label}
                        </td>
                        <td style="padding:12px 14px; color:#f8fafc; font-weight:600; border-radius:0 10px 10px 0; border:1px solid #1f2937; border-left:none;">
                          ${row.value}
                        </td>
                      </tr>
                    `
                  )
                  .join('')}
              </table>
            </div>
            <div style="padding:16px 24px; background:#0b1220; color:#94a3b8; font-size:12px; border-top:1px solid #1f2937;">
              Submitted from Geely website booking form.
            </div>
          </div>
        </div>
      `
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to send email.' });
  }
}
