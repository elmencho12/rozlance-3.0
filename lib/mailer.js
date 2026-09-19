import nodemailer from 'nodemailer';
export async function sendOTP(email, otp) {
  const t = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await t.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Rozlance OTP',
    html: `<h1>OTP: ${otp}</h1>`,
  });
}
