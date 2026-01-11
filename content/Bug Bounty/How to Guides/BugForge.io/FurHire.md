


Now we have the breakpoint lets try to manipulate the object at run time, using the below we will force the response to return okay


## Finding Hidden Api Routes
The next step I took was look for any hidden paths on the application that the developer might have left it hidden to avoid un-authorized access.
I have used [KiteRunner](https://github.com/assetnote/kiterunner) to help brute force the api routes.
> Important to notice that I have used an authenticated scan, with the option **-H** we can pass the headers with our bearer token

| Flags                      | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| -H                         | Pass the bearer token with this flag                               |
| --fail-status-codes        | Filter out errors 404 if needed separate multiple with 404,401,400 |
| --wildcard-detection-false | Turns off wildcard, this option is essential                       |
| -x                         | Max connections to host                                            |
### kiterunner
```
kr scan https://lab-1768167808425-sn49bb.labs-app.bugforge.io  -w medium-admin-api-routes.kite -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJib3NzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjgxNjc4MjB9.mFIqgQDW9Eb2OlBHdBhZydUGPuPwiFllsZa2WhnWI6A" -x 20  --wildcard-detection=false --fail-status-codes 404

```
![[Pasted image 20260111220417.png]]

After discoverying the /admin endpoint I went to the page on the browser to check it out, unfortunately the page was locked.
![[Pasted image 20260111221901.png]]
I went straight to the Web Dev Tools to verify if there was something I could do there so I modify the user role to "admin" and tried reloading the page again
![[Pasted image 20260111222030.png]]
That did not work, so I tried updating the role on the JWT itself.
On the page there was a warning saying "This page is restricted to administrators" so I set my role to "administrators", but that didn't work
![[Pasted image 20260111222921.png]]
I then decided to look into the source code of the page and notice the role it was looking for its called "admin", then I remember that I didnt have the secret for the token I would have to try some JWT bypass.
![[Pasted image 20260111222217.png]]
I have tried the common attacks:
- "alg": "None"
- "alg": "none"
- "alg": "NoNe"
- Removing the "alg" completely
- Removing the signatuer from the JWT
Unfortunatelly nothing worked

# Modifying the Request  at RunTime

Upon inspecting the app in more detail I notice if the response.ok == true we could reveal the **data.flag** . I then tried to set up some break points within the application and try to modify the **response.ok = true** before the app could finish loading attempting to read the flag during runTime

## Setting breakpoint on app ![[Pasted image 20260111223324.png]]
On the Console tab of the WebDev tools I attempted to modify the response.ok, but it 
proven to be more difficult, so I had to get a specifc command to get it working.
![[Pasted image 20260111223829.png]]
```javascript
Object.defineProperty(response, 'ok', {
  get: () => true,
  configurable: true
});
```
Unfortunately again, I have noticed a bit too late but the **request already returned 403** so there was no data to be displayed. This is a typical case of "Security by Front-End" but its not the case of our lab here. Back to the drawing board. #discord 
![[Pasted image 20260111224126.png]]

# Trying a different angle
I knew I was on the right path but I was still missing one thing to get the request to the Back-End, I need that JWT secret. At this point I had to use the hint and it reveal to be a **Blind SQL Inject** so I knew where to go from here.

```bash
/jobs/3
```