## Attacking Web Cache Delimiter

## **1. Pick and verify the target endpoint**
1. Log to your account
2. Find the `/my-account` request and send it to Repeater.
3. Add `/abc` → expect **404** (path is not normalized).
4. Add `abc` (no slash) → expect **404**.  
    Keep this response as your **reference**.
## **2. Identify which characters the origin server treats as delimiters**

5. Send the request to Intruder
6. Add payload position: `/my-account§§abc`.
7. Add a list of characters to test (like `;`, `?`, etc.).
8. Disable URL encoding.
9. Run the attack and sort by status code.
10. Characters with **200** = **delimiters** (`;` and `?`).
## **3. Check whether the cache treats the same characters as delimiters**

11. Test: `/my-account?abc.js` → send.  
    No caching → cache treats `?` as a delimiter.
12. Test: `/my-account;abc.js` → send twice.  
    `miss` → `hit` → cache **does not** treat `;` as a delimiter.  
    Cache also caches `.js` files → payload confirmed.
13. We then upload our malicious webpage, and send to victim to click on
14. After victim clicks, we can visit the malicious link we created to view the cached response

### Payload
```html
<html>
<body>
<script>
document.location="https://website/myaccount/unique.js"
</script>
<body>
</html>
```


# Understanding Delimiter Discrepacies
## Delimiter discrepancies

Delimiters specify boundaries between different elements in URLs. The use of characters and strings as delimiters is generally standardized. For example, **?** is generally used to separate the URL path from the query string. However, as the URI RFC is quite permissive, variations still occur between different frameworks or technologies.

Discrepancies in how the cache and origin server use characters and strings as delimiters can result in web cache deception vulnerabilities. Consider the example **/profile;foo.css**:

- The Java Spring framework uses the **;** character to add parameters known as matrix variables. An origin server that uses Java Spring would therefore interpret **;** as a delimiter. It truncates the path after **/profile** and returns profile information.
- Most other frameworks don't use **;** as a delimiter. Therefore, a cache that doesn't use Java Spring is likely to interpret **;** and everything after it as part of the path. If the cache has a rule to store responses for requests ending in **.css**, it might cache and serve the profile information as if it were a CSS file.

The same is true for other characters that are used inconsistently between frameworks or technologies. Consider these requests to an origin server running the Ruby on Rails framework, which uses . as a delimiter to specify the response format:

/profile - This request is processed by the default HTML formatter, which returns the user profile information.

/profile.css - This request is recognized as a CSS extension. There isn't a CSS formatter, so the request isn't accepted and an error is returned.

/profile.ico - This request uses the .ico extension, which isn't recognized by Ruby on Rails. 
The default **HTML formatter handles the request and returns the user profile information. In this situation, if the cache is configured to store responses for requests ending in .ico, it would cache and serve the profile information as if it were a static file.**

## Encoded Characters Delimeter in Cache
Encoded characters may also sometimes be used as delimiters. For example, consider the request **/profile%00foo.js**

- The OpenLiteSpeed server uses the encoded null **%00** character as a delimiter. An origin server that uses OpenLiteSpeed would therefore interpret the path as `/profile`.
- Most other frameworks respond with an error if **%00** is in the URL. However, if the cache uses Akamai or Fastly, it would interpret **%00** and everything after it as the path.

# Understanding Web Cache Delimiter
## **Step 1 — Check if the endpoint is even testable**

You start by adding random text:

`/settings/users/listaaa`

If **this** gives the _same_ response as the original `/settings/users/list`
→ the server is **redirecting or normalizing the path**  
→ meaning it’s _not good for testing delimiters_  
→ so you must choose a different endpoint.

This is a **pre-check** to make sure the endpoint behaves normally when the path truly changes.
The page needs to be different after we add random characters, if it does not its not good for testing.

---

## **Step 2 — Check whether a character is treated as a delimiter**

Now you introduce a delimiter candidate:
`/settings/users/list;aaa`
If **this** matches the _original_ response (my-account), it means:
- the server **did** recognize `;` as a delimiter
- it ignored everything after it
- the path processed becomes `/settings/users/list`
This is **expected behavior** for a delimiter test

- **If the response is the same as the original (unmodified /settings/users/list) path:**  
    The `;` character **is** acting as a delimiter.  
    The server ignores everything after it and treats the request as `/settings/users/list`.
- **If the response is the same as the version with the extra text (`/settings/users/listaaa`):**  
    The `;` character **is not** acting as a delimiter.  
    The server treats the full path as `/settings/users/list;aaa`.

You can then construct an exploit that triggers the static extension cache rule. For example, consider the payload `/settings/users/list;aaa.js`. The origin server uses `;` as a delimiter:

- The cache interprets the path as: **/settings/users/list;aaa.js**
- The origin server interprets the path as: **/settings/users/list**
The origin server returns the dynamic profile information, which is stored in the cache.

Because delimiters are generally used consistently within each server, you can often use this attack on many different endpoints.