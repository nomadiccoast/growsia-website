// FIX: Import the proper types from Vercel to resolve the req/res errors
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, businessName, mobile, services, details, callTime } = req.body;

    if (!name || !mobile || !services || (Array.isArray(services) && services.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const payload = {
      name,
      businessName: businessName || "",
      mobile,
      services: Array.isArray(services) ? services : [services],
      details: details || "",
      callTime: callTime || null,
    };

    console.log("Processing Inquiry:", payload);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (webhookUrl) {
      // Use 'await' here so Vercel doesn't kill the function 
      // before the data is sent to Google Sheets.
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        
        const result = await webhookResponse.text();
        console.log("Webhook success:", result);
      } catch (webhookErr) {
        console.error("Webhook failed:", webhookErr);
      }
    }

    // Send response ONLY AFTER the webhook attempt is finished
    return res.status(200).json({ success: true, message: "Inquiry received." });

  } catch (err) {
    console.error("Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }
}