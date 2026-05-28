# SafiBase Landing Page

AI Appointment & Reminder Workflow for Immigration Consultants — lead-capture landing page built with React + Tailwind CSS + Framer Motion.

---

## Project Structure

```
safibase/
├── public/
│   └── index.html              # HTML shell, Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav with scroll detection
│   │   ├── HeroSection.jsx     # Hero headline + lead form
│   │   ├── LeadForm.jsx        # Form with Airtable/Formspree/webhook
│   │   ├── ProblemSection.jsx  # Pain-point cards
│   │   ├── SolutionSection.jsx # Feature cards with hover effects
│   │   ├── ResultsSection.jsx  # Outcome cards (dark section)
│   │   └── CtaAndFooter.jsx    # Final CTA + footer
│   ├── App.jsx                 # Root component
│   ├── index.js                # React entry point
│   └── index.css               # Tailwind + custom styles
├── tailwind.config.js          # Brand colors, fonts, shadows
├── postcss.config.js
├── package.json
├── .env.example                # Environment variable template
└── .gitignore
```

---

## Quick Start

```bash
# 1. Clone or download the project
cd safibase

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your form backend credentials (see below)

# 4. Start development server
npm start
# → Opens at http://localhost:3000
```

---

## Form Integration Options

Set `REACT_APP_FORM_BACKEND` in your `.env` to choose your backend.

---

### Option 1 — Formspree (Recommended for beginners)

**Free tier:** 50 submissions/month · No server required

