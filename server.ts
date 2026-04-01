import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Debug: log the webhook URL to confirm it's loaded
  console.log("GOOGLE_SHEETS_WEBHOOK_URL from env:", process.env.GOOGLE_SHEETS_WEBHOOK_URL);

  // API endpoint for inquiries
  app.post("/api/inquiry", async (req, res) => {
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

      // Log to console
      console.log("\n=== New Inquiry ===");
      console.log(payload);
      console.log("==================\n");

      // Send to Google Sheets webhook if URL is set
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          console.log("Webhook response status:", response.status);
          const responseText = await response.text();
          console.log("Webhook response body:", responseText);
        } catch (fetchError) {
          console.error("Error calling webhook:", fetchError);
        }
      } else {
        console.warn("No webhook URL set – data not sent to Google Sheets");
      }

      // Always return success to the client
      return res.status(200).json({ success: true, message: "Inquiry received successfully." });
    } catch (err) {
      console.error("Error processing inquiry:", err);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();