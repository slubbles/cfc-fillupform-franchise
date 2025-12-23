# Development Session Notes - CFC Franchise Form

## Session Date: December 21, 2025

---

## Project Overview

**Goal**: Create a custom franchise inquiry form for Calamias Fried Chicken that submits to Google Forms backend.

**Approach**: Hybrid solution (Option B) - Custom branded UI + Google Forms backend for reliability and notifications.

---

## What We Built

### 1. Design System Extraction
- Created `extract-design-system.js` - browser console script
- Extracted design tokens from https://calamiasfriedchicken.com
- Colors, fonts, typography, spacing all captured

### 2. Next.js Application
- **Framework**: Next.js 15.1.0 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (new @theme syntax)
- **Font**: Inter from Google Fonts (weights 400-900)

### 3. Brand Colors Configured
```css
--color-cfc-red: #FF0016        /* Main CTAs, headers */
--color-cfc-yellow: #FEEE07     /* Background accents */
--color-cfc-light-blue: #E5F5F9 /* Info boxes */
--color-cfc-dark: #0E1318       /* Text */
--color-cfc-brown: #48251F      /* Secondary text */
```

### 4. Form Fields (6 fields - removed cityLocation)
1. **Full Name** - Required, text input
2. **Contact Number** - Required, tel input
3. **Email Address** - Required, email input
4. **Preferred Franchise Location Address** - Optional, textarea
5. **Business Experience** - Required, dropdown with 3 options:
   - Yes - Food Service Industry
   - Yes - Other Industry
   - No - First Time Business Owner
6. **Facebook Messenger Account** - Optional, text input

---

## Google Forms Integration

### Google Form Details
- **Form URL**: https://forms.gle/3Gp3gYK135V9paNX8
- **Edit URL**: https://docs.google.com/forms/d/1XzreHz0en34t_Oa-Kgaf6rL2q5_p4IuAgBfQUP9hePU/edit
- **Responses URL**: https://docs.google.com/forms/d/1XzreHz0en34t_Oa-Kgaf6rL2q5_p4IuAgBfQUP9hePU/edit#responses

### Entry ID Mapping
```typescript
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSefHdrfX52J1VrYc-U3wP95K6WRjZZWxu87VvsWLUeQj2IZkA/formResponse';

const FIELD_IDS = {
  fullName: 'entry.1544563728',
  contactNumber: 'entry.1185791663',
  email: 'entry.232607194',
  preferredAddress: 'entry.2035646789',
  businessExperience: 'entry.915123864',
  messengerAccount: 'entry.953317574',
};
```

### Key Files Modified

#### `/app/api/submit/route.ts`
- Main API endpoint for form submissions
- Converts form data to URLSearchParams
- Posts to Google Forms formResponse endpoint
- Handles redirects (Google Forms returns 303 on success)
- Added detailed logging for debugging

**Important Fix Applied**:
```typescript
redirect: 'manual', // Don't follow redirects
// Accept status 0 or 200-399 as success (includes 303 redirect)
if (response.status === 0 || (response.status >= 200 && response.status < 400)) {
  // Success!
}
```

#### `/app/page.tsx`
- Main form component
- Removed cityLocation field (you deleted it from Google Form)
- State management with useState
- Form submission to `/api/submit`
- Redirects to `/thank-you` on success

#### `/app/thank-you/page.tsx`
- Success page with next steps
- Shows 3-step process (email, text, phone call)
- Contact information display
- Back to home button

#### `/app/globals.css`
- Fixed @import ordering (Google Fonts import MUST come first)
- Tailwind CSS v4 @theme inline syntax
- CFC brand colors defined

---

## Issues Encountered & Fixed

### Issue 1: CSS Import Order Error
**Problem**: `@import rules must precede all rules aside from @charset`

**Fix**: Moved Google Fonts @import before @import "tailwindcss"
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
@import "tailwindcss";
```

### Issue 2: Google Forms Submission Failing
**Problem**: Google Forms returns redirect (status 303), not 200 OK

**Status**: Fixed in code by handling redirects properly, but **NOT TESTED YET**

**What to test**:
1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Fill form and submit
4. Check terminal logs for detailed output
5. Check Google Form responses

---

## Current Status

### ✅ Completed
- Design system extraction
- Next.js project setup with TypeScript + Tailwind
- All form pages (main, thank-you)
- Google Forms integration code
- API route with proper redirect handling
- Brand styling with CFC colors
- Mobile responsive design
- Production build successful
- Documentation files created

### 🔄 In Progress / Needs Testing
- **Google Forms submission** - Code is fixed but needs live testing
- Form validation might need adjustment
- Error handling could be improved

### ⏳ Not Started
- Deployment to Vercel
- Custom domain setup (franchise.calamiasfriedchicken.com)
- Google Forms email notifications setup
- Google Sheets integration
- Analytics/tracking

---

## How It Works (The Flow)

1. User visits `yourdomain.com` (or localhost:3000)
2. Sees **branded CFC form** with red/yellow colors
3. Fills out 6 fields
4. Clicks Submit button
5. Frontend sends JSON to `/api/submit`
6. API route converts to URLSearchParams
7. **Server-side POST** to Google Forms formResponse endpoint
8. Google Forms stores submission
9. User redirected to `/thank-you` page
10. **You get email notification** from Google Forms
11. Data appears in **Google Sheets** (when linked)

---

## Repository Structure

```
cfc-fillupform-franchise/
├── app/
│   ├── globals.css              # Brand colors, fonts
│   ├── layout.tsx               # Root layout with Inter font
│   ├── page.tsx                 # Main form (6 fields)
│   ├── api/
│   │   └── submit/
│   │       └── route.ts         # Google Forms API integration
│   └── thank-you/
│       └── page.tsx             # Success page
├── public/                      # Static assets
├── extract-design-system.js     # Design token extractor
├── GOOGLE-FORMS-SETUP-COMPLETE.md  # Integration guide
├── SESSION-NOTES.md             # This file
├── DEPLOYMENT.md                # Deployment instructions
├── PROJECT-COMPLETE.md          # Project completion checklist
├── QUICK-REFERENCE.md           # Quick command reference
├── README.md                    # Project readme
├── package.json                 # Dependencies
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind v4 config
└── tsconfig.json                # TypeScript config
```

---

## Commands Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Testing
# Fill form at localhost:3000
# Check terminal for logs
# Check Google Form responses at:
# https://docs.google.com/forms/d/1XzreHz0en34t_Oa-Kgaf6rL2q5_p4IuAgBfQUP9hePU/edit#responses

# Deployment (when ready)
git add .
git commit -m "Complete Google Forms integration"
git push
# Then deploy via Vercel dashboard
```

---

## Next Session TODO List

### High Priority
1. **TEST GOOGLE FORMS SUBMISSION**
   - Start dev server
   - Fill out form completely
   - Check if response appears in Google Form
   - Review terminal logs for any errors
   
2. **If submission still fails:**
   - Check CORS issues
   - Verify entry IDs are correct
   - Test with curl/Postman directly
   - Consider using Google Forms API instead

3. **Deploy to Vercel**
   - Push to GitHub
   - Import repo in Vercel
   - Deploy (auto-detects Next.js)
   - Test production deployment

### Medium Priority
4. Set up Google Forms email notifications
5. Link Google Form to Google Sheets
6. Add form validation improvements
7. Add loading states/animations
8. Add error messages for users

### Low Priority
9. Set up custom domain
10. Add analytics
11. Add reCAPTCHA (if spam becomes issue)
12. Add thank you email automation

---

## Important Notes

### Why Google Forms?
- **Instant notifications** via email
- **Automatic Google Sheets** integration
- **Zero hosting costs** for data storage
- **Reliable** infrastructure
- **Perfect for ad campaigns** (you mentioned running ads)

### Why NOT pure Google Forms?
- **Professional branded experience** matters
- **Custom UI** matches CFC website
- **Better conversion rates** than generic form
- **Full control** over user experience

### Design Decisions
- **Inter font**: Professional, readable, good for forms
- **CFC red (#FF0016)**: Primary CTA color for submit button
- **Removed cityLocation**: You deleted it from Google Form
- **Business Experience dropdown**: Matches your Google Form exactly
- **Optional fields**: Only name, contact, email are required

---

## Debugging Tips

### If Google Forms submission fails:

1. **Check terminal logs** - should show detailed output
2. **Verify entry IDs** - inspect Google Form HTML source
3. **Test direct submission**:
```bash
curl -X POST \
  'https://docs.google.com/forms/d/e/1FAIpQLSefHdrfX52J1VrYc-U3wP95K6WRjZZWxu87VvsWLUeQj2IZkA/formResponse' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'entry.1544563728=Test Name&entry.1185791663=1234567890&entry.232607194=test@email.com&entry.2035646789=Test Address&entry.915123864=Yes - Food Service Industry&entry.953317574=TestMessenger'
```

4. **Check Google Form settings** - make sure it accepts responses
5. **Try with different browser** - could be cache issue

### Common Issues
- **CORS errors**: Should not happen (server-side request)
- **Wrong entry IDs**: Re-extract from form source
- **Form closed**: Check Google Form settings
- **Network issues**: Check internet connection

---

## Contact Information (CFC)

- **Phone**: (+63) 909 939 4352
- **Website**: https://calamiasfriedchicken.com
- **Form**: https://forms.gle/3Gp3gYK135V9paNX8

---

## Tech Stack Summary

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.0 | React framework with Turbopack |
| TypeScript | Latest | Type safety |
| Tailwind CSS | v4 | Styling with @theme inline |
| React | 19 | UI library |
| Inter Font | Latest | Professional typography |
| Google Forms | - | Backend data storage |
| Vercel | - | Deployment (free tier) |

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [Google Forms API](https://developers.google.com/forms/api)
- [Vercel Deployment](https://vercel.com/docs)

---

## Final Notes

This project is **95% complete**. The only remaining step is to verify that the Google Forms submission works correctly. Once tested and working, you can deploy to Vercel immediately.

The custom form provides a professional branded experience while leveraging Google Forms' reliability and notification system - perfect for capturing leads from paid advertising campaigns.

**Remember**: Always test form submission before deploying to production!

---

*Session ended: December 21, 2025*  
*Repository: slubbles/cfc-fillupform-franchise*  
*Branch: main*
