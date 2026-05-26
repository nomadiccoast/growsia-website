
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    // Send response IMMEDIATELY to user
    const response = res.status(200).json({ success: true, message: "Inquiry received." });

    // Send webhook to Google Sheets in the background (don't wait)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      setImmediate(() => {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(webhookResponse => {
            const text = webhookResponse.text();
            console.log("Webhook success:", text);
            return text;
          })
          .catch(webhookErr => console.error("Webhook failed:", webhookErr));
      });
    }

    return response;

  } catch (err) {
    console.error("Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }
}