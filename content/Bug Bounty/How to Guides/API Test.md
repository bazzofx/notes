
| Flaws                                          | Attacks                                                                                                                            |     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --- |
| Exploiting an API endpoint using documentation | Use Burp Scanner to crawl and audit OpenAPI documentation, or any other documentation in JSON or YAML format                       |     |
| Finding unused API endpoints                   | Find hidden endpoints with FUZZING ([FFUF](https://github.com/ffuf/ffuf) or [kiterunner](https://github.com/assetnote/kiterunner)) |     |
|                                                |                                                                                                                                    |     |

- To begin first identify API endpoints
- The input data the API processes, including both compulsory and optional parameters.
- The types of requests the API accepts, including supported HTTP methods and media formats.
- Rate limits and authentication mechanisms.
- Is there a documentation for the API?
- Test for versions on api - `/api/swagger/v1/users` - `/api/swagger/v2/users`
- Test using different Content-Type maybe secure on JSON but fails on XML



### Burp Extension to help find API Endpoints
- JS Link Finder BApp
### Burp Extension convert XML to JSON
- Content type converter BApp

### Burp Extension Analyze complex role scenarios
- Authnalizer BApp
- Useful for apps that have many roles (5 or more)
Say you have an admin user, and 2 users with less privilege. you want to test to see if those 2 users can access/execute data/functionality reserved for the admin.

in auth analyzer you set up the 2 users with their own session cookies/auth tokens/etc.

you turn the extension on.

you then browse the application as the admin. auth analyzer collects every request that is called based on what the you as the admin user browses.

auth analyzer simultaneously replays those requests using the 2 less privileged users sessions. it will only replay the requests that are sent based on what you as the admin user browses to.

in auth analyzer you can ensure only inscope requests are used, you can exclude uri's, for example if an app uses long polling and sends  a polling request every minute or so, you can exclude that request so it doesnt spam your requests table, etc. among other functionality available within that extension.

give it a try. this week's challenge lab is a good example because when you register, you're essentially admin. you can then create team members with varying permissions.