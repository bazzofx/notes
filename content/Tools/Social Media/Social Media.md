
## Enola

enola is a tool that searches for social media accounts by username, It is similar to **sherlock** but has an interactive TUI and can be used as a single binary.

It scans numerous websites to reveal where a username is registered and outputs these results in the terminal. The TUI displays matched social media profiles and URL details and can also handle multiple search patterns quickly.

enola is ideal for researchers and hobbyists for checking usernames of various online services. It can also be used to find if a username may or may not be available to register or to investigate scattered social profiles directly in the terminal.
```
go install github.com/theyahya/enola/cmd/enola@latest
```

![[enola.gif]]

## Sherlock
sherlock is a command-line tool that hunts down social media accounts by username across 400+ social media platforms. It allows searching for one or multiple usernames which the tool saves results into individual text files.

Core features include Tor support, output options (CSV, XLSX) loading data from a JSON file, limiting analysis to selected social media sites and proxy usage.

This tool would be suitable for security researchers, digital marketers, developers or anyone needing to track username availability quickly across many sites without manually checking by hand.

```
pipx install sherlock-project
```

```
sudo apt install sherlock
```


![[sherlock.png]]