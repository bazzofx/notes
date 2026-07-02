
This project is from [OWASP](https://owasp.org/www-project-threatatlas/) and it brings capabilities to create Thread Models of our applications using self-hosted tools, including local LLMs.
[Installation guide](https://github.com/OWASP/www-project-threatatlas/blob/main/threatatlas-app/docs/installation.md) 

### Run the Application

```shell
git clone https://github.com/OWASP/www-project-threatatlas.git
cd www-project-threatatlas/threatatlas-app

# (Optional) copy and edit the environment file before starting
cp .env.example .env

# Build and start services
docker compose up -d
```

### Access
- **Frontend**: [http://localhost:3000](http://localhost:3000/)
- **Backend API**: [http://localhost:8000](http://localhost:8000/docs) (Docs at `/docs`)

### First Login
A default admin account is created automatically on first run:

| Field    | Value            |
| -------- | ---------------- |
| Email    | `admin@acme.com` |
| Password | `Admin@1234`     |
