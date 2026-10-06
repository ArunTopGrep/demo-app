# auth-demo

A deliberately small app with no purpose except to exercise every terminal
of qtrace's auth-point backward-taint engine in one scan. Not a real
service — nothing here is wired to an actual server or database.

Each file in `src/routes/` is one bare comparison, chosen to land on a
specific, predictable verdict:

| File | Sink kind | Expected verdict |
|---|---|---|
| `routes/login.js` | password | **Unprotected** — no crypto call anywhere on the path |
| `routes/apiKey.js` | secret | **Unprotected** |
| `routes/session.js` | token | **Unprotected** |
| `routes/otp.js` | otp/pin | **Unprotected** |
| `routes/webhook.js` + `services/legacyMac.js` | mac | **Protected, adequate=false** — resolves through a cross-file `require()` hop into `legacyMac.js`, which hashes with plain MD5 |
| `routes/secureLogin.js` | password | **Protected, adequate=true** — direct `bcrypt.hashSync` call, no hop needed |
| `routes/helperLogin.js` | password | **Protected, adequate=true** — resolves through a same-file helper function (`hashInput`), not a known library call |
| `routes/delegatedAuth.js` | token | **Inconclusive** — the compared value is a function parameter; its real value comes from whoever calls `checkToken`, which this walk does not follow |

Scan it with a `qtrace` build that includes the auth-point engine:

```bash
qtrace scan /path/to/auth-demo
```

Then check the "Auth points" tab (or the `finding_category=auth_point`
filter on `ListFindings`) for all eight rows above.
