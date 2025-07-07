// app/api/contact/route.js
// This is a Next.js Route Handler for API requests.

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, email, subject, message } = formData;

    // --- Simulate sending an email ---
    // In a real application, you would integrate with an email service here (e.g., Nodemailer, SendGrid, Mailgun).
    // For this environment, we'll just log the "email" content to the console.
    console.log('--- Simulating Email Send ---');
    console.log(`To: dummy-email@example.com`); // Or your actual recipient email
    console.log(`From: ${email} (Name: ${name})`);
    console.log(`Subject: ${subject}`);
    console.log('Message:');
    console.log(message);
    console.log('---------------------------');

    // You can add more robust validation here before "sending" the email
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Simulate a delay for API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return a success response
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
