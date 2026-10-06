"use strict";

// DEMO — expected verdict: Unprotected.
//
// Same shape as login.js, different credential: a client secret / API
// key compared with a plain `===` instead of a constant-time check. The
// cost of getting this wrong is a timing oracle on the secret itself.
function requireApiKey(req, res, next) {
  const presented = req.headers["x-api-key"];
  const clientSecret = req.merchant.clientSecret;
  if (clientSecret === presented) {
    return next();
  }
  return res.status(401).json({ error: "unauthorized" });
}

module.exports = { requireApiKey };
