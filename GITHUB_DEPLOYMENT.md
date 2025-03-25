# Deploying Your Portfolio to GitHub Pages

This guide will help you deploy your Node.js portfolio website to GitHub Pages, which provides free hosting for static websites.

## Prerequisites

- GitHub account
- Git installed on your computer
- Your portfolio repository cloned locally

## Step 1: Prepare Your Repository

1. Create a new GitHub repository or use an existing one.
2. Make sure your local repository is up to date with your latest changes.

## Step 2: Generate Static Files

Since GitHub Pages only serves static content (and doesn't support Node.js server-side code), we need to convert your EJS templates to static HTML:

1. Run the deployment script:
   ```
   node deploy-to-github.js
   ```

2. This will create a `docs` folder containing a static version of your site.

## Step 3: Push to GitHub

1. Commit all changes including the new `docs` folder:
   ```
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

## Step 4: Configure GitHub Pages

1. Go to your repository on GitHub.
2. Click on "Settings" tab.
3. Scroll down to the "GitHub Pages" section.
4. Under "Source", select "main branch" and "/docs" folder.
5. Click "Save".

GitHub will provide you with a URL where your site is published (typically `https://yourusername.github.io/your-repo-name/`).

## Step 5: Add a Custom Domain (Optional)

If you own a domain name and want to use it:

1. In the GitHub Pages settings, enter your custom domain in the "Custom domain" field.
2. Create a `CNAME` file in your `docs` folder containing your domain name.
3. Set up DNS records with your domain provider:
   - For an apex domain (example.com): Create an A record pointing to GitHub's IP addresses.
   - For a subdomain (www.example.com): Create a CNAME record pointing to `yourusername.github.io`.

## Important Notes for GitHub Pages

1. **Forms functionality**: The PHP form processing won't work on GitHub Pages. Consider using a form service like Formspree, Netlify Forms, or a serverless solution.

2. **Path issues**: Make sure all paths in your HTML files are relative, not absolute. Paths starting with `/` may not work correctly if your site is in a subdirectory.

3. **Single Page Application routing**: For SPA-style navigation, you'll need the 404.html page we've included to handle client-side routing.

## Maintaining Your Site

When you make changes to your site:

1. Update your source files.
2. Run the deployment script again: `node deploy-to-github.js`
3. Commit and push changes to GitHub.
4. GitHub Pages will automatically rebuild your site.

## Troubleshooting

- **404 errors**: Check that all paths in your HTML files are correct for GitHub Pages.
- **CSS/JS not loading**: Verify paths are relative and correctly pointing to your assets.
- **Custom domain not working**: Double-check DNS configuration and ensure the CNAME file exists.

For more detailed help, refer to the [GitHub Pages documentation](https://docs.github.com/en/pages). 