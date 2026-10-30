import { createFileRoute } from '@tanstack/react-router';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/contact-schema';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a7a8d;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:110px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eee;color:#2a1f2d;font-size:15px;">${value}</td>
  </tr>`;

export const Route = createFileRoute('/api/contacto')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = contactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ ok: false }, { status: 400 });
          }
          const { name, email, phone, service, message } = parsed.data;
          const reference = crypto.randomUUID().slice(0, 8).toUpperCase();

          const user = process.env['SMTP_USER'];
          const transporter = nodemailer.createTransport({
            host: process.env['SMTP_HOST'],
            port: Number(process.env['SMTP_PORT'] ?? 465),
            secure: true,
            auth: { user, pass: process.env['SMTP_PASS'] },
          });

          const html = `
<div style="background:#f5f2f6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
  <table align="center" width="100%" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background:#552d5c;padding:28px 32px;">
        <div style="color:#d9c4dd;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Nueva consulta web</div>
        <div style="color:#ffffff;font-size:24px;font-weight:bold;margin-top:6px;">Griguol e Hijos</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <div style="font-size:13px;color:#8a7a8d;margin-bottom:6px;">Servicio de interés</div>
        <div style="display:inline-block;background:#f0e6f2;color:#552d5c;font-weight:bold;font-size:14px;padding:6px 14px;border-radius:20px;">${esc(service)}</div>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
          ${row('Nombre', esc(name))}
          ${row('Email', `<a href="mailto:${esc(email)}" style="color:#552d5c;">${esc(email)}</a>`)}
          ${row('Teléfono', phone ? `<a href="tel:${esc(phone)}" style="color:#552d5c;">${esc(phone)}</a>` : '-')}
        </table>

        <div style="font-size:13px;color:#8a7a8d;margin:24px 0 8px;">Mensaje</div>
        <div style="background:#f9f6fa;border-left:4px solid #552d5c;padding:14px 16px;color:#2a1f2d;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</div>

        <div style="margin-top:28px;">
          <a href="mailto:${esc(email)}?subject=${encodeURIComponent('Re: tu consulta a Griguol e Hijos')}" style="background:#552d5c;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:4px;font-size:14px;font-weight:bold;display:inline-block;">Responder por email</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#f5f2f6;padding:14px 32px;color:#8a7a8d;font-size:12px;">
        Referencia: ${reference} · Enviado desde el formulario de la web
      </td>
    </tr>
  </table>
</div>`;

          await transporter.sendMail({
            from: `"Web Griguol e Hijos" <${user}>`,
            to: process.env['CONTACT_TO_EMAIL'],
            replyTo: email,
            subject: `Nueva consulta web: ${service} (${reference})`,
            text: [
              `Nombre: ${name}`,
              `Email: ${email}`,
              `Teléfono: ${phone || '-'}`,
              `Servicio: ${service}`,
              '',
              message,
            ].join('\n'),
            html,
          });

          return Response.json({ ok: true, reference });
        } catch (error) {
          console.error('Error enviando consulta', error);
          return Response.json({ ok: false }, { status: 500 });
        }
      },
    },
  },
});