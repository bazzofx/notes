- Docker container will not contain any apps when deployed.  We have to install everything from scratch.
- Some commands might not work properly like **systemctl** uses **system** instead.
- Variables to the Docker Image are passed during build process of the image ie:
```
docker build -t hacker-terminal --build-arg API_KEY=sk-123456 --build-arg SERVERNAME=website.org .
```

