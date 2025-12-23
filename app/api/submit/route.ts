import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { google } from 'googleapis';

const resend = new Resend('re_bTux3CH3_EfqUZW4d58QCNXepVZ4vdaAS');

// Google Sheets setup
const SHEET_ID = '1C6vIT1fwuzMz7NfXa0kac8HoU_OjQ9cfXJBpqA9gOIU';

async function appendToSheet(data: any) {
  try {
    // Get credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const timestamp = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
    
    // Map business experience to readable text
    const experienceMap: Record<string, string> = {
      'yes-foodservice': 'Yes - Food Service Industry',
      'yes-other': 'Yes - Other Industry',
      'no': 'No - First Time Business Owner'
    };
    const experienceText = experienceMap[data.businessExperience] || data.businessExperience;

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          timestamp,
          data.fullName,
          data.contactNumber,
          data.email,
          data.preferredAddress || 'Not specified',
          experienceText,
          data.messengerAccount || 'Not provided'
        ]]
      }
    });
    
    console.log('✓ Data saved to Google Sheets');
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the submission (for debugging)
    console.log('=== NEW FRANCHISE INQUIRY ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Full Name:', data.fullName);
    console.log('============================');
    
    // Save to Google Sheets FIRST
    await appendToSheet(data);
    
    // Format business experience for email
    const experienceMap: Record<string, string> = {
      'yes-foodservice': 'Yes - Food Service Industry',
      'yes-other': 'Yes - Other Industry',
      'no': 'No - First Time Business Owner'
    };
    const experienceText = experienceMap[data.businessExperience] || data.businessExperience;
    
    // Send email notification to admin
    await resend.emails.send({
      from: 'CFC Franchise <onboarding@resend.dev>',
      to: 'idderfsalem98@gmail.com',
      subject: `🔥 New Franchise Lead: ${data.fullName} - ${new Date().toLocaleTimeString('en-PH')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF0016; border-bottom: 3px solid #FF0016; padding-bottom: 10px;">
            NEW FRANCHISE INQUIRY
          </h2>
          
          <div style="background: #E5F5F9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>👤 Full Name:</strong><br/>${data.fullName}</p>
            <p style="margin: 10px 0;"><strong>📱 Contact Number:</strong><br/>${data.contactNumber}</p>
            <p style="margin: 10px 0;"><strong>📧 Email:</strong><br/>${data.email}</p>
            <p style="margin: 10px 0;"><strong>📍 Preferred Location:</strong><br/>${data.preferredAddress || 'Not specified'}</p>
            <p style="margin: 10px 0;"><strong>💼 Business Experience:</strong><br/>${experienceText}</p>
            <p style="margin: 10px 0;"><strong>💬 Messenger:</strong><br/>${data.messengerAccount || 'Not provided'}</p>
          </div>
          
          <p style="color: #666; font-size: 12px;">
            Submitted: ${new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #FF0016; font-weight: bold;">⚡ Action Required:</p>
            <p>Call or message this lead within 24 hours for best conversion rate!</p>
            <a href="tel:${data.contactNumber}" style="display: inline-block; background: #FF0016; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
              📞 Call ${data.fullName}
            </a>
          </div>
        </div>
      `,
    });
    
    console.log('✓ Email sent successfully to admin');
    
    // Optional: Send confirmation email to customer
    if (data.email) {
      try {
        await resend.emails.send({
          from: 'Calamias Fried Chicken <onboarding@resend.dev>',
          to: data.email,
          subject: 'Thank You for Your CFC Franchise Inquiry!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #FF0016; color: white; padding: 30px; text-align: center;">
                <h1 style="margin: 0;">CALAMIAS FRIED CHICKEN</h1>
                <p style="margin: 10px 0 0 0;">Franchise Opportunity</p>
              </div>
              
              <div style="padding: 30px; background: #FEEE07;">
                <h2 style="color: #FF0016;">Thank You, ${data.fullName}!</h2>
                <p style="font-size: 16px;">We received your franchise inquiry and we're excited to discuss this opportunity with you.</p>
                
                <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="color: #FF0016; margin-top: 0;">What Happens Next?</h3>
                  <p>📧 <strong>Confirmation:</strong> You're reading it now!</p>
                  <p>📱 <strong>Within 24-48 hours:</strong> Our team will call you at ${data.contactNumber}</p>
                  <p>🤝 <strong>Consultation:</strong> We'll discuss the opportunity in detail</p>
                </div>
                
                <p>Have questions in the meantime?</p>
                <p style="font-size: 18px; font-weight: bold; color: #FF0016;">
                  📞 (+63) 909 939 4352
                </p>
                
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  - Calamias Fried Chicken Team
                </p>
              </div>
            </div>
          `,
        });
        console.log('✓ Confirmation email sent to customer');
      } catch (emailError) {
        console.log('⚠ Customer email failed (non-critical):', emailError);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    console.error('❌ Error processing form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
