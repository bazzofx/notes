
### 🧱 1. Create an internal Docker network

This network **doesn't allow external connections** — containers can only talk to each other **inside this network**.

```
docker network create --internal my_secure_net
```

✅ `--internal` ensures no outside access — even if a container is exposed with `-p`, it won’t be reachable from the host or internet.

Instead of deploying like we normally do

```
docker run -d -p 3000:3000 --network my_secure_net my-app
```

Use the below (instead  of port binding!)
```
docker run -d --name hacker-terminal -d --network my_secure_net hacker-terminal
```
⚠️ Now your app is only reachable from **within Docker**, not externally. This is **what you want** if UFW should manage access.

## Inspect Network
```
docker network inspect my_secure_net
```

