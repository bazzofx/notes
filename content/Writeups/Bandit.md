[OverTheWire](https://overthewire.org/wargames/bandit/bandit0.html)
```d
 bandit1@bandit.labs.overthewire.org -p 2220
```
bandit1 : ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If
bandi2 : 263JGJPfgU6LtdEvgfWU1XP5yac29mFx
bnandi3 : MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx
bandit4: 2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ

bandit5: 4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQ
```bash
find . -type f -size 1033c ! -executable -exec cat {} \;
```

bandit6:HWasnPhtq9AVKe0dmk45nxy20cvUa6EG
```bash
find / -type f -user bandit7 2>/dev/null -group bandit6 -size 33c -exec cat {} \;
```

bandit7:morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj
```bash
cat data.txt |sort | uniq | grep -Hrni millionth -A1
#or
sed -n '37811,37813p' data.txt
```

bandit8:dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc
```bash
sort data.txt |uniq -u
```

bandit9: 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM
```bash
strings data.txt | grep ===
```
bandit10 :  FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey