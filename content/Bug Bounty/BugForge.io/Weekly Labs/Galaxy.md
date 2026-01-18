
# Mapping the Application

GET /api/oganization --> JSON 
GET /api/bookings?limit=5
# Recon Phase
## Endpoint Discovery
I use Katana for this part, I was looking for interesting endpoints on this phase, see if anything pop out of the page for me to start testing, unfortunatelly nothing at this stage.

```bash
katana $url -jsl | uro | tee uro_out.txt
```
![[Pasted image 20260117210717.png]]


## Walking the logs..
Suspicious request identified, SQLMap attempted but no luck..
![[Pasted image 20260117212709.png]]

# Motifying Token during Refresh
Modifying the token will allow us to bypass a few restrictions on the `Front-End` , like view deliveries, view organization settings, however the JWT Token will become invalid and we will not be able to modify the data on the `Back-End`
![[Pasted image 20260117214841.png]]