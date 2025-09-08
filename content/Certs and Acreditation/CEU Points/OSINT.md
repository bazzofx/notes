Cybrerary
https://app.cybrary.it/immersive/20886427/activity/72122

CVE-2019-10881
Iceland
{T:STNG}
RektSystems doug@rekt.systems
## Summary
This course provides a hands-on introduction to Open Source Intelligence (OSINT) techniques through a practical lab investigation of the company rekt.systems. Participants will learn how to uncover valuable information from public sources using a variety of reconnaissance tools and methods. The course covers subdomain enumeration, metadata extraction, WHOIS lookups, historical web content analysis, and hidden URL discovery. By the end, learners will be able to apply these OSINT skills to identify potential security exposures, understand how adversaries gather intelligence, and strengthen their own defensive strategies.

Hands on lab exploring how to obtain OSINT information from a company called rekt.systems.
- We utilize various techniques to identify subdomains, exploring the main website doing manual search as well as with tools like gf, anew, getJS
- Investigate metadata on files, learned that metadate is scraped from websites like snapchat, instagram, google but sometimes self hosted images on company web servers the metadata is not scraped. Using tools like exiftool we can obtain valuable information like GPS location, author, application and version used to create the file and link those to CVEs
- Investigating WHOIS information and gather information on how owns the domain and which registrar they are using. We are using whoxy.com to collect this information
- Using tools like GAU (Get All Urls) we can retrieve information from waybackurl, alienvault and others, often revealing old links that contain sensitive information that we can use on our discovery
- Using archive.org I can find information that once existed on the website and is not longer visible, this can revel folders that were omited, one tactic is to search for website/robots.txt
