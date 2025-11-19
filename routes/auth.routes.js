import express from "express";
import axios from "axios";

const router = express.Router();

// Generate authorization code
router.post("/authorization-code", async (req, res) => {
  try {
    const payload = {
      clientId: "3197041d1b8f9c841e6827125d413bcb",
      username: "smartpayflexapisandbox@woohoo.in",
      password: "smartpayflexapisandbox@123"
    };

    const response = await axios.post(
      "https://sandbox.woohoo.in/oauth2/verify",
      payload,
      {
        headers: {
          signature:
            "e98dd569a2976628a278da29cdabc5a545caa5bd34b94f9c596b97fe6404c794b58fb43f78d6fd0ba77e91637786942a053d47eb56984b51f618ac3fe360568f",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error generating auth code:", error.message);
    res.status(500).json({ error: "Failed to generate authorization code" });
  }
});

// Generate token using authorization code
router.post("/token", async (req, res) => {
  try {
    const { authCode } = req.body;

    const payload = {
      clientId: "3197041d1b8f9c841e6827125d413bcb",
      clientSecret: "e105bcb60112f9102cad36e5856464b4", // agar client secret required ho
      authCode,
    };

    const response = await axios.post(
      "https://sandbox.woohoo.in/oauth2/token",
      payload,
      {
        headers: {
          signature:
            "e98dd569a2976628a278da29cdabc5a545caa5bd34b94f9c596b97fe6404c794b58fb43f78d6fd0ba77e91637786942a053d47eb56984b51f618ac3fe360568f",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

export default router;
