### Coure : [API Penetration Testing](https://university.apisec.ai/products/api-penetration-testing)
# API Recon
## Passive Recon
- Google dorking 
	- inurl:api {company name}
	- intitle:api {company name}
- Github dorking
	- filename:swagger.json {company name}  (*this is a postman config files*)
	- "Authorization: Bearer" {company name}
	- extension:json {company name}
	- api key exposed (*check the issues sectio*n)
- Shodan dorking
	- "wp-json" (*WordPress API*)
	- "content-type: application/json" (*most API will server JSON or XML*)
- WayBackMachine
	- Search for differences between API documentation pages
## Active Recon

- Nmap
	- nmap -sC -sV  {target}
- AMASS
	- amass enum -list
	- amass enum -active -d {target}
- GoBuster (*directory brute force*)
- gobustert dir -u  {target:port} -w {wordlist.txt}
	- --wildcard -b 200 (*filter out 200 responses*)
- KiteRunner (*api brute force*)
	- guide [kiterunner here](https://tcm-sec.com/kiterunner/)
	- kr scan --help
	- kr wordlist list
	- kr scan $target -A apiroutes-251227 
	- --ignore-lenght 24