# First Configuration

1. In `/etc/hosts`, `phd-assess-local-dev.epfl.ch` must point to 127.0.0.1:
   ```
   127.0.0.1	phd-assess-local-dev.epfl.ch
   ```
2. Create `.env` file:
   ```bash
   cp /keybase/team/epfl_idevfsd/meteor-account-entra-app/ENTRA-AUTH-INFO.local-dev .env
   ```
3. As a 👉👈 temporary hack, copy the `.env` values into lines 6–8 of `server/entraAuth.js`
4. Run
   ```bash
   meteor npm i
   ```
5. Arrange for your requests to https://phd-assess-local-dev.epfl.ch (on port 443) to land at http://phd-assess-local-dev.epfl.ch:3000 (unencrypted) instead. This can be done using the [redirector plug-in](https://addons.mozilla.org/en-US/firefox/addon/redirector/) (in which case, you can import `devsupport/redirector-config.json`); or a custom nginx rig (left as an exercise to the reader).

# Running

1. Either run this from the terminal, or have your IDE do something similar:
   ```
   export ROOT_URL=https://phd-assess-local-dev.epfl.ch
   meteor
   ```
2. Browse http://phd-assess-local-dev.epfl.ch:3000

💡 There is no use setting `ROOT_URL` in the `.env` for precedence reasons; it has to be set in the environment.
