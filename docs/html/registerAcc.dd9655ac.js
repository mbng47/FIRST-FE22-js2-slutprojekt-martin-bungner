class e{constructor(e,t,n,s){this.username=e,this.password=t,this.img=n,this.posts=s}}function t(t,n,s){const a=t.value,o=n.value;let r;if(s){const t=s.value;r=new e(a,o,t)}else r=new e(a,o);return r}const n="https://megameetings-4101b-default-rtdb.europe-west1.firebasedatabase.app/";async function s(){const e=n+"users.json",t=await fetch(e);return await t.json()}async function a(e){let t=!1;const n=await s();for(const s of n)if(s.username===e.username){t=!0;break}return t}async function o(e){const t=(await s()).length,a={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}},o=`${n}users/${t}.json`,r=await fetch(o,a);await r.json()}const r=document.getElementById("reg-username"),i=document.getElementById("reg-password");document.getElementById("register-form").addEventListener("submit",(async e=>{if(e.preventDefault(),null!=r.value&&""!=r.value&&"none"!=r.value&&null!=i.value&&""!=i.value&&"none"!=i.value){const e=document.querySelector("input[type = radio]:checked"),n=t(r,i,e);if(await a(n))alert("Username already exists");else{await o(n);const e=JSON.stringify(n);sessionStorage.setItem("activeUser",e),window.location.assign("./feed.html")}}else alert("Name, password and profile picture are mandatory")}));
//# sourceMappingURL=registerAcc.dd9655ac.js.map
