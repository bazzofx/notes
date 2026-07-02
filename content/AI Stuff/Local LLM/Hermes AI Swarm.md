## Reference
[ZSecurity Hermes Setup](https://www.youtube.com/watch?v=zwV5p1L0COI)


## Setting Up
Its best to use [OpenRoute](https://openrouter.ai/logs) it will give you many API to choose from under one billable account. 
`hermes setup`
## Uninstalling Hermes
`hermes uninstall`
## Deploying
Use the command below to deploy with a GUI 
`hermes dashboard --tui --host 127.0.0.1 --port 10000 --insecure`

## Troubleshooting Deployment

In case there is issues with ports, its likely trying to use a prohibed port. On Windows this can be checked with 
`netsh interface ipv4 show excludedportrange protocol=tcp`


## To look into
- How to stop a request on Hermes
- Limit amount of tokens it uses per task