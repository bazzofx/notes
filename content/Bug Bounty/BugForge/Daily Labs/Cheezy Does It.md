
## Info



## Crawling Website for APIs
One of the first thing I like is running a simple crawl on the website to try to discover endpoints. 
To perform a full scan we will need to use our session token, this can be retrieve by checking the Network Settings, or from an extension like `Cookie-Editor` for FireFox/Chrome
![[Pasted image 20260926094835.png]]

Then we proceed to run our first tool.
Katana will craw the website and look for hidden endpoints.
![[Pasted image 20260926094513.png]]

```bash
 token='Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJib3NzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjgxNzYxMDJ9.qBbRYw9p0aJs-6PB-2sPBBj-rvo4Wlt5920hZJjN0vY'
 target='https://lab-1768176060864-1bb6hh.labs-app.bugforge.io/'
 
 katana -u $target -H $token -jsl |tee katana_out.txt
```

Here we discover there is an endpoint for `admin` , `admim/orders` , `admin/tickets`, `admin/coupons`


## Manual Testing

After having a look at  the application I make a list of things I would like to test  on it. On this application I have found the below

- `/api/orders`
	- Order something with $0.01 total
		- *Intercept traffic on burp and modify did not work*
	- Apply fake Discount code
		- Brute force Discount code
	- Apply fake loyalty points
	- Increase number of orders without changing price
- `/admin`
	- Try gain access to Admin page
	- SQL Inject admin database
- `/review`
	- XSS on msg field
- `/review/photo`
	- LFI
		- *File accesible with full path*
		- /uploads/reviews/f4ca81547a7aaea7c6b8f1b31684713f.jp
- `/api/tickets`
	- Support page where we can submit tickets for help
	- Fields to trySQLI,XSS,LFI