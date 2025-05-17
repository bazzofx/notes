NPM Node Package Management
[npm website](https://npmjs.com)
[npm documentation](https://docs.npmjs.com/about-packages-and-modules)

# npm Commands

## nvm - Node Version Management
- `nvm` is a package to manage Node version, and hot reload similar to how it can be done using on python using `pyenv`.

Usually these commands are small script config lines that live inside the package.json, like the below.
![[Pasted image 20250327081542.png]]
## npm install

- `npm install` installs dependencies from `package.json` into the `node_modules/` directory,  then runs the `package.json` `scripts.install`
-  You can call `install` on another node.js project (module), to install it as a dependency for your project.
```
npm install
```

*packages will be save under **node_modules** folder*

## npm run install
- `npm run install` only runs the `package.json` `scripts.install`, it **will not install dependencies**.
```
npm run install
```
Essentially calls `npm run install` after dependencies are installed.

## npm ci
`npm ci` Is short for "clean install" its similar to npm install but mostly used for pipelines, and test zones like on github actions for example
```
npm ci
```

---
## npm run dev
- `npm run dev` creates a source map and doesn't minify your js/css which makes it easier to debug and find errors out
```
npm run dev
```
## npm run production
- `npm run production` Its better for optimization, it does not create a source map and **minifies all your js/css files** so that they are ready for production and are faster to read by the system. 
- Usually this will be the commands npm run build and npm run start together, this is a config inside the `package.json`

```
npm run production
```

---
## npm run build
- It will consolidate all the files within fewer files, and create a `build\` folder that is ready for deployment. 
- If you working with NextJS it will create a `.next\` folder instead.
- You can delete this folder and it will be re-created after you build again
```
npm run build
```
![[Pasted image 20250326221041.png]]

## API Public/Private
API keys on node can be set to be public or private, this will depend who is using the APIs on the request, if the APIs need to be send when the client is making a request they need to be set as PUBLIC
**This does not mean the API is exposed, or hard coded into the file** But only a category for the API classification within the build file


## Exposing App to the Internet
![[Pasted image 20250330235329.png]]
Adding the **-H 0.0.0.** will expose the server to the internet allowing any IP to connect to the server based on the application port that its been exposed on the application.
So if I have an app running on port :3000 and I add the **-H 0.0.0.0** I will be able to reach my application using
```
public_IP:3000
```

## Troubleshooting Dev
When running npm run dev
### Error
```
 ⨯ Failed to start server
Error: listen EACCES: permission denied 0.0.0.0:3000
    at <unknown> (Error: listen EACCES: permission denied 0.0.0.0:3000)
  code: 'EACCES',
  errno: -4092,
  syscall: 'listen',
  address: '0.0.0.0',
  port: 3000
```

### Fix
```
net stop winnat
net start winnat
```