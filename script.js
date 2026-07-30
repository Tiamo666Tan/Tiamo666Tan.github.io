const stage=document.getElementById("avatarStage"),img=document.getElementById("avatarImage"),bubble=document.getElementById("speechBubble");
const states=[
["assets/images/tiamo-ip/wave.jpg","嗨！欢迎来逛我的作品 👋"],
["assets/images/tiamo-ip/laptop.jpg","正在把想法变成可以运行的项目 💻"],
["assets/images/tiamo-ip/thinking.jpg","让我先看看数据怎么说 🤔"],
["assets/images/tiamo-ip/surprise.jpg","哇，这个项目还有隐藏细节！😳"]
];let current=0,lastZone="";
function setState(i){current=(i+states.length)%states.length;img.style.opacity=".2";setTimeout(()=>{img.src=states[current][0];bubble.textContent=states[current][1];img.style.opacity="1"},100)}
stage?.addEventListener("click",()=>setState(current+1));
stage?.addEventListener("touchstart",()=>setState(current+1),{passive:true});
stage?.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;img.style.transform=`perspective(800px) rotateY(${(x-.5)*12}deg) rotateX(${(.5-y)*10}deg)`;let z=y<.28?"top":x<.34?"left":x>.66?"right":y>.68?"bottom":"center";if(z!==lastZone){lastZone=z;setState(z==="top"?3:z==="left"?2:z==="bottom"?1:0)}});
stage?.addEventListener("pointerleave",()=>{img.style.transform="";bubble.textContent="再点我一下，会换表情哦 😎";lastZone=""});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target)}}),{threshold:.14});document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
const cobs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.target,p=el.dataset.prefix||"",s=el.dataset.suffix||"",st=performance.now();function u(n){let q=Math.min((n-st)/900,1),v=Math.round(t*(1-Math.pow(1-q,3)));el.textContent=p+v+s;if(q<1)requestAnimationFrame(u)}requestAnimationFrame(u);cobs.unobserve(el)}),{threshold:.7});document.querySelectorAll(".count").forEach(x=>cobs.observe(x));
const vobs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?e.target.play().catch(()=>{}):e.target.pause()),{threshold:.25});document.querySelectorAll("video[autoplay]").forEach(v=>vobs.observe(v));