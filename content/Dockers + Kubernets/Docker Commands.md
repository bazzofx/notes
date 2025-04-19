# Docker Containers

## List Running Containers
```
docker ps
```

## List Installed Containers
```
docker ps -a
```
## Docker logs
```
docker logs $dockerName
```

## Login to Docker Container
```
docker exec -it $dockerName /bin/bash
```

# Docker Images
## Check Docker Images
```
docker images
```

## Remove Docker Images
```
docker rmi $dockerImageName
```

## Rebuild last image
```
docker build -t hacker-terminal .
```

- -t Tag used
# Deploying Docker
Run Docker Container
```
docker run -d --name $dockerImage -p 80:80 -p 443:443 -p 3000:3000 hacker-terminal
```
#### If we need to also use NGINX on the server we should avoid exposing the ports 80 and 443 directly on the docker so the actual creation will look like the below, while running NGINX locally
```
docker run -d --name $dockerImage -p 3000:3000 hacker-terminal
```