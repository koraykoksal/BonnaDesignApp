

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
To send an e-mail via Google Email via Nodemailer, you need to get an ID information from your Google account.

##### Mongodb Address:`MONGODB`
##### Token acces_key:`ACCESS_KEY`
##### Token refresh_key:`REFRESH_KEY`
##### Token secret_key:`SECRET_KEY`
##### Token loop count:`LOOP_COUNT`
##### Token char count:`CHAR_COUNT`
##### Token encryption sha type:`ENC_TYPE`
##### Google account nodemailer id:`NODEMAILER_PASS`
##### Email account address:`MAIL_FROM`


## App Map

```bash
 ▼ v1
▼ src
 ▼ config
  ▷ dbConnections.js
 ▼ controllers
  ▷ auth.js
  ▷ token.js
  ▷ user.js
 ▼ helper
   ▷ passwordEnctypt.js
   ▷ registerControl.js
 ▼ middlewares
  ▷ authentication.js
  ▷ errorHandler.js
  ▷ findSearchSortPage.js
  ▷ permission.js
 ▼ models
  ▷ token.js
  ▷ user.js
 ▼ routes
  ▷ auth.jsx
  ▷ token.jsx
  ▷ user.jsx
.env
index.js
package-lock.json
package.json
```
