# Docker Containers

## List Running Containers
```
docker ps
```

-a to list all containers **docker ps -a**
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
