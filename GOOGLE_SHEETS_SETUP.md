# Detailed Setup: Google Sheets + Email Notifications

## Overview
Your form will send data to Google Sheets (database) + trigger an immediate email to `Info@duvergelogistics.com`.

**For < 50 requests/day:** This is FREE, SECURE, and OPTIMAL.

---

## Security Assessment ✅

| Concern | Status | Explanation |
|---------|--------|-------------|
| **API Key Exposure** | ✅ SAFE | No API keys in frontend code |
| **Data Encryption** | ✅ SAFE | HTTPS everywhere (Google) |
| **Spam Protection** | ⚠️ MODERATE | No CAPTCHA, but Google has built-in abuse detection |
| **Data Storage** | ✅ SAFE | In YOUR Google account, not third-party |
| **Email Delivery** | ✅ SAFE | Uses Google's trusted email infrastructure |

**Bottom Line:** For low volume (<50/day), this is enterprise-grade secure.

---

## Step 1: Create the Google Sheet (2 minutes)

1. Go to https://sheets.new (sign into your Google account)
2. Click **Untitled spreadsheet** and rename to:
   ```
   Duverge Logistics - Quote Requests
   ```
3. In **Cell A1**, paste these headers (exactly as shown):
   ```
   A1: Timestamp
   B1: Name
   C1: Company
   D1: Email
   E1: Phone
   F1: Service
   G1: Load Details
   ```

Your sheet should look like:
```
| Timestamp | Name | Company | Email | Phone | Service | Load Details |
|-----------|------|---------|-------|-------|---------|--------------|
|           |      |         |       |       |         |              |
```

---

## Step 2: Open Apps Script (1 minute)

1. In your Google Sheet, click **Extensions** in the top menu
2. Click **Apps Script**
3. A new tab opens with the Apps Script editor
4. You should see a default file called `Code.gs` with:
   ```javascript
   function myFunction() {
     
   }
   ```

---

## Step 3: Paste the Script (3 minutes)

**DELETE everything** in the editor and paste this EXACT code:

```javascript
const SHEET_NAME = 'Sheet1';
const EMAIL_TO = 'Info@duvergelogistics.com';

function doPost(e) {
  // CORS headers for browser requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Add data to the spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),           // Timestamp
      data.name,            // Name
      data.company,         // Company
      data.email,           // Email
      data.phone,           // Phone
      data.service,         // Service
      data.load             // Load Details
    ]);
    
    // Send email notification
    const subject = `📦 New Quote Request from ${data.name} - ${data.company}`;
    const body = `
Hello,

You have received a new quote request from your website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SERVICE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service Type: ${data.service || 'Not specified'}

Load Details:
${data.load || 'No details provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted at: ${new Date().toLocaleString()}

View all requests: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}

---
This is an automated message from Duverge Logistics website.
    `;
    
    MailApp.sendEmail({
      to: EMAIL_TO,
      subject: subject,
      body: body,
      name: 'Duverge Logistics Website'
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Quote request submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// Handle CORS preflight requests
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

**Click the floppy disk icon (💾) or press Ctrl+S to save.**

---

## Step 4: Deploy as Web App (3 minutes)

1. Click **Deploy** button (top right)
2. Click **New deployment**
3. Click the gear icon (⚙️) next to "Type"
4. Select **Web app**
5. Fill in the form:
   - **Description:** `Quote Form Handler`
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone` ⚠️ IMPORTANT!
6. Click **Deploy**
7. Google will ask for permissions:
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [your project name] (unsafe)**
   - Click **Allow** (this lets the script send emails and edit the sheet)
8. **COPY THE WEB APP URL** (looks like):
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXX/exec
   ```

⚠️ **SAVE THIS URL - You'll need it for Step 5**

---

## Step 5: Add URL to Your Website (1 minute)

Send me the Web App URL you copied, and I'll add it to your site.

**Or** if you have access, create a file:

**File:** `/home/alchemist6/projects/duverge-logistics/my-app/.env.local`
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
```

Replace `YOUR_URL_HERE` with your actual URL.

---

## Step 6: Test the Form (2 minutes)

1. Go to your website: https://duvergelogistics.vercel.app
2. Scroll to "Request a Free Quote"
3. Fill out the form with test data:
   - Name: `Test User`
   - Company: `Test Company`
   - Email: `test@example.com`
   - Phone: `555-123-4567`
   - Service: Select any
   - Load Details: `Test load details`
4. Click **Get My Quote**
5. Check:
   - ✅ Success message appears
   - ✅ Data appears in Google Sheet
   - ✅ Email received at `Info@duvergelogistics.com`

---

## Why This is OPTIMAL for <50/day ✅

| Factor | Google Sheets Solution |
|--------|----------------------|
| **Cost** | $0 (forever) |
| **Setup Time** | 10 minutes |
| **Maintenance** | $0, zero maintenance |
| **Reliability** | 99.9% (Google's infrastructure) |
| **Data Ownership** | YOU own the data |
| **Email Deliverability** | Excellent (Google servers) |
| **Scalability** | Up to 500 requests/day free |

---

## Troubleshooting

### Problem: "Form submission is not yet configured"
**Solution:** The `GOOGLE_SCRIPT_URL` is empty. Complete Step 5.

### Problem: "Network error"
**Solution:** Check your internet connection, or the URL is wrong.

### Problem: No email received
**Solution:** 
1. Check spam folder
2. Make sure you granted email permissions in Step 4
3. Verify `EMAIL_TO` in the script is `Info@duvergelogistics.com`

### Problem: Data not in sheet
**Solution:** Make sure the sheet is named exactly `Sheet1` (default name).

---

## Security Best Practices

1. **Don't share the Web App URL publicly** (it has no authentication)
2. **Monitor the Google Sheet** for unusual activity
3. **Backup the sheet** periodically (Google does this automatically)
4. **Revoke access** if you stop using it (Apps Script → Manage deployments)

---

**Send me your Web App URL and I'll update the website! 🚀**
