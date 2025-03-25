// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Add a route for portfolio details
app.get('/portfolio-details.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/portfolio-details.html'));
});

// Add a route handler to add the portfolio-details-page class to the body
app.use((req, res, next) => {
  if (req.path.includes('portfolio-details')) {
    res.locals.pageClass = 'portfolio-details-page';
  }
  next();
}); 