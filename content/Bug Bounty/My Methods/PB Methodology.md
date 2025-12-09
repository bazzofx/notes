


## Check if urls are alive

1) httpprobe
```
cat domains | httprobe -c 50 | anew 2nd_domains.txt
```

2) httpx
```
cat subs_domain.com.txt | httpx -td -title -sc -ip -fc 403,404 |tee httpx_domain.com.txt
```

## Check if vuln to TakeOver
We can then check the live websites if they are vulnerable to #TakeoverDomain


## Download Body/Headers

### Combine all Headers together
Let's explore if we can find anything that stands out, but first lets combine all headers into one file
```
find . -type f -name header.txt -exec cat {} \; > all_headers.txt

cat all_headers.txt| sort -u| tee unique_headers.txt
```


# Findings
Found one of the headlines on the discovered urls to be the below

- VRC Admin Console
- retinal.verily.com & prod.retinal.api.verily.com



