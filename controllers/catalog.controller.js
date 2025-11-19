import { CONFIG } from "../config/env.js";
import { axiosClient } from "../utils/axiosClient.js";
import { generateSignature } from "../utils/signature.js";

export const categories = async (req, res) => {
  try {
    const url = `${CONFIG.host}/rest/v3/catalog/categories`;
    const signature = generateSignature("GET", url, null, CONFIG.clientSecret);

    const response = await axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${req.headers.token.trim()}`,
        dateAtClient: new Date().toISOString(),
        signature
      }
    });

    res.json(response.data);
  } catch (e) {
    console.error("dvds", e)
    res.status(500).json({ error: e.message });
  }
};

export const productList = async (req, res) => {
  try {
    let url;
    console.log("Producti list calling.....")
    // Agar categoryId diya hai, toh category-wise fetch
    if (req.params.categoryId) {
      url = `${CONFIG.host}/rest/v3/catalog/categories/${req.params.categoryId}/products`;
    } else {
      // All products fetch karne ke liye
      url = `${CONFIG.host}/rest/v3/catalog/products`;
    }
    console.log("Generating URl ....")

    const signature = generateSignature("GET", url, null, CONFIG.clientSecret);

    const response = await axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
        dateAtClient: new Date().toISOString(),
        signature
      }
    });
    console.log("Response ", response)
    res.json(response.data);
  } catch (e) {
    console.log("Error: ", e.message)
    res.status(500).json({ error: e.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    console.log("token ", req.headers)
    const url = `${CONFIG.host}/rest/v3/catalog/products/${req.params.sku}`;
    const signature = generateSignature("GET", url, null, CONFIG.clientSecret);

    const response = await axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
        dateAtClient: new Date().toISOString(),
        signature
      }
    });

    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
