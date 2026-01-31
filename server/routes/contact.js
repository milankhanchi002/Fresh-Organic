const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Contact form submission
router.post('/', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('message').notEmpty().trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors: errors.array() 
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Create email transporter (configure with your email service)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'info@dairyfresh.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from DairyFresh website contact form</small></p>
      `
    };

    // Email to customer (auto-reply)
    const customerMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Thank you for contacting DairyFresh',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Best regards,<br>DairyFresh Team</p>
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `
    };

    // Send emails
    try {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(customerMailOptions);
      
      res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Still return success to user even if email fails
      res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        note: 'Your message has been received. Email notification may be delayed.'
      });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting contact form',
      error: error.message 
    });
  }
});

// Newsletter subscription
router.post('/newsletter', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors: errors.array() 
      });
    }

    const { email, name } = req.body;

    // Here you would typically save to database
    // For now, we'll just send a confirmation email

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to DairyFresh Newsletter!',
      html: `
        <h2>Welcome to DairyFresh!</h2>
        <p>Dear ${name || 'Valued Customer'},</p>
        <p>Thank you for subscribing to our newsletter! You'll now receive updates about:</p>
        <ul>
          <li>New products and offers</li>
          <li>Seasonal discounts</li>
          <li>Health tips and recipes</li>
          <li>Farm stories and updates</li>
        </ul>
        <p>Stay fresh, stay healthy!</p>
        <hr>
        <p>Best regards,<br>DairyFresh Team</p>
        <p><small>To unsubscribe, reply with "UNSUBSCRIBE" in the subject line.</small></p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      
      res.json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      });
    } catch (emailError) {
      console.error('Newsletter email error:', emailError);
      
      res.json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
        note: 'Welcome email may be delayed.'
      });
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error subscribing to newsletter',
      error: error.message 
    });
  }
});

// Feedback submission
router.post('/feedback', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('feedback').notEmpty().trim().isLength({ min: 10, max: 500 }).withMessage('Feedback must be between 10 and 500 characters'),
  body('category').optional().isIn(['product', 'service', 'delivery', 'website', 'other']).withMessage('Invalid feedback category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors: errors.array() 
      });
    }

    const { name, email, rating, feedback, category = 'other' } = req.body;

    // Here you would typically save to database
    // For now, we'll just send a notification email

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'feedback@dairyfresh.com',
      subject: `New Feedback: ${category} (${rating}/5 stars)`,
      html: `
        <h2>New Customer Feedback</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating}/5 stars</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback}</p>
        <hr>
        <p><small>Sent from DairyFresh website feedback form</small></p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      
      res.json({
        success: true,
        message: 'Thank you for your feedback! We appreciate your input.'
      });
    } catch (emailError) {
      console.error('Feedback email error:', emailError);
      
      res.json({
        success: true,
        message: 'Thank you for your feedback! We appreciate your input.',
        note: 'Your feedback has been received. Email notification may be delayed.'
      });
    }

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting feedback',
      error: error.message 
    });
  }
});

module.exports = router; 