"use strict";

// DEMO — expected verdict: Unprotected.
//
// A homegrown session token check compared with `===` rather than looked
// up through a verified session store. Distinct credential from
// login.js/apiKey.js, same bare-comparison shape.
function requireSession(req, res, next) {
  const presented = req.cookies.sessionId;
  if (req.user.sessionId === presented) {
    return next();
  }
  return res.status(401).json({ error: "unauthorized" });
}

module.exports = { requireSession };