1. Go to [formspree.io](https://formspree.io) and create an account
2. Click **+ New Form** and name it "SafiBase Leads"
3. Copy the form ID from the URL: `https://formspree.io/f/xpwzabcd` → ID is `xpwzabcd`
4. In your `.env`:
   ```
   REACT_APP_FORM_BACKEND=formspree
   REACT_APP_FORMSPREE_ID=xpwzabcd
   ```
5. Submissions appear in your Formspree dashboard + email inbox instantly

---

### Option 2 — Airtable

**Free tier:** Unlimited records on free plan

#### Setup Steps

1. **Create an Airtable base:**
   - Go to [airtable.com](https://airtable.com) → **Add a base** → Start from scratch
   - Name it `SafiBase CRM`
   - Create a table named `Leads` with these fields:

   | Field Name            | Field Type     |
   |-----------------------|----------------|
   | Name                  | Single line    |
   | Company               | Single line    |
   | Email                 | Email          |
   | Phone                 | Phone number   |
   | Monthly Consultations | Single select  |
   | Biggest Bottleneck    | Single select  |
   | Submitted At          | Date           |

2. **Generate a Personal Access Token:**
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Click **+ Add a token**
   - Name: `SafiBase Landing`
   - Scopes: check `data.records:write`
   - Access: select your `SafiBase CRM` base
   - Click **Create token** and copy it

3. **Find your Base ID:**
   - Open your base in Airtable
   - Click **Help → API docs** (or go to `https://airtable.com/developers/web/api/introduction`)
   - Your Base ID starts with `app` (e.g. `appXXXXXXXXXXXXXX`)

4. **Update `.env`:**
   ```
   REACT_APP_FORM_BACKEND=airtable
   REACT_APP_AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
   REACT_APP_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   REACT_APP_AIRTABLE_TABLE_NAME=Leads
   ```

> **Security note:** Airtable tokens exposed in a React app are readable in the browser.
> For production, proxy submissions through a serverless function (Vercel Edge Function,
> Netlify Function, or Supabase Edge Function) so the token stays server-side.

---

### Option 3 — Notion API

Notion doesn't support browser-direct API calls due to CORS restrictions.
Use one of these approaches:

#### Via Make.com (no-code)
1. Create a Make.com account at [make.com](https://make.com)
2. New Scenario → **Webhooks** trigger → **Notion → Create Database Item**
3. Copy the webhook URL
4. In `.env`:
   ```
   REACT_APP_FORM_BACKEND=webhook
   REACT_APP_WEBHOOK_URL=https://hook.make.com/your_id
   ```

#### Via Vercel Serverless Function
Create `api/submit.js` in your project:
```js
// api/submit.js (Vercel serverless function)
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, company, email, phone, consultations, bottleneck } = req.body;

  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      Name:                  { title: [{ text: { content: name } }] },
      Company:               { rich_text: [{ text: { content: company } }] },
      Email:                 { email },
      Phone:                 { phone_number: phone },
      'Monthly Consultations': { select: { name: consultations } },
      'Biggest Bottleneck':  { select: { name: bottleneck } },
    },
  });

  res.status(200).json({ ok: true });
};
```

Then set `REACT_APP_FORM_BACKEND=webhook` and `REACT_APP_WEBHOOK_URL=/api/submit`.

---

### Option 4 — Make.com / Zapier / n8n Webhook

Use this to connect to ANY destination (Notion, Google Sheets, Slack, HubSpot, etc.)

**Make.com setup:**
1. New Scenario → Webhooks → **Custom webhook**
2. Click **Add** → copy the URL
3. Connect it to your destination (Notion, Airtable, Google Sheets, Slack notification, etc.)
4. In `.env`:
   ```
   REACT_APP_FORM_BACKEND=webhook
   REACT_APP_WEBHOOK_URL=https://hook.make.com/your_webhook_id
   ```

**Payload sent:**
```json
{
  "name": "Jane Smith",
  "company": "Smith Immigration",
  "email": "jane@firm.com",
  "phone": "+1 416 000 0000",
  "consultations": "11–30 / month",
  "bottleneck": "Following up with new leads",
  "source": "safibase-landing",
  "timestamp": "2025-01-15T14:32:00.000Z"
}
```

---

## GitHub Pages Deployment

### Prerequisites
- GitHub account
- Repository created (e.g. `github.com/yourusername/safibase`)

### Steps

```bash
# 1. Update package.json homepage field
# Edit package.json and change:
"homepage": "https://yourusername.github.io/safibase"
# (Replace with your actual GitHub username and repo name)

# 2. Install gh-pages (already in devDependencies)
npm install

# 3. Add your remote (if not already done)
git init
git remote add origin https://github.com/yourusername/safibase.git

# 4. Commit your code
git add .
git commit -m "Initial SafiBase landing page"
git push -u origin main

# 5. Deploy to GitHub Pages
npm run deploy
# This runs: npm run build && gh-pages -d build
# Creates a gh-pages branch and pushes the build there
```

### Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` / `/ (root)`
4. Save → your site is live in ~2 minutes

### Environment Variables on GitHub Pages
GitHub Pages only serves static files. Environment variables must be baked in at build time.
**Never store secret API keys in a React app deployed to GitHub Pages.**

For Formspree: your form ID is not sensitive — fine to include.
For Airtable: use a webhook proxy (Make.com) instead of the direct Airtable API.

---

## Vercel Deployment (Recommended for production)

Vercel is faster, supports serverless functions, and deploys automatically on git push.

### Steps

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# Follow prompts:
# → Set up and deploy? Yes
# → Which scope? (your account)
# → Link to existing project? No
# → Project name: safibase
# → Directory: ./
# → Override settings? No

# 3. For production deployment:
vercel --prod
```

### Environment Variables on Vercel
1. Go to your project on [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Add each variable from `.env.example`
4. Redeploy after adding variables

### Auto-deploy from GitHub
1. Push your repo to GitHub
2. In Vercel dashboard → **Add New Project** → import your repo
3. Every `git push main` triggers a new deployment automatically

---

## Customization Guide

### Update Brand Colors
Edit `tailwind.config.js` → `theme.extend.colors.brand`

### Update Form Fields
Edit `src/components/LeadForm.jsx` → `CONSULTATIONS` and `BOTTLENECKS` arrays

### Update Content
- **Hero copy:** `src/components/HeroSection.jsx`
- **Problems:** `src/components/ProblemSection.jsx` → `PROBLEMS` array
- **Features:** `src/components/SolutionSection.jsx` → `FEATURES` array
- **Results:** `src/components/ResultsSection.jsx` → `RESULTS` array
- **Footer links:** `src/components/CtaAndFooter.jsx`

### Update Contact Info
In `src/components/CtaAndFooter.jsx`, update:
- `href="mailto:hello@safibase.com"` → your email
- `href="https://linkedin.com/company/safibase"` → your LinkedIn URL

---

## Tech Stack

| Tool          | Version | Purpose                          |
|---------------|---------|----------------------------------|
| React         | 18.2    | UI framework                     |
| Tailwind CSS  | 3.4     | Utility-first styling            |
| Framer Motion | 11.x    | Animations (scroll, fade, hover) |
| Lucide React  | 0.383   | Icons                            |
| gh-pages      | 6.x     | GitHub Pages deployment          |

---

## License

MIT — use freely for your business.
