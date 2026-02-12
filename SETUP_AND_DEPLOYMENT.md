# Niyati Sheth - Portfolio Setup & Deployment Guide

This is a beautiful, responsive portfolio built with **Vite**, **React**, and **Tailwind CSS**. Follow these steps to set it up locally and deploy it to GitHub.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org)
- **Git** - [Download here](https://git-scm.com)
- **GitHub Account** - [Create one here](https://github.com)

---

## 🚀 Step 1: Download the Project

### Option A: Download as ZIP
1. Click the "Download ZIP" button in the project
2. Extract the ZIP file to your desired location
3. Open terminal/command prompt in the extracted folder

### Option B: Clone from GitHub (if already uploaded)
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

---

## 💻 Step 2: Install Dependencies

Run this command in your project directory:

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

Or with pnpm:
```bash
pnpm install
```

This will install all required packages including:
- React & React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- TypeScript

---

## 🏃 Step 3: Run Locally

Start the development server:

```bash
npm run dev
```

The portfolio will open automatically at `http://localhost:5173`

You can now:
- Edit files and see changes instantly (Hot Module Replacement)
- Test all interactive features
- Check how it looks on different screen sizes

**To stop the server**: Press `Ctrl+C` (or `Cmd+C` on Mac)

---

## 🔧 Step 4: Customize Your Portfolio

### Update Personal Information
Edit `/src/data/portfolio.ts`:
- Personal details (name, email, phone, links)
- Summary text
- Projects
- Experience
- Skills
- Education

### Modify Colors & Styles
- Edit `/src/App.css` for animations
- Edit `/src/index.css` for global styles
- Tailwind classes are used throughout components

### Change Section Content
Each section has its own file in `/src/components/sections/`:
- `Hero.tsx` - Main intro section
- `Projects.tsx` - Projects showcase
- `Skills.tsx` - Skills display
- `Experience.tsx` - Work experience
- `Education.tsx` - Education details
- `Footer.tsx` - Footer with contact info

---

## 📦 Step 5: Build for Production

When you're ready to deploy, create an optimized build:

```bash
npm run build
```

This creates a `/dist` folder with optimized files ready for deployment.

---

## 🌍 Step 6: Deploy to GitHub & GitHub Pages

### Step 6A: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio` (or any name you prefer)
3. Add description: "Frontend Developer Portfolio"
4. Choose "Public" (so it's visible to everyone)
5. Click "Create repository"

### Step 6B: Initialize Git & Push Code

In your project terminal, run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Add GitHub as remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 6C: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll to **Pages** section (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Select branch: **main**, folder: **/ (root)**
6. Click **Save**

GitHub will now build and deploy your site. It may take a few minutes.

Your portfolio will be live at: `https://USERNAME.github.io/portfolio/`

---

## 🎯 Step 7: Update GitHub Pages Configuration (Important!)

Since the repo is named `portfolio`, you need to update `vite.config.ts`:

Edit `/vite.config.ts` and add:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Add this line
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
})
```

Then rebuild and push:
```bash
npm run build
git add .
git commit -m "Update base path for GitHub Pages"
git push
```

---

## 🔄 Making Updates

Whenever you make changes:

1. **Make your edits** - Update components, data, or styles
2. **Test locally** - Run `npm run dev` to verify
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update: [describe your changes]"
   git push
   ```
4. **GitHub Pages will auto-deploy** - Your live site updates in a few minutes

---

## 🚀 Advanced Deployment Options

### Option 1: Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your portfolio repository
5. Click "Deploy"

Your site will be live instantly at `vercel.com` subdomain!

### Option 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub account
3. Select your repository
4. Configure: Build command: `npm run build`, Publish: `dist`
5. Deploy!

### Option 3: Custom Domain
Once deployed to GitHub Pages/Vercel/Netlify:
1. Buy a domain (GoDaddy, Namecheap, etc.)
2. Update DNS settings to point to your deployment
3. Add custom domain in your hosting settings

---

## 📱 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── SkillBadge.tsx
│   │   │   └── ...
│   │   └── sections/        # Page sections
│   │       ├── Hero.tsx
│   │       ├── Projects.tsx
│   │       └── ...
│   ├── data/
│   │   └── portfolio.ts     # All your content data
│   ├── App.tsx              # Main component
│   ├── App.css              # Animations
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

---

## 🎨 Customization Tips

### Change Colors
All color gradients use Indigo/Purple theme. To change:
1. Search for `from-indigo-600` and `to-purple-600` in components
2. Replace with your preferred Tailwind colors
3. Rebuild and test

### Add More Projects
Edit `/src/data/portfolio.ts` - Add to `projects` array:
```typescript
{
  id: 5,
  name: "Your Project Name",
  tech: ["React", "Tailwind CSS"],
  description: "Brief description",
  highlights: ["Feature 1", "Feature 2"],
},
```

### Change Animations
Edit `/src/App.css` - Modify keyframes for different effects

---

## 🆘 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages not updating
1. Check the build status in Actions tab
2. Clear browser cache (Ctrl+Shift+Delete)
3. Wait 5-10 minutes for deployment

### Dependencies not installing
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

---

## 📞 Support

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **GitHub Pages**: https://pages.github.com

---

## ✨ Next Steps

1. ✅ Install and run locally
2. ✅ Customize with your information
3. ✅ Test all sections and links
4. ✅ Create GitHub repository
5. ✅ Push to GitHub
6. ✅ Enable GitHub Pages
7. ✅ Share your portfolio with the world! 🎉

---

Happy coding! 🚀
