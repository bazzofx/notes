# ARC - Authenticated Receive  Chain
![[Pasted image 20250323143251.png]]

It guarantees chain of custody, but does not mean the email was not spoofed.
It was made for email forward scenarios, like example if you send a newsletter out, sometimes the newsletter service change the body of the message with subscribe links, and that would make **DKIM** impossible to be used.
ARC was created to help verify the email came from the source even thought DKIM has failed.
More information [watch this clip from DefCom](https://youtu.be/NwnT15q_PS8?si=kztEJ6-IsqArcZSa&t=1380)