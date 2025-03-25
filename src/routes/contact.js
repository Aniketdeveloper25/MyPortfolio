const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  try {
    // Check honeypot field for spam prevention
    if (req.body.honeypot) {
      return res.status(200).json({
        success: false,
        message: 'Form submission failed'
      });
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `The ${field} field is required.`
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Log form data for debugging
    console.log('Contact Form Submission:');
    console.log('Name:', req.body.name);
    console.log('Email:', req.body.email);
    console.log('Subject:', req.body.subject);
    console.log('Message:', req.body.message);

    // Get email credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    // Check if email credentials are available
    if (!emailUser || !emailPassword) {
      console.error('Email credentials not found in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Email configuration error. Please contact the administrator.'
      });
    }

    // Configure real email transport (Gmail)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    // Prepare email content
    let mailOptions = {
      from: `"Your Portfolio Website" <${emailUser}>`,
      to: emailUser, // Your email address
      replyTo: req.body.email,
      subject: `New Contact Form Message: ${req.body.subject}`,
      text: `
        Name: ${req.body.name}
        Email: ${req.body.email}
        
        Message:
        ${req.body.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Subject:</strong> ${req.body.subject}</p>
        <h3>Message:</h3>
        <p>${req.body.message}</p>
      `
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent. Thank you!'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send message. Please try again later.'
    });
  }
});

// Add a test route to check if the router is mounted correctly
router.get('/test', (req, res) => {
  res.send('Contact router is working!');
});

module.exports = router; 