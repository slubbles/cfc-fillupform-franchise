# Deployment Guide - Calamias Fried Chicken Franchise Form

## 🚀 Quick Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial franchise form setup"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `slubbles/cfc-fillupform-franchise`
4. Click "Deploy" (no configuration needed!)

Your form will be live at: `https://your-project-name.vercel.app`

---

## 📧 Adding Email Notifications (Later)

### Using Resend

1. **Install Resend**:
   ```bash
   npm install resend
   ```

2. **Get API Key**:
   - Sign up at [resend.com](https://resend.com)
   - Get your API key from the dashboard

3. **Add Environment Variable in Vercel**:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add: `RESEND_API_KEY` = `your_key_here`

4. **Update API Route** (`app/api/submit/route.ts`):

```typescript
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Send email notification
    await resend.emails.send({
      from: 'CFC Franchise <noreply@yourdomain.com>',
      to: 'idderfsalem98@gmail.com',
      subject: '🍗 New Franchise Inquiry - ' + data.fullName,
      html: `
        <h2>New Franchise Inquiry Received!</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Contact Number:</strong> ${data.contactNumber}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>City/Location:</strong> ${data.cityLocation}</p>
        <p><strong>Preferred Address:</strong> ${data.preferredAddress}</p>
        <p><strong>Business Experience:</strong> ${data.businessExperience}</p>
        <p><strong>Messenger Account:</strong> ${data.messengerAccount}</p>
      `
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { success: false, message: 'Error submitting form' },
      { status: 500 }
    );
  }
}
```

5. **Redeploy** on Vercel (automatic when you push)

---

## 🔗 Custom Domain

### Connect Your Domain in Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `franchise.calamiasfriedchicken.com`)
4. Follow Vercel's DNS instructions

---

## 📊 Viewing Form Submissions

### Current Setup (Console Logs)

- **Development**: Check terminal where `npm run dev` is running
- **Production**: 
  1. Go to Vercel Dashboard
  2. Select your project
  3. Click "Logs" tab
  4. Filter by "Function" → `/api/submit`

### Future Options

- **Google Sheets**: Use Zapier or Make.com to log submissions
- **Database**: Add Prisma + PostgreSQL for storing submissions
- **Email**: Get notified via email (see above)
- **CRM**: Connect to HubSpot, Salesforce, etc.

---

## 🎯 Next Steps After Deployment

1. **Test the form** on your live URL
2. **Update "Franchise Now" button** on your main site to point to the new form URL
3. **Monitor submissions** in Vercel logs
4. **Set up email notifications** when ready

---

## ⚡ Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel (if using Vercel CLI)
vercel --prod
```

---

## 🐛 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify Vercel function logs

**Styles not loading?**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Email not sending?**
- Verify RESEND_API_KEY in Vercel environment variables
- Check Resend dashboard for failed sends

---

Need help? Contact: idderfsalem98@gmail.com
