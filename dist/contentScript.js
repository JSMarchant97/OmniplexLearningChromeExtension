(()=>{"use strict";let e;chrome.storage.sync.get(["username","password"],(n=>{n.username&&n.password&&(e=n.username,t())}));const t=()=>{let t;const n=()=>{clearTimeout(t),t=setTimeout((()=>{o()}),5e3)};document.addEventListener("mousemove",n),document.addEventListener("click",n),document.addEventListener("keydown",n);const o=()=>{document.removeEventListener("mousemove",n),document.removeEventListener("click",n),document.removeEventListener("keydown",n),fetch(chrome.runtime.getURL("onSitePopup.html")).then((e=>e.text())).then((t=>{document.body.insertAdjacentHTML("beforeend",t);const n=document.querySelector("template#popUpTemplate");let o=null==n?void 0:n.content.cloneNode(!0);o.querySelector("h4 span.username").innerText=e;const r=o.querySelector("#helperPopup #helper-btn-yes"),c=o.querySelector("#helperPopup #helper-btn-no");null==r||r.addEventListener("click",(()=>{window.open("https://help.nickelled.com");var e=document.querySelector("#helperPopup");null==e||e.remove()})),null==c||c.addEventListener("click",(()=>{var e=document.querySelector("#helperPopup");null==e||e.remove()})),document.body.appendChild(o)}))}}})();