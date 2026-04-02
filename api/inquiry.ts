export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, businessName, mobile, services, details, callTime } = req.body;

    // Basic validation
    if (!name || !mobile || !services || (Array.isArray(services) && services.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, mobile, and at least one service.",
      });
    }

    // Prepare payload
    const payload = {
      name,
      businessName: businessName || "",
      mobile,
      services: Array.isArray(services) ? services : [services],
      details: details || "",
      callTime: callTime || null,
    };

    // Log to console (Vercel logs will show this)
    console.log("\n=== New Inquiry ===");
    console.log(payload);
    console.log("==================\n");

    // Send immediate success response to the client
    res.status(200).json({ success: true, message: "Inquiry received." });

    // Fire-and-forget the webhook call (no await)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(err => console.error("Webhook failed:", err));
    } else {
      console.warn("No webhook URL set – data not sent to Google Sheets");
    }

  } catch (err) {
    console.error("Error processing inquiry:", err);
    // If an error occurs before sending the response, send it now
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  }
}