Todays lab on [BugForge](https://bugforge.io) is CopyPasta
I first tried login with the usual sql admin bypass "*You never know...*"
![[Pasted image 20260114204051.png]]
As that failed, I created an account and started clicking around to capture the requests on Burp
## Automating SQL Injection checks
Currently, I am working on a tool that will crawl a website for its endpoints and  then check for **SQL Injection**
So I fired up **sqlfinder** to crawl the pages and test for common sql injections entries
Unfortunately nothing came up..
>[!Note]
>You can find the beta version of **sqlfinder** on the link below.
`ris:Github`Github Link: [sqlfinder](https://github.com/bazzofx/sqlfinder)

![[Pasted image 20260114203853.png]]

## Page Discovery
I have tried enumerating the application, but unfortunatelly the status code has been overwritten by the Dev, and all pages return **Status:200 OK** even pages that do not exist.![[Pasted image 20260114204740.png]]

## Investigating Requests
It's time to dive into the requests captures on Burp, I have highlighed interesting requests and marked red the ones I was not interested.
The requests returning **JSON** might give us an option to manipulate the app.
![[Pasted image 20260114205406.png]]

I noticed this other request when I made one of my private snipped public.
It was sending a **PUT Request** and it had a ID at the end of it. 
Immediately I thought what happens if I change the ID of the request, but nothing happened here.
![[Pasted image 20260114210419.png]]

I went back to search the requests again, and notice there was an **id** and **userId** been passed to the application.So I thought of monitoring the login page, but nothing useful was there.

I then found another endpoint which look receptive to SQL Injection but unfortunatelly nothing there either.
![[Pasted image 20260114211340.png]]
At this point I was out of ideas so I had to take the hint which revealed **Broken Access Control.** So I believe we should be able to manipulate a snippet from another user, let's try make their private snippet public again.
Except this time lets create two accounts, and try to navigate to the private snippet from the second account.
From the app itself, we get an error **Snippet not found** , also on Burp the Edit request was similar to what we have tested earlier.
![[Pasted image 20260114211925.png]]
## The A-HA moment
That is when I noticed there was another function on the app that I have not tried yet, that was **DELETING a snippet**
So I proceeded to delete one of my snippets to check the request, and noticed this also could be manipulated, so I tried deleting someone else snippet and I was able to retrieve the flag
![[Pasted image 20260114212528.png]]
## Take aways
- Make note of all the functionalities of the application before testing them
- Create a logical flow to test the application so nothing is missed