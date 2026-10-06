"use strict";

// DEMO — expected verdict: Inconclusive.
//
// The compared value is a function parameter — its real value comes
// from whatever called checkToken, which this walk does not follow.
// This is the "qtrace looked and could not tell" bucket, deliberately
// kept distinct from a confident Unprotected: the honest answer when the
// evidence runs out, not a claim that nothing protects this value.
function checkToken(user, presentedToken) {
  if (user.authToken === presentedToken) {
    return true;
  }
  return false;
}

module.exports = { checkToken };
