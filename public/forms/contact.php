<?php
  /**
  * Contact Form Script
  * Processes form submissions from the website contact form
  * and sends emails to the site owner
  */

  // Replace with your email
  $receiving_email_address = 'aniketdhakate2570@gmail.com';

  // Check if the form is submitted
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Simple security check - if this field is empty, continue
    if (!empty($_POST['honeypot'])) { 
      die(); 
    }
    
    // Form validation
    $errors = array();
    
    // Required fields
    $required_fields = array('name', 'email', 'subject', 'message');
    foreach ($required_fields as $field) {
      if (empty($_POST[$field])) {
        $errors[] = 'The ' . $field . ' field is required.';
      }
    }
    
    // Email validation
    if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
      $errors[] = 'Please enter a valid email address.';
    }
    
    // If there are validation errors
    if (!empty($errors)) {
      $response = array(
        'success' => false,
        'message' => implode('<br>', $errors)
      );
      echo json_encode($response);
      exit;
    }
    
    // Sanitize form data
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $subject = htmlspecialchars(strip_tags($_POST['subject']));
    $message = htmlspecialchars(strip_tags($_POST['message']));
    
    // Prepare email content
    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: noreply@yourportfolio.com\n";
    $headers .= "Reply-To: $email\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($receiving_email_address, $email_subject, $email_body, $headers)) {
      $response = array(
        'success' => true,
        'message' => 'Your message has been sent. Thank you!'
      );
    } else {
      $response = array(
        'success' => false,
        'message' => 'Unable to send email. Please try again later.'
      );
    }
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  } else {
    // Not a POST request
    $response = array(
      'success' => false,
      'message' => 'Invalid request method.'
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
?> 