# 🚀 Quick Start Guide

Get your Niyati Sheth portfolio up and running in 5 minutes!

---

## Step 1: Download & Extract (1 min)

Download the ZIP file and extract it to your computer.

---

## Step 2: Install (2 min)

Open terminal in the project folder and run:

```bash
npm install
```

---

## Step 3: Run Locally (1 min)

```bash
npm run dev
```

Your portfolio opens at `http://localhost:5173` 🎉

---

## Step 4: Customize (varies)

Edit `/src/data/portfolio.ts` with your information:

```typescript
export const portfolioData = {
  personal: {
    name: "Your Name",           // Change this
    title: "Your Title",          // And this
    email: "your@email.com",      // And this
    phone: "Your Phone",
    location: "Your City",
    // ... update all fields
  },
  summary: "Your summary here",
  experience: [ /* your experiences */ ],
  projects: [ /* your projects */ ],
  skills: { /* your skills */ },
  education: [ /* your education */ ],
};
```

**That's it!** All sections update automatically.

---

## Step 5: Deploy to GitHub

### A. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `portfolio`
3. Click "Create repository"

### B. Push Your Code

In your project terminal:

```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### C. Enable GitHub Pages

1. Go to your repo → Settings
2. Scroll to "Pages"
3. Select "Deploy from a branch" → main → /root
4. Done! Your site is live at: `https://YOUR_USERNAME.github.io/portfolio/`

---

## 📝 Common Edits

### Change Colors
Search for `indigo-600` and `purple-600` in files and replace with your colors.

### Modify Animations
Edit `/src/App.css` - change keyframes for different effects.

### Add More Projects
In `portfolio.ts`, add to the `projects` array:

```typescript
{
  id: 5,
  name: "Your Project",
  tech: ["React", "Tailwind"],
  description: "What it does",
  highlights: ["Feature 1", "Feature 2"],
},
```

### Update Social Links
Edit the `personal.links` object in `portfolio.ts`.

---

## ✅ Pre-Deployment Checklist

- [ ] Updated all personal information in `portfolio.ts`
- [ ] Added all your projects
- [ ] Listed all your skills
- [ ] Updated experience & education
- [ ] Tested locally with `npm run dev`
- [ ] All links working correctly
- [ ] Ready to push to GitHub

---

## 🎯 Final Steps

```bash
npm run build        # Creates optimized version
git add .
git commit -m "Final portfolio version"
git push
```

**Boom! 🚀 Your portfolio is live!**

---

## 🆘 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
npm cache clean --force
npm install
```

**GitHub Pages not updating?**
- Wait 5-10 minutes
- Clear browser cache (Ctrl+Shift+Delete)
- Check Actions tab for build status

---

## 📚 Need More Help?

See **[SETUP_AND_DEPLOYMENT.md](./SETUP_AND_DEPLOYMENT.md)** for detailed instructions.

---

**Happy coding! 🎉**
