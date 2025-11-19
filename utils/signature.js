import CryptoJS from "crypto-js";

export const generateSignature = (method, url, body, key) => {
  let base = method + "&" + encodeURIComponent(url);

  if (body) {
    const sorted = JSON.stringify(body);
    base += "&" + encodeURIComponent(sorted);
  }

  return CryptoJS.HmacSHA512(base, key).toString();
};
