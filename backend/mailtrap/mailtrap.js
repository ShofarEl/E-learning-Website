import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with Mailtrap SMTP
export const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER || "api", // Fallback to "api" if not in .env
    pass: process.env.MAILTRAP_PASS ||"142b508252ec259d5c431919dd16015b" // Fallback to your key
  }
});

