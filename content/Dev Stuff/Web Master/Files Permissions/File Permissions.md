To view the file permissions, use the `ls` command:
`ls -l file_name`

```sh
-rw-r--r-- 12 linuxize users 12.0K Apr  28 10:10 file_name
|[-][-][-]-   [------] [---]
| |  |  | |      |       |
| |  |  | |      |       +-----------> 7. Group
| |  |  | |      +-------------------> 6. Owner
| |  |  | +--------------------------> 5. Alternate Access Method
| |  |  +----------------------------> 4. Others Permissions
| |  +-------------------------------> 3. Group Permissions
| +----------------------------------> 2. Owner Permissions
+------------------------------------> 1. File Type
```

In the example above (`rw-r--r--`) means that the file owner has read and write permissions (`rw-`), the group and others have only read permissions (`r--`).

File permissions have a different meaning depending on the file type.

Each of the three permission triplets can be constructed of the following characters and have different effects, depending on whether they are set to a file or to a directory:

## Numeric Method
he syntax of the `chmod` command when using the symbolic mode has the following format:

```sh
chmod [OPTIONS] NUMBER FILE...
```

Copy

When using the numeric mode, you can set the permissions for all three user classes (owner, group, and all others) at the same time.

The permission number can be a 3 or 4-digits number. When 3 digits number is used, the first digit represents the permissions of the file’s owner, the second one the file’s group, and the last one all other users.

Each write, read, and execute permissions have the following number value:

- `r` (read) = 4
- `w` (write) = 2
- `x` (execute) = 1
- no permissions = 0

The permissions number of a specific user class is represented by the sum of the values of the permissions for that group.

To find out the file’s permissions in numeric mode, simply calculate the totals for all users’ classes. For example, to give read, write and execute permission to the file’s owner, read and execute permissions to the file’s group and only read permissions to all other users, you would do the following:

- Owner: rwx=4+2+1=7
- Group: r-x=4+0+1=5
- Others: r-x=4+0+0=4

Using the method above, we come up to the number `754`, which represents the desired permissions.

To set up the `setuid`, `setgid`, and `sticky bit` flags, use four digits number.

When the 4 digits number is used, the first digit has the following meaning:
- setuid=4
- setgid=2
- sticky=1
- no changes = 0

The next three digits have the same meaning as when using 3 digits number.

If the first digit is 0 it can be omitted, and the mode can be represented with 3 digits. The numeric mode `0755` is the same as `755`.

To calculate the numeric mode, you can also use another method (binary method), but it is a little more complicated. Knowing how to calculate the numeric mode using 4, 2, and 1 is sufficient for most users.

You can check the file’s permissions in the numeric notation using the [`stat`](https://linuxize.com/post/stat-command-in-linux/) command:

## Check file's permissions numeric

```sh
stat -c "%a" file_name
```

Here are some examples of how to use the `chmod` command in numeric mode:

- Give the file’s owner read and write permissions and only read permissions to group members and all other users:
    
 ```sh
    chmod 644 dirname
 ```
    
- Give the file’s owner read, write and execute permissions, read and execute permissions to group members and no permissions to all other users:
    
    ```sh
    chmod 750 dirname
    ```
    
- Give read, write, and execute permissions, and a sticky bit to a given directory:
    
    ```sh
    chmod 1777 dirname
    ```
    
- Recursively set read, write, and execute permissions to the file owner and no permissions for all other users on a given directory:
    
    ```sh
    chmod -R 700 dirname
    ```