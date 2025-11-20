import { CONFIG } from "../config/env.js";
import { axiosClient } from "../utils/axiosClient.js";
import { generateSignature } from "../utils/signature.js";

export const createOrder = async (req, res) => {
  try {
    const url = `${CONFIG.host}/rest/v3/order`;
    const signature = generateSignature("POST", url, req.body, CONFIG.clientSecret);

    const response = await axiosClient.post(url, req.body, {
      headers: {
        token: req.headers.token,  
        dateAtClient: new Date().toISOString(),
        signature
      }
    });

    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const orderStatus = async (req, res) => {
  try {
    const url = `${CONFIG.host}/rest/v3/order/${req.params.ref}/status`;
    const signature = generateSignature("GET", url, null, CONFIG.clientSecret);

    const response = await axiosClient.get(url, {
      headers: {
        token: req.headers.token,  
        dateAtClient: new Date().toISOString(),
        signature
      }
    });

    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
