import express from "express";
import axios from "axios";
import crypto from "crypto";

const router = express.Router();

const clientId = "3197041d1b8f9c841e6827125d413bcb";
const clientSecret = "e105bcb60112f9102cad36e5856464b4";

// ❤️ Signature Function
const createSignature = (text) => {
  return crypto.createHmac("sha512", clientSecret).update(text).digest("hex");
};

/* ------------------------------------------------
   1️⃣ Generate Authorization Code
------------------------------------------------- */
router.post("/authorization-code", async (req, res) => {
  try {
    const body = {
      clientId,
      username: "smartpayflexapisandbox@woohoo.in",
      password: "smartpayflexapisandbox@123"
    };

    // Signature Rule:
    // clientId + username + password
    const signature = createSignature(
      clientId + body.username + body.password
    );

    const response = await axios.post(
      "https://sandbox.woohoo.in/oauth2/verify",
      body,
      {
        headers: {
          signature,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error);
    res.status(500).json({ error: "Failed to generate authorization code" });
  }
});

/* ------------------------------------------------
   2️⃣ Exchange Authorization Code → Access Token
------------------------------------------------- */
router.post("/token", async (req, res) => {
  try {
    const { authCode } = req.body;

    const body = {
      clientId,
      clientSecret,
      grantType: "authorization_code",
      authorizationCode: authCode
    };

    // Signature Rule:
    // clientId + clientSecret + authorizationCode
    const signature = createSignature(
      clientId + clientSecret + authCode
    );

    const response = await axios.post(
      "https://sandbox.woohoo.in/oauth2/token",
      body,
      {
        headers: {
          signature,
          "Content-Type": "application/json",
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error);
    res.status(500).json({ error: "Failed to generate token" });
  }
}); 

export default router;
