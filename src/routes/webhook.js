"use strict";

const legacyMac = require("../services/legacyMac");

// DEMO — expected verdict: Protected, adequate=false.
//
// The comparison itself is bare (`!==`), same shape as every Unprotected
// demo in this repo — but the value it compares against is produced by
// calling into legacyMac.js, one relative require() away. qtrace follows
// that hop, finds the CryptoJS.MD5 call inside computeMac's own body, and
// reports it as protected but inadequate rather than either a false
// "safe" or a false "nothing here".
function verifyWebhook(req, res, next) {
  const params = req.body;
  const expected = legacyMac.computeMac(
    [params.merchantRef, params.txnRef, params.amount],
    params.merchantSharedSecret,
  );
  if (expected !== params.mac) {
    return res.status(401).json({ error: "bad_mac" });
  }
  return next();
}

module.exports = { verifyWebhook };
