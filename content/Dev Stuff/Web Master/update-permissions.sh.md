
This script will update the permissions of the website after transferring from a Windows device using scp.

This will help fix 403 errors forbidden that happen on a website when trying to access it. If the files on the website are not accessible to at least read only to the website visitors the server will display 403 for the user.


```
#!/bin/bash

# Check if directory argument is provided, otherwise use current directory
DIRECTORY="${1:-.}"

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "Directory '$DIRECTORY' does not exist."
  exit 1
fi

# Change permissions for all directories to 755
find "$DIRECTORY" -type d -exec chmod 755 {} \;

# Change permissions for all files to 644
find "$DIRECTORY" -type f -exec chmod 644 {} \;

echo "Permissions have been updated."
```