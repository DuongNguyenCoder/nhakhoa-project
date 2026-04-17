const express = require("express");
const { exec } = require("child_process");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// SỬ DỤNG SECRET BẠN VỪA TẠO Ở TRÊN
const WEBHOOK_SECRET = "eb7524710ec89851c1b888c152c8a3d270a90c120a403e71d097ef7295ae2f16";

function verifySignature(req, res, next) {
  const signature = req.headers["x-hub-signature-256"];
  const payload = JSON.stringify(req.body);
  
  if (!signature) {
    console.log("❌ Missing webhook signature");
    return res.status(401).send("Missing signature");
  }

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = "sha256=" + hmac.update(payload).digest("hex");
  
  if (signature !== digest) {
    console.log("❌ Invalid webhook signature");
    return res.status(401).send("Invalid signature");
  }
  
  console.log("✅ Webhook signature verified");
  next();
}

app.post("/webhook", verifySignature, (req, res) => {
  const event = req.headers["x-github-event"];
  console.log(`📦 Received event: ${event}`);
  
  if (event === "push") {
    console.log("🚀 Git push received, deploying...");
    exec("bash /var/www/minhdental/deploy.sh", (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Deploy error:", stderr);
      } else {
        console.log("✅ Deploy output:", stdout);
      }
    });
  }
  res.status(200).send("OK");
});

app.listen(9000, () => console.log("✅ Webhook listening on port 9000"));
