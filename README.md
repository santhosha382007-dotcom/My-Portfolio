# AATHIAA — Personal Portfolio Website

Personal portfolio website for **Santhosh A.** (*Cyber Security | Software Engineering | AI Innovation*), designed with a luxury obsidian black, crimson red, and metallic gold visual identity.

> **"I Turn Ideas Into Intelligent Solutions."**

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion** (scroll reveals, section transitions, interactive cards, reduced-motion support)
- **Lucide React** (crisp icons)
- **tsParticles (`@tsparticles/react` + `@tsparticles/slim`)** (subtle ambient hero particles, mobile-optimized & pauseable)
- **Node.js + Express + Nodemailer Backend (`server/index.mjs` & `api/contact.js`)** (direct email delivery to `santhosha382007@gmail.com` via Gmail SMTP, plus zero-config FormSubmit fallback)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Typecheck and build for production
npm run build

# 4. Preview production build locally
npm run preview
```

## Updating Portfolio Content

All personal information, links, skills, projects, timeline entries, and certifications live in clean data modules under `src/data/`:

| File | What to Edit |
| --- | --- |
| `src/data/profile.ts` | Bio, tagline, roles, social URLs (GitHub, LinkedIn, Instagram, Email), and Resume PDF config |
| `src/data/skills.ts` | Skill categories and skill items |
| `src/data/projects.ts` | Project descriptions, status (`Concept`, `In Development`, `Completed`), stack, GitHub & Live Demo URLs |
| `src/data/experience.ts` | Education details and internship/workshop/hackathon/club timeline slots |
| `src/data/certifications.ts` | Verified certificates, issuers, completion dates, images, and verification links |

### Adding Your Resume PDF

1. Place your PDF in `public/Santhosh-A-Resume.pdf`.
2. In `src/data/profile.ts`, set `resume.isPlaceholder` to `false`.

### Configuring Direct Email Delivery (`santhosha382007@gmail.com`)

Portfolio messages from the Contact section are sent to **`POST /api/contact`** (`server/index.mjs` locally, `api/contact.js` on Vercel) and delivered directly to `santhosha382007@gmail.com` with `Reply-To` set to the visitor's email.

1. Open `.env.local` (or copy `.env.example` to `.env.local`):
   ```env
   CONTACT_RECEIVER_EMAIL=santhosha382007@gmail.com
   GMAIL_USER=santhosha382007@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_gmail_app_password
   ```
2. Generate a **Google App Password** for `santhosha382007@gmail.com`:
   - Enable **2-Step Verification** in your Google Account security settings.
   - Visit [Google App Passwords](https://myaccount.google.com/apppasswords), create an app password named `Portfolio Mail`, and paste the 16-character password into `GMAIL_APP_PASSWORD`.
3. Run `npm run dev` (starts both the Vite frontend on `http://localhost:3003` and the Express contact backend on `http://localhost:3004`).
4. Never commit `.env.local` to version control. Configure `CONTACT_RECEIVER_EMAIL`, `GMAIL_USER`, and `GMAIL_APP_PASSWORD` in your hosting provider's environment variables when deploying.

> **Fallback behavior:** If `GMAIL_APP_PASSWORD` is not set yet (or the site is deployed as a static site), the contact form automatically falls back to FormSubmit (`https://formsubmit.co/ajax/santhosha382007@gmail.com`). Click the one-time activation email sent to `santhosha382007@gmail.com` after the first submission so messages arrive directly in Gmail.

## Deployment

### Vercel (Recommended — Frontend + `/api/contact` Serverless Backend)
1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Framework preset: **Vite** (`npm run build`, output directory `dist`). Vercel automatically deploys `api/contact.js` as a serverless function.
4. Add `CONTACT_RECEIVER_EMAIL`, `GMAIL_USER`, and `GMAIL_APP_PASSWORD` under **Project Settings -> Environment Variables**.
5. Deploy.

### Netlify / Static Hosting
1. Connect the GitHub repository in [Netlify](https://www.netlify.com/).
2. Build command: `npm run build` | Publish directory: `dist`.
3. Either point `VITE_API_BASE_URL` to your hosted Express backend (`server/index.mjs`) or rely on the built-in direct FormSubmit fallback to `santhosha382007@gmail.com`.
