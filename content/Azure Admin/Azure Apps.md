[Azure github action](https://www.youtube.com/watch?v=FeSMRFkaRIU&t=1127s)
[Authentication Azure function](https://www.youtube.com/watch?v=GWLACWQIzGs)
## Purpose:
Allow only authenticated service principal to call the function

### Azure
App function best practices
## Best practices
- Key should be passed over Headers instead over URL to avoid code being logged.
- Secrets and keys must be saved as env:variable on script
- Token Authentication type "function" must be used (no admin, nor anonymous)
- Host token should be avoided when calling functions
- Unique token should be used per function

### Github Actions
Secrets on GitHub should be kept within **Repository > Settings > Secret**s
Using publish profile as deployment credential use  .PublishSetting
Allow GitHub Action to parse your .ignore file to true, if using .gitignore

---------------------------------------------------
When adding authentication, the function will only work if client login first
Create authentication (Microsoft, GitHub, etc..)
Create AppRole > Application level "Function User"
[App Registration ]- Create Service Principal
---API permissions>My API > Application Permission>"Function User"

Next we need to add Client Secret to be able to call the function
- Certificates & secrets

Create new secret, set up as env:var on client 
Login in use
```
az login --service-principal -u $applicationID -p $clientSecret --tenant $tenant 
```
**obs:** use --allow-no-subscription if you don't have subscription

#### Calling function
```
az rest -method get -u $hello_url --resource $functionUserApiResourceId
```

-----
OWASP TOP 10 API SECURITY NOTES

> a lot activity interested on API security
> API security strategy, possible 
> How many APIs we have on our environment?
> Applications security (WAF) is not always applicable to APIs
















