import{a as c,S as d,i}from"./assets/vendor-BLkLXWwN.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();c.defaults.baseURL="https://pixabay.com";function f(t){return c.get("/api/",{params:{key:"50262492-fe39fd1e0043f380ecc767a24",q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:"true"}}).then(r=>r.data.hits).catch(r=>{console.log(r)})}const u=document.querySelector(".gallery"),p=document.querySelector(".loader"),m=new d(".gallery a",{captionsData:"alt",captionDelay:250});function y(t){return`<li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}">
      </a>
      <ul class="stats">
        <li class="stats-item"><p class="stat-title">likes</p><p class="stat-value">${t.likes}</p></li>
        <li class="stats-item"><p class="stat-title">views</p><p class="stat-value">${t.views}</p></li>
        <li class="stats-item"><p class="stat-title">comments</p><p class="stat-value">${t.comments}</p></li>
        <li class="stats-item"><p class="stat-title">downloads</p><p class="stat-value">${t.downloads}</p></li>   
      </ul>
    </li>`}function h(){u.innerHTML=""}function g(){p.style.display="block"}function L(){p.style.display="none"}function w(t){u.insertAdjacentHTML("beforeend",t.map(y).join("")),m.refresh()}const n=document.querySelector(".form");n.addEventListener("submit",t=>{t.preventDefault();const a=new FormData(n).get("search-text");if(!a){i.show({message:`Sorry, there are no images matching your search query. 
        Please try again!`,color:"red",position:"topRight"});return}h(),g(),f(a).then(o=>{if(o.length===0){i.show({message:`Sorry, there are no images matching your search query. 
        Please try again!`,color:"red",position:"topRight"});return}w(o)}).catch(o=>{i.show({message:`Error: ${o}`,color:"red",position:"topRight"})}).finally(()=>{L()}),n.reset()});
//# sourceMappingURL=index.js.map
