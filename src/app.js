const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
// Enable compression
const compression = require('compression');
app.use(compression());

// Cache static assets
app.use(express.static('public', {
    maxAge: '1y',
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=0');
        }
    }
}));
// Sample projects data
const projects = [
    {
        title: "Project 1",
        image: "/images/project1.jpg",
        description: "Project description..."
    },
    // Add more projects...
];

// Configuration
app.set('views', path.join(__dirname, 'views')); // Points to src/views
app.use(express.static('public'));
app.set('view engine', 'ejs');

console.log("Views directory:", path.join(__dirname, 'views'));
// Should show: "Views directory: C:\...\My Portfolio\src\views"

// Routes
app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/', (req, res) => {
    res.render('index', { 
        projects,
        education: [
            {
                degree: "Bachelor of Technology",
                institution: "Your University",
                duration: "2020-2024",
                details: "Computer Science & Engineering"
            }
        ]
    });
});

// Email setup (configure with your email service)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'your-email@example.com',
        subject: `New message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions);
    res.redirect('/?success=true');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
