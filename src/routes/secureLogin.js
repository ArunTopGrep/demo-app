"use strict";

const bcrypt = require("bcrypt");

// DEMO — expected verdict: Protected, adequate=true.
//
// bcrypt is tagged purpose=auth in qtrace's knowledge base, so a direct
// comparison against its output resolves cleanly — the ordinary,
// intraprocedural walk is enough here, no cross-file hop needed.
function secureLogin(req, res) {
  const hashed = bcrypt.hashSync(req.body.password, 12);
  if (req.user.password === hashed) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
}

module.exports = { secureLogin };
