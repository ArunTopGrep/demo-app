"use strict";

const bcrypt = require("bcrypt");

// DEMO — expected verdict: Protected, adequate=true, via a same-file hop.
//
// hashInput is not a known library call — it is declared right here, a
// few lines down — so before qtrace could follow into a function's own
// body this would have stopped at Inconclusive ("does not follow into
// another function's body"). Now the walk follows hashInput's return
// statement and finds the bcrypt call inside it.
function helperLogin(req, res) {
  if (req.user.password === hashInput(req.body.password)) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
}

function hashInput(value) {
  return bcrypt.hashSync(value, 12);
}

module.exports = { helperLogin };
