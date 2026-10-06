"use strict";

// DEMO — expected verdict: Unprotected.
//
// A one-time passcode compared directly, with no rate limiting and no
// constant-time check. Broken out as its own sink kind (not "secret" or
// "password") because the remediation differs — throttling/lockout, not
// hashing.
function verifyOtp(req, res) {
  const enteredOtp = req.body.otp;
  if (req.user.otp === enteredOtp) {
    return res.status(200).json({ verified: true });
  }
  return res.status(401).json({ verified: false });
}

module.exports = { verifyOtp };
