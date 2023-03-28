# Chassy (WEB APP)
by REHATCHER

# Tech Stack
* Next.js
* React.js

# LINE Login
Go set it here
https://developers.line.biz/console/channel/1657291491/line-login

But we need a named URL with https.
So ngrok

```
ngrok http localhost:3000
```
Sample callback
https://37cb-2405-9800-bc01-930-852a-1e75-83e3-f635.ngrok.io/api/auth/callback/line
must follow by /api/auth/callback/line as it is handled by nextAuth itself.
and wait for at least 10 seconds for LINE to update.
# TODO
- Find Line API to call curl to set Web App Callback URL instead of going to the console
  it seems NONE though (https://developers.line.biz/en/reference/line-login/#userinfo)