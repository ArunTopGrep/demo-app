"use strict";

const CryptoJS = require("crypto-js");

// DEMO — this file is never compared against directly; webhook.js
// requires it. It exists to exercise qtrace's cross-file following: this
// is not a library call, so qtrace only resolves webhook.js's comparison
// by reading this file's own body.
//
// MD5 over a secret-suffixed string is not a real HMAC construction — it
// is weak twice over (MD5 itself, and the naive concatenation is
// length-extension-vulnerable regardless of the hash). That is
// deliberate: this file exists to produce a "Protected, but not
// adequate" verdict, not a clean one.
function computeMac(fields, sharedSecret) {
  const canonical = fields.join("|") + sharedSecret;
  return CryptoJS.MD5(canonical).toString();
}

module.exports = { computeMac };
