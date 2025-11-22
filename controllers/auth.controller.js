import axios from "axios";
import crypto from "crypto";
import { CONFIG } from "../config/env.js";
import { axiosClient } from "../utils/axiosClient.js";

const createSignature = (text, secret) => {
  return crypto.createHmac("sha512", secret).update(text).digest("hex");
};

export const generateAuthCode = async (req, res) => {
  try {
    const body = {
      clientId: CONFIG.clientId,
      username: CONFIG.username,
      password: CONFIG.password,
    };

    const signature = createSignature(
      CONFIG.clientId + CONFIG.username + CONFIG.password,
      CONFIG.clientSecret
    );

    const response = await axiosClient.post(
      `${CONFIG.host}/oauth2/verify`,
      body,
      {
        headers: { signature }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateToken = async (req, res) => {
  try {
    const body = {
      clientId: CONFIG.clientId,
      clientSecret: CONFIG.clientSecret,
      grantType: "authorization_code",
      authorizationCode: req.body.authorizationCode,
    };

    const signature = createSignature(
      CONFIG.clientId +
        CONFIG.clientSecret +
        req.body.authorizationCode,
      CONFIG.clientSecret
    );

    const response = await axiosClient.post(
      `${CONFIG.host}/oauth2/token`,
      body,
      { headers: { signature } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
