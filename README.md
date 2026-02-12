# Niyati Sheth - Frontend Developer Portfolio 🚀

A modern, eye-catching portfolio website built with **Vite**, **React**, and **Tailwind CSS**. Features smooth animations, responsive design, and a clean white theme with dark accent colors.

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)

---

## ✨ Features

✅ **Beautiful & Responsive** - Mobile-first design that works on all devices  
✅ **Smooth Animations** - Hover effects and transitions on all interactive elements  
✅ **Eye-Catching Design** - Indigo/Purple gradient theme with dark accents  
✅ **Reusable Components** - Modular component architecture for easy customization  
✅ **Centralized Data** - All content in one `portfolio.ts` file  
✅ **No GitHub Button** - Clean project cards without code repo links  
✅ **Fast Performance** - Optimized with Vite for lightning-fast builds  
✅ **SEO Friendly** - Proper meta tags and semantic HTML  

---

## 🛠️ Tech Stack

- **Vite** - Next-gen frontend build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Node.js** - Runtime environment

---

## 📦 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Opens automatically at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```
Creates optimized files in `/dist` folder

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable components
│   │   │   ├── Button.tsx        # CTA button with variants
│   │   │   ├── ProjectCard.tsx   # Project showcase card
│   │   │   ├── SkillBadge.tsx    # Skill display badge
│   │   │   ├── SectionHeader.tsx # Section titles
│   │   │   └── ExperienceCard.tsx
│   │   └── sections/            # Page sections
│   │       ├── Hero.tsx          # Main intro
│   │       ├── Projects.tsx      # Projects showcase
│   │       ├── Skills.tsx        # Skills display
│   │       ├── Experience.tsx    # Work experience
│   │       ├── Education.tsx     # Education details
│   │       └── Footer.tsx        # Footer
│   ├── data/
│   │   └── portfolio.ts         # ⭐ All content data
│   ├── App.tsx                  # Main component
│   ├── App.css                  # Animations
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── vite.config.ts               # Vite config
├── tailwind.config.js           # Tailwind config
├── postcss.config.js            # PostCSS config
└── package.json
```

---

## 🎨 Customization

### Update Your Information
Edit `/src/data/portfolio.ts`:
```typescript
export const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your@email.com",
    // ... more details
  },
  // Add your projects, skills, experience, education
}
```

### Modify Colors
The portfolio uses Indigo/Purple theme. To change:
1. Search for `indigo-600` and `purple-600` in components
2. Replace with Tailwind color classes
3. Rebuild with `npm run build`

### Customize Animations
Edit `/src/App.css` to modify:
- `fadeInUp` - Fade-in animations
- `slideInLeft/Right` - Slide animations
- `pulse-glow` - Glow effects

---

## 🚀 Deployment

### GitHub Pages (Free)
1. Create GitHub repo: `portfolio`
2. Update `vite.config.ts` - add `base: '/portfolio/'`
3. Push code to GitHub
4. Go to Settings → Pages → Deploy from branch: `main`
5. Site live at: `https://username.github.io/portfolio/`

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub repo
3. Click Deploy
4. Site live instantly!

### Netlify
1. Connect GitHub to [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish: `dist`
4. Deploy!

**For detailed steps, see [SETUP_AND_DEPLOYMENT.md](./SETUP_AND_DEPLOYMENT.md)**

---

## 📊 Sections Included

| Section | File | Features |
|---------|------|----------|
| **Hero** | Hero.tsx | Greeting, CTA buttons, Social links |
| **Projects** | Projects.tsx | 2-column grid, Tech tags, Highlights |
| **Skills** | Skills.tsx | Frontend, Tools, Other skills grouped |
| **Experience** | Experience.tsx | Timeline, Company details, Achievements |
| **Education** | Education.tsx | Degree, Institution, CGPA |
| **Footer** | Footer.tsx | Contact info, Quick links, Dark theme |

---

## 🎯 Component Usage

### Button Component
```tsx
<Button variant="primary" size="md" onClick={() => {}}>
  Click Me
</Button>
```

### Project Card
```tsx
<ProjectCard
  name="Project Name"
  tech={["React", "TypeScript"]}
  description="Short description"
  highlights={["Feature 1", "Feature 2"]}
/>
```

### Skill Badge
```tsx
<SkillBadge skill="React.js" index={0} />
```

---

## 🔧 Available Scripts

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📱 Responsive Design

- **Mobile** (< 640px) - Single column, full width
- **Tablet** (640px - 1024px) - 2 columns for projects
- **Desktop** (> 1024px) - Full responsive layout

---

## ♿ Accessibility

- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Color contrast compliance
- Alt text for images

---

## 📝 License

Free to use and modify for personal/professional purposes.

---

## 🤝 Contributing

Have ideas? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📧 Contact

**Niyati Sheth**
- Email: niyatisheth6@gmail.com
- Phone: 9773207571
- LinkedIn: [Connect](https://www.linkedin.com/in/niyati-sheth-955704147)
- Location: Dholka, India

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons & Emojis for visual appeal

---

## 📚 Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [GitHub Pages Guide](https://pages.github.com)

---

**Made with ❤️ using React + Vite + Tailwind CSS**

⭐ If you like this template, give it a star!
