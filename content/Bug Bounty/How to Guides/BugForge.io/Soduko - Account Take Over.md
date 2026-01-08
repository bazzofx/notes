![[Pasted image 20260108201546.png]]
The challenge today is a speed typing application.  After we register we will take a look around app while Burp is capturing traffic in the background. 
>We want to map out the application and identify points of interest

## Check cookies and storage
The next thing we want to do is how authentication is been handled by the application and see if there are any cookies that are create within a predictable manner so we can try forging our own.
Looking at the Browse Web Dev Tools 
![[Pasted image 20260108214343.png]]


Going back to revise the pages we notice there is a "token" that is been created when registering a new account. Also the same token is revealed when we visit the /stats/leaderboard.
The Token looks somewhat predictable, and upon investigating we can see this the last_login property contains part of the token we are using.
![[Pasted image 20260108214558.png]]

```
last_login: "2026-01-08T21:41:37.733Z"
token:"20260108214137"
```
We can also see an `admin` account on the leader board, so let's try copy the `last_login` field and turn into a new token for us
# Taking over account
We simply copy the 'last_login' that is been used by the application to create an authentication token and update our stored token on the browser and hit Refresh~
![[Pasted image 20260108215452.png]]

# Pwned 
We are now logged as Admin on the website
![[Pasted image 20260108215605.png]]