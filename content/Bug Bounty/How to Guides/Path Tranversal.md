
| Attack Tactic                                      | Description                                                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Reading arbitrary files via path tranversal        | Add **../../** to the path of files                                                                              |
| Create a direct reference to a file                | **img src="/loadImage?filename=/etc/passwd"**                                                                    |
| Bypassing common filters                           | Add **....//** or **....\/** and revise the response                                                             |
| Defense by encoding text only                      | Bypass by **encoding** or **double encoding** the **../../** Burp offers a list to fuzz for path tranversal list |
| Apps sometimes required base folder to be included | Include the base folder on request ie:(*filename=/var/www/images/../../../etc/passwd*)                           |
| Apps may require filename to end                   | Include filename on request ie:(*filename=../../../etc/passwd%00.png*)                                           |


## Preventing Path Traversal Attack
> Avoid passing user-supplied input to filesystem APIs altogether. 

If you can't avoid passing user-supplied input to filesystem APIs, we recommend using two layers of defense to prevent attacks:

- Validate the user input before processing it. Ideally, compare the user input with a whitelist of permitted values. If that isn't possible, verify that the input contains only permitted content, such as alphanumeric characters only.
- After validating the supplied input, append the input to the base directory and use a platform filesystem API to canonicalize the path. Verify that the canonicalized path starts with the expected base directory.
