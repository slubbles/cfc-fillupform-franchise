# 🍗 Calamias Fried Chicken - Franchise Form Quick Reference

## 📝 What Was Built

✅ **Main Form Page** (`/`)
- All required fields for franchise inquiry
- Brand colors (Red #FF0016, Yellow #FEEE07, Blue #E5F5F9)
- Mobile responsive design
- Form validation
- Loading state during submission

✅ **Thank You Page** (`/thank-you`)
- Confirmation message
- Next steps explanation
- Contact information
- Link back to main website

✅ **API Endpoint** (`/api/submit`)
- Handles form submissions
- Logs data to console
- Ready for email integration

✅ **Responsive Design**
- Works on mobile, tablet, and desktop
- Inter font (psychologically proven for form completion)

## 🎯 Form Fields

1. **Full Name** (text, required)
2. **Contact Number** (tel, required)
3. **Email Address** (email, required)
4. **City/Location** (text, required)
5. **Preferred Franchise Address** (textarea, required)
6. **Business Experience** (dropdown, required)
   - Yes - Food Service Industry
   - Yes - Other Industry
   - No - First Time Business Owner
7. **Facebook Messenger** (text, required)

## 🚀 To Run Locally

```bash
npm run dev
```

Open http://localhost:3000

## 🌐 To Deploy

```bash
# 1. Commit your code
git add .
git commit -m "Franchise form ready"
git push

# 2. Deploy to Vercel
# Go to vercel.com and import your GitHub repo
```

## 📧 To Add Email Later

1. Install Resend: `npm install resend`
2. Get API key from resend.com
3. Add `RESEND_API_KEY` to Vercel environment variables
4. Update `/app/api/submit/route.ts` (see DEPLOYMENT.md for code)

## 🎨 Brand Colors Used

```css
--color-cfc-red: #FF0016
--color-cfc-yellow: #FEEE07
--color-cfc-light-blue: #E5F5F9
--color-cfc-dark: #0E1318
--color-cfc-brown: #48251F
```

## 📁 Key Files

- `/app/page.tsx` - Main form
- `/app/thank-you/page.tsx` - Thank you page
- `/app/api/submit/route.ts` - Form handler
- `/app/globals.css` - Styles and colors
- `/app/layout.tsx` - Layout and metadata

## 📞 Contact Info

Phone: (+63) 909 939 4352
Email: idderfsalem98@gmail.com
Website: https://calamiasfriedchicken.com

## ✨ What's NOT Included (You Can Add Later)

- [ ] Email notifications (easy to add with Resend)
- [ ] Database storage (can add Prisma + PostgreSQL)
- [ ] reCAPTCHA (can add if you get spam)
- [ ] Admin dashboard (to view submissions)
- [ ] File uploads (for documents)

---

**Everything is ready to deploy! Just push to GitHub and connect to Vercel.** 🚀
