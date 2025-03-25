const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Configuration
const sourceDir = 'src/views';
const publicDir = 'public';
const outputDir = 'docs'; // GitHub Pages uses /docs or root for publishing

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy all files from public to output directory
console.log('Copying assets from public directory...');
copyDirectory(publicDir, outputDir);

// Render EJS templates and save as HTML
console.log('Converting EJS templates to HTML...');
renderEjsTemplates();

console.log('Done! Your static site is ready in the docs/ directory.');
console.log('Push this to GitHub and enable GitHub Pages in your repository settings.');
console.log('Set the source to the /docs folder in your repository settings.');

// Function to copy a directory recursively
function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Get all files and directories in the source
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    // Skip node_modules
    if (entry.name === 'node_modules') continue;
    
    // Skip .git directory
    if (entry.name === '.git') continue;

    if (entry.isDirectory()) {
      // Recursively copy directory
      copyDirectory(sourcePath, destinationPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

// Function to render EJS templates
function renderEjsTemplates() {
  // Find all EJS files
  const files = fs.readdirSync(sourceDir);
  
  for (const file of files) {
    if (path.extname(file) === '.ejs') {
      const filePath = path.join(sourceDir, file);
      const outputPath = path.join(outputDir, file.replace('.ejs', '.html'));
      
      // Read EJS template
      const template = fs.readFileSync(filePath, 'utf8');
      
      try {
        // Render EJS template (simplified - no data passed)
        const html = ejs.render(template, {});
        
        // Write HTML to output file
        fs.writeFileSync(outputPath, html);
        console.log(`Converted ${file} to HTML`);
      } catch (error) {
        console.error(`Error rendering ${file}:`, error);
      }
    }
  }
} 