import { CONFIG } from "../config/env.js";
import { axiosClient } from "../utils/axiosClient.js";

export const generateAuthCode = async (req, res) => {
  try {
    const response = await axiosClient.post(
      `${CONFIG.host}/oauth2/verify`,
      {
        clientId: CONFIG.clientId,
        username: CONFIG.username,
        password: CONFIG.password,
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateToken = async (req, res) => {
  try {
    const response = await axiosClient.post(
      `${CONFIG.host}/oauth2/token`,
      {
        clientId: CONFIG.clientId,
        clientSecret: CONFIG.clientSecret,
        authorizationCode: req.body.authorizationCode,
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
