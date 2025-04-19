
## Hydration Error
When a component renders at server side does not match what it was rendered on the client side for example **Date.now()** or **Math.random()**
- A possible fix is adding the tag **suppressHydrationWarning** on the element that is causing errors, this is not a big issue if used on theme elements only, but should be **avoided for any logic calculation**
Ref: [Fixing Hydration Error Next.JS](https://www.youtube.com/watch?v=A6TlNMclAbA&ab_channel=ProgrammingwithUmair)
##### Example:
![[Pasted image 20250418143926.png]]