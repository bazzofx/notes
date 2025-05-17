```
javascript:(function(){const e=document.createElement('div');e.id='focus-spotlight-overlay',e.style='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);pointer-events:none;z-index:999999;mask-image:radial-gradient(circle at center,transparent 0%,transparent 20%,black 30%);-webkit-mask-image:radial-gradient(circle at center,transparent 0%,transparent 10%,black 20%)';document.body.appendChild(e);document.addEventListener('mousemove',t=>{e.style.maskImage=`radial-gradient(circle at ${t.clientX}px ${t.clientY}px,transparent 0%,transparent 10%,black 20%)`,e.style.webkitMaskImage=`radial-gradient(circle at ${t.clientX}px ${t.clientY}px,transparent 0%,transparent 10%,black 20%)`}),document.addEventListener('keydown',t=>{'Escape'===t.key&&e.remove()})})();
```

