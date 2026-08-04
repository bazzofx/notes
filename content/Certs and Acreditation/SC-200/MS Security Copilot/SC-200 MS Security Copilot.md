
## What is Security Copilot
An AI tool that analyse and monitor your data feed from Azure and that you can query about security questions.
Its a helpful AI chat agent that is already getting feed from your data and can help you understand and dive deeper within the security incident using AI
![[Pasted image 20260513211844.png]]
## Deploying Security Copilot

### 1 - Create an Admin to manage the service itself
On Azure, open Entra ID > Properties
![[Pasted image 20260513213314.png]]
This will allow the user to maange Entra ID
Now, add permissons so the user have permission to also manage Security Copilot

Go to Subscription > IAM (Access Control) > Add Role Assignment >
Privilege Role > Level: Owner of resource  > Select the user > Allow user to assign all roles except priv admins`
![[Pasted image 20260513213543.png]]

### 2 - Deploy the Security Copilot Agent
We need to select the region where the Security Copilot Agent will be deployed, this is to help with data regulatory bodies.
The price of the model is per computational unit
![[Pasted image 20260513213052.png]]

## Features
- We can have a list of prompts to use to query our own data
- We can parameterize our prompt as well
- Previous conversations are saved
- We can deploy Security Copilot on its own, as a stand alone SaaS
- The plan is pay per data usage


