import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";

dotenv.config();

// Log the webhook URL on startup
console.log("Webhook URL from env:", process.env.GOOGLE_SHEETS_WEBHOOK_URL);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.post("/api/inquiry", async (req, res) => {
    try {
      const { name, businessName, mobile, services, details, callTime } = req.body;

      // Validation
      if (!name || !mobile || !services || (Array.isArray(services) && services.length === 0)) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: name, mobile, and at least one service.",
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

      console.log("\n=== New Inquiry ===");
      console.log(payload);
      console.log("==================\n");

      // Send immediate response to the client
      res.status(200).json({ success: true, message: "Inquiry received." });

      // Fire-and-forget webhook call
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(async (response) => {
            const text = await response.text();
            console.log("Webhook response status:", response.status);
            console.log("Webhook response body:", text);
          })
          .catch(err => console.error("Webhook fetch failed:", err));
      } else {
        console.warn("No webhook URL set – data not sent to Google Sheets");
      }

    } catch (err) {
      console.error("Error processing inquiry:", err);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Server error." });
      }
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