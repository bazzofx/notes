Todays challenge is #BrokenAccessControl 
# Recon 
First step is to set up a few scanners in the backgroud to try some low hanging fruits and help map the application

### Kiterunner
Found a few endpoints but unfortunatelly they were either `404:NotFound` or `502:ServerError`
![[Pasted image 20260116232348.png]]

### SqlFinder
This is a tool I am currently developing as I continue my study on SQL Injection.
It crawls the website and chechks for SQL Injection using Boolean SQL, Difference and Login bypass.
![[Pasted image 20260116232501.png]]

### Katana
Hidden endpoint found during scan, looks like I found my target
`/admin/users` and `/admin/flag`
![[Pasted image 20260116235352.png]]

Since I was on the terminal I tried sending an authenticated curl to the flag, and just like that we got it.
![[Pasted image 20260116235829.png]]

It was also possible to retrieve it from the UI this time. Going into the admin portal from the UI and just like that we got the flag
![[Pasted image 20260116235515.png]]

# Issues
- Unauthorized Access Control