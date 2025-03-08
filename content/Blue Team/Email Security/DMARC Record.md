## What Is A DMARC Record?

A DMARC record is ==a DNS TXT record that tells receiving mail servers how to handle messages that fail authentication==. DMARC stands for Domain-based Message Authentication, Reporting, and Conformance. A DMARC record is included within an organization or domain owner’s DNS database and is a specific version of DNS text records (TXT records). The full DMARC record looks similar to this: “v=DMARC1\; p=none\; rua=mailto:dmarc-aggregate@mydomain.com\; ruf=mailto:dmarc-afrf@mydomain.com\; pct=100”. These various sections within the DMARC record signify:

1. v=DMARC1: The DMARC version specified.
2. p=none: The domain owner’s DMARC policy or preferred treatment of any email messages.
3. rua=mailto:dmarc-aggregate@mydomain.com: The email address to which aggregate reports need to be sent. 
4. ruf=mailto:dmarc-afrf@mydomain.com: The email address to which forensic reports need to be sent.
5. pct=100: The percentage of email that needs to be subjected to a DMARC policy’s specifications. In this case, 100% of email messages that fail a DMARC test will be rejected by the server.

![[Pasted image 20250204105142.png]]

#### What does a DMARC record do?

- **Protects users**: Prevents forged email messages, such as phishing attacks 

- **Manages messages**: Tells receiving mail servers what to do with messages that don't pass authentication 

- **Generates reports**: Sends reports to the domain owner about which messages are authenticating and why

#### How does a DMARC record work?

- The domain owner adds a DMARC record to their domain's DNS database 

- Receiving mail servers use the DMARC record to determine how to handle messages that fail authentication 

- The receiving mail server may quarantine, reject, or allow the message to continue delivery 

#### DMARC compared to SPF and DKIM

==Sender Policy Framework, or SPF==, is an email validation protocol used to verify the legitimacy of a sender's domain by defining which IP addresses are allowed to send email from a specific domain. DMARC is an authentication protocol that builds on the SPF standard and enables domain owners to specify how email should be handled when it fails authentication.

==DomainKeys Identified Mail (DKIM)== is another authentication protocol that allows a sender to digitally sign an email with the organization's domain name, ensuring the message's authenticity. As with [](http://)[SPF](https://www.mimecast.com/products/dmarc-analyzer/spf-record-check/), DMARC builds on the [DKIM](https://www.mimecast.com/products/dmarc-analyzer/dkim-check/) standard by enabling senders to say how messages that fail authentication should be treated.

[DMARC](https://www.mimecast.com/content/what-is-dmarc/) is a protocol for authenticating that an email sent from an organization's domain is a legitimate message and not fraudulent.

#### What are the different DMARC policies? 

- **Monitoring**
    
    Allows the domain owner to monitor email authentication status without sending failed emails to spam or rejecting them
    

- **Quarantine**
    
    Allows the domain owner to monitor email authentication status and sends failed emails to spam
    

- **Reject**
    
    Allows the domain owner to monitor email authentication status and rejects failed emails

#### DMARC records and DMARC domain alignment

A DMARC record appears in the sending organization's DNS database. Published as text (TXT) resource records (RR), DMARC records specify what the recipient of an email should do with mail that fails authentication.

DMARC domain alignment is part of the [DMARC compliance](https://www.mimecast.com/content/dmarc-compliance/) and validation process. For SPF, domain alignment requires that a message's From domain and its Return-Path domain must be the same. For DKIM, domain alignment means that the From domain and a message's DKIM signature must be a match.
#### How to create?

![[Pasted image 20250204105205.png]]

#### References:

6. https://www.mimecast.com/content/what-is-dmarc/