This article we will look into the vulnerability subdomain takeovers
What makes a web app vulnerable to it, how to avoid this from happening.


The best way to understand Subdomain take over is to understand what is happening in the DNS layer, so let's take a look at our example using the command dig.
# Understanding output of `dig`

```bash
dig CNAME stage.publichealth.api.acme.com
```

When we run `dig CNAME domain` we are generally asking, "Does this domain have a CNAME record?"
CNAME Record is an alias record for another domain, useful when multiple names should refer to the same host or service. However, this sometimes can also make an application vulnerable if the CNAME is living outside your control.

Let's take a closer look to understand why this domain is not vulnerable to domain takeover.
## Digging for CNAME
```bash
dig CNAME stage.publichealth.api.acme.com

[..shortened..]
;; QUERY: 1, ANSWER: 0
;; AUTHORITY SECTION:
acme.com. 60 IN SOA ns-cloud-b1.googledomains.com. cloud-dns-hostmaster.google.com.
[..shortened..]
```
From the output, we can see **ANSWER: 0** , so there is not CNAME record.
When we asked if the above domain had a valid CNAME record the answer  was **no**. However, it does not mean it does not point anywhere, it only means it doesn't use a CNAME record to do so.
There still could be a A, AAAA, ALIAS for the record, which is  the case on our example.
## The dig output shows
- There’s **no CNAME record** currently set for  `stage.publichealth.api.acme.com`.
- The fact that there’s **no CNAME** tells you that the  is **not an alias** for any other domain.
- The query falls back to the **authoritative zone** for `acme.com`, managed on **Google Cloud DNS**.
So the subdomain `stage.publichealth.api.acme.com` doesn’t point anywhere — but it’s **still defined** in the DNS zone.
# Why it’s **not vulnerable** to takeover?
- The domain does not have a CNAME record
- Also, if the CNAME record was created inside the SOA zone of the primary domain, under the owner’s control (instead of pointing to a third-party provider like Vercel, GitHub, Netlify, etc.), it is less likely to be vulnerable
- - There’s **no delegation** to any external service.
- The record simply **doesn’t exist**, but the parent zone (`acme.com`) still owns it.
- Therefore, **attackers cannot register or claim this subdomain** anywhere, because it’s not pointing outside acme’s controlled DNS zone.
# What would make it vulnerable?
![[Pasted image 20251012114751.png]]
- if the external resource **no longer exists**
- An attacker can **reclaim** or **recreate** that resource (e.g., register the same GitHub repo name or S3 bucket).
- The traffic then would be re-directed to the attackers website
### Example of a _vulnerable_ configuration:
```bash
app.example.com.  CNAME  myapp.azurewebsites.net
```
If the Azure site `myapp.azurewebsites.net` is deleted, anyone could create a new Azure site with that same name — and instantly serve content under `app.example.com`
# ⚠️ What would make it **vulnerable**
`stage.publichealth.api.acme.com` _would become vulnerable_ if acme added a record like:
```bash
stage.publichealth.api.acme.com.  CNAME  stage-app.herokuapp.com.
```

In that case:
- The CNAME still exists.
- Heroku would return `no such app`.
- An attacker could register a Heroku app named `stage-app` and take control of the subdomain.

# How a CNAME _can_ protect (or not) a subdomain
A **CNAME itself doesn’t “protect”** a domain — it depends on _where it points_ and _who controls_ the target.

However:

- If the CNAME points to a **domain owned and controlled by acme** (e.g., another `acme.com` subdomain or a GCP-managed service), that’s _safe_ — because no one else can claim that target.
    
- If the CNAME points to a **third-party platform** (e.g., GitHub Pages, AWS, Netlify), it becomes _potentially vulnerable_ if that resource is later removed.

So the rule is:

|CNAME Target Type|Ownership|Risk|
|---|---|---|
|Internal (same org’s DNS zone)|Controlled|🔒 Safe|
|External (third-party SaaS)|Not controlled|⚠️ Potentially vulnerable|
|External + deleted resource|Not controlled|🔥 Vulnerable|

# Learning is practicing
The best way to learn is to write it, and if possible why not write your own program to help solidify your understanding of a subject, and this is what I did.

There are a few good tools already to check for Domain take over I am familiar with.
- **subzy**
- `subsy run --targets domains.txt --timeout 30`
- **subjack**
- `subjack -w domains.txt --timeout 30 -t 100 -v`
- **nuclei**
- `nuclei -tl | grep takeover`
However, I find the best way to learn is to try writing something myself, so I can see the code in action. As well as an old friend told me,
"That best way to learn is
repetition
repetition
repetition"

Here is a tool I created called **subtake** 
[subtake](https://github.com/bazzofx/subtake) is available on github and will perform the checks we have talked about on this article.
## How it works
The main program is just based on dig and regex, simple yet powerful tools.
If the result from the `dig CNAME domain` is available, and there is a CNAME for the domain within our vulnerable list, and the IP does not exist, this will tag the domain as "Vulnerable".
If the CNAME is within our vulnerable list and the IP **exist** the domain is tagged as "At Risk"
if the CNAME does not exist or is not within our vulnerable list the domain is marked as "Safe"
Any other results its marked as "Unknown"

![[Pasted image 20251012102659.png]]