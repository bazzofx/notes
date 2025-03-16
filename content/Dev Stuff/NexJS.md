Use the below to initialize NextJs project
```
npx create-next-app@latest
```

#### Deploy Local Server
```
npm run dev
```
#### Troubleshooting Install
```
If does not work 
Create `C:\Users\(You)\AppData\Roaming\npm` to make `npx create-next-app@latest` work normally.
```

### Folder Structure
![[FolderStructure.png]]

### Main Files
```
|File | Description|
page.tsx|Contains UI and logic of what sees when visit a specific route|
layout.tsx||
template.tsx||
not-found.tsx||
loading.tsx||
error.tsx||
```

## Page.tsx and Routing
Next.JS uses a file base routing system, if we create a folder **inside the app folder,** folder will automatically become a route, **we simply need to create a page.tsx in the folder** 

![[1 1.png]]


#### [Install and run snipped](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
**rafce** to auto complete code, below is contents of **page.tsx**
```
import React from 'react'
const Home = () => {   return (
<div>Home</div>
) }
export default Home
```

#### Reference
[Next.JS pt1](https://www.youtube.com/watch?v=QIDkK0FbXDc&t=18s&ab_channel=HuXnWebDev)