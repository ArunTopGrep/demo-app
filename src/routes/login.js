"use strict";

// DEMO — expected verdict: Unprotected.
//
// A bare comparison with no cryptographic call anywhere on the path. This
// is the worst case qtrace's auth-point engine exists to catch: a
// signature-matching scanner has nothing to flag here at all, because
// there is no crypto call to find — `===` is not a function call, and
// nothing between the request body and the comparison ever hashes
// anything.
function login(req, res) {
  const user = req.user;
  const inputPassword = req.body.password;
  if (user.password === inputPassword) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
}

module.exports = { login };
