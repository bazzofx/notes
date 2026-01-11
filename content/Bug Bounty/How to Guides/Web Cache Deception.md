![[Pasted image 20251228201208.png]]
# Testing Web Cache Deception
| Attack Tactic                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Identify Dynamic Endpoint**                       | Find a target `GET`, `HEAD`, or `OPTIONS` endpoint that returns sensitive information in its response (e.g., user profiles, order details). Sensitive data may be hidden in the source/Burp response.                                                                                                                                                                                                                                                                                                                                                  |
| **Test Origin Server Path Abstraction**             | Add an arbitrary path segment to the URL (e.g., `/api/orders/123` → `/api/orders/123/foo`). If the same sensitive data is returned, the server abstracts/ignores the added segment.                                                                                                                                                                                                                                                                                                                                                                    |
| [[Exploiting Path Mapping for Web Cache Deception]] | Append a static file extension (`.css`, `.js`, `.ico`, `.exe`, css..) to the abstracted URL (e.g., `/api/orders/123/foo.js`). Test if the cache stores the dynamic response by observing cache hit headers (`X-Cache: hit`) on repeat requests.                                                                                                                                                                                                                                                                                                        |
| **Exploit Path Mapping Discrepancies**              | Craft a URL where the cache (using traditional file mapping) and server (using REST-style mapping) interpret the path differently. Example: `/user/123/profile/wcd.css` might return user profile data (server view) but be cached as a CSS file (cache view).                                                                                                                                                                                                                                                                                         |
| **Use a Cache Buster During Testing**               | Automatically append unique query parameters to each request (using tools like Burp's Param Miner) to ensure fresh requests reach the origin server and avoid interference from cached responses during testing.                                                                                                                                                                                                                                                                                                                                       |
| **Detect Cached Responses**                         | Identify cached responses by checking headers like `X-Cache: hit`, `Age`, or `Cache-Control: public` with `max-age > 0`. Compare response times—significantly faster repeats suggest caching.                                                                                                                                                                                                                                                                                                                                                          |
| [[Delimiter Discrepacy Web Cache Deception]]        | Test characters like (`;`, `?`, `#`, or `&`) in the URL(**/profile;.foo.css**) path to identify parsing discrepancies between the cache and server. If the server treats them as delimiters/truncation points but the cache includes them in the path for rule matching, a deception vulnerability may exist.                                                                                                                                                                                                                                          |
| [[Delimiter Decoding Discrepancies]]                | Encoded characters may also sometimes be used as delimiters. For example, consider the request **/profile%00foo.js**<br>Find an endpoint where **adding text actually changes the response**, so you can later tell whether adding a delimiter _removes_ that change again                                                                                                                                                                                                                                                                             |
| [[Exploiting Normalization by the Origin Server]]   | If the origin server resolves encoded `../` paths but the cache doesn’t, you can exploit this by using a URL like `/assets/..%2fprofile`, which the cache treats as `/assets/..%2fprofile` while the server treats it as `/profile`                                                                                                                                                                                                                                                                                                                    |
| [[Exploiting Normalization by the Cache Server]]    | If the cache server decodes and normalizes the path but the origin server doesn’t, you can take advantage of this mismatch by using a fully-encoded traversal sequence like `/<dynamic-path>%2f%2e%2e%2f<static-directory-prefix>`. The cache decodes it and treats the request as `/static`, while the origin sees the encoded form as part of the path. In these cases, a delimiter such as `;` may be needed so both servers interpret the path differently — with the cache resolving `/static` and the origin still treating it as a dynamic path |

---
## Web caches
A web cache intercepts requests for static resources, stores server responses according to predefined rules, and serves cached copies on future requests to reduce repeated trips to the origin server. The cache uses a preconfigured set of rules to determine whether to store the response.

Caching rose in popularity alongside the widespread adoption of CDNs. (Content Delivery Networks)

> Web cache deception attacks exploit how cache rules are applied


![[Pasted image 20251226133350.png]]
###  Exploiting static extension cache rules
If there are discrepancies in how the cache and origin server map the URL path to resources or use delimiters, an attacker may be able to craft a request for a dynamic resource with a static extension that is ignored by the origin server but viewed by the cache.

## Cache keys
When the cache receives an HTTP request, it must decide whether there is a cached response that it can serve directly, or whether it has to forward the request to the origin server. The cache makes this decision by generating a 'cache key' from elements of the HTTP request. Typically, this includes the URL path and query parameters, but it can also include a variety of other elements like headers and content type.

If the incoming request's cache key matches that of a previous request, the cache considers them to be equivalent and serves a copy of the cached response.

> To learn how to manipulate cache keys to inject malicious content into the cache, see our Web cache poisoning Academy topic.

### Cache rules & Cache Deception Attack
Cache rules determine what can be cached and for how long. Cache rules are often set up to store static resources, which generally don't change frequently and are reused across multiple pages. Dynamic content is not cached as it's more likely to contain sensitive information, ensuring users get the latest data directly from the server.

Web cache deception attacks exploit how cache rules are applied, so it's important to know about some different types of rules, particularly those based on defined strings in the URL path of the request. For example:

- **Static file extension rules** - These rules match the file extension of the requested resource, for example `.css` for stylesheets or `.js` for JavaScript files.
- **Static directory rules** - These rules match all URL paths that start with a specific prefix. These are often used to target specific directories that contain only static resources, for example `/static` or `/assets`.
- **File name rules** - These rules match specific file names to target files that are universally required for web operations and change rarely, such as `robots.txt` and `favicon.ico`.

Caches may also implement custom rules based on other criteria, such as URL parameters or dynamic analysis.

---

## Constructing a web cache deception attack
Generally speaking, constructing a basic web cache deception attack involves the following steps:

1. Identify a target endpoint that returns a dynamic response containing sensitive information. Review responses in Burp, as some sensitive information may not be visible on the rendered page. Focus on endpoints that support the `GET`, `HEAD`, or `OPTIONS` methods as requests that alter the origin server's state are generally not cached.
2. Identify a discrepancy in how the cache and origin server parse the URL path. This could be a discrepancy in how they:
    - Map URLs to resources.
    - Process delimiter characters.
    - Normalize paths.
3. Craft a malicious URL that uses the discrepancy to trick the cache into storing a dynamic response. When the victim accesses the URL, their response is stored in the cache. Using Burp, you can then send a request to the same URL to fetch the cached response containing the victim's data. Avoid doing this directly in the browser as some applications redirect users without a session or invalidate local data, which could hide a vulnerability.

We'll explore some different approaches for constructing a web cache deception attack.

## Finding Cached Responses
During testing, it's crucial that you're able to identify cached responses. To do so, look at response headers and response times.

Various response headers may indicate that it is cached. For example:

- The `X-Cache` header provides information about whether a response was served from the cache. Typical values include:
    - `X-Cache: hit` - The response was served from the cache.
    - `X-Cache: miss` - The cache did not contain a response for the request's key, so it was fetched from the origin server. In most cases, the response is then cached. To confirm this, send the request again to see whether the value updates to hit.
    - `X-Cache: dynamic` - The origin server dynamically generated the content. Generally this means the response is not suitable for caching.
    - `X-Cache: refresh` - The cached content was outdated and needed to be refreshed or revalidated.
- The `Cache-Control` header may include a directive that indicates caching, like `public` with a `max-age` higher than `0`. Note that this only suggests that the resource is cacheable. It isn't always indicative of caching, as the cache may sometimes override this header.

If you notice a big difference in response time for the same request, this may also indicate that the faster response is served from the cache.

Cache rules often target static resources by matching common file extensions like `.css` or `.js`. This is the default behaviour in most CDNs.

## Exploiting static directory cache rules

URL path prefixes, like `/static`, `/assets`, `/scripts`, or `/images`. These rules can also be vulnerable to web cache deception.
To be able to retrieve those paths we sometimes need to perform **Path Traversal Attacks**

## Exploiting normalization discrepancies
Because the response is only cached if the request matches the exact file name, you can only exploit a discrepancy where the cache server resolves encoded dot-segments, but the origin server doesn't. Use the same method as for static directory cache rules - simply replace the static directory prefix with the file name. For more information, see Exploiting normalization by the cache server.

## Preventing web cache deception vulnerabilities
You can take a range of steps to prevent web cache deception vulnerabilities:

- Always use `Cache-Control` headers to mark dynamic resources, set with the directives `no-store` and `private`.
- Configure your CDN settings so that your caching rules don't override the `Cache-Control` header.
- Activate any protection that your CDN has against web cache deception attacks. Many CDNs enable you to set a cache rule that verifies that the response `Content-Type` matches the request's URL file extension. For example, Cloudflare's Cache Deception Armor.
- Verify that there aren't any discrepancies between how the origin server and the cache interpret URL paths.