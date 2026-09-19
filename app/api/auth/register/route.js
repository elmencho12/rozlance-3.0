import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Verification from '@/models/Verification';
import { sendOTP } from '@/lib/mailer';
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await dbConnect();
    if (await User.findOne({ email }))
      return NextResponse.json({ error: 'User exists' }, { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Verification.deleteMany({ email });
    await Verification.create({ email, otp, name, password: hashed });
    console.log(`✅ OTP for ${email}: ${otp}`);
    try {
      await sendOTP(email, otp);
    } catch (e) {}
    return NextResponse.json({ message: 'OTP sent' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
