"use strict";(self.webpackChunkgatsbyblog=self.webpackChunkgatsbyblog||[]).push([[417],{4109:function(e,t,a){a.d(t,{C:function(){return l}});var n=a(7294);const l=()=>n.createElement("form",{action:"https://newsletter.xprilion.com/subscription/form",method:"post",target:"popupwindow",onSubmit:()=>(window.open("https://newsletter.xprilion.com/subscription/form","popupwindow","scrollbars=yes,width=800,height=600"),!0),className:"SignupForm"},n.createElement("h3",null,"Subscribe to my newsletter"),n.createElement("i",null,"I often write about my experiences, sometimes tech, sometimes life"),n.createElement("br",null),n.createElement("div",{className:"flex flex-col md:flex-row overflow-hidden"},n.createElement("input",{className:"mb-2 md:m-0","aria-label":"Email address",placeholder:"john@example.com",name:"email",type:"email",required:!0,id:"tlemail"}),n.createElement("input",{className:"mb-2 md:ml-2 md:mb-0 md:mr-2","aria-label":"Your name",placeholder:"John Doe",name:"name",type:"text",required:!0,id:"tlname"}),n.createElement("input",{id:"l-69f4cf24-c231-434c-be19-6d8899d60fbf",type:"hidden",name:"l",value:"69f4cf24-c231-434c-be19-6d8899d60fbf"}),n.createElement("button",{type:"submit"},"Subscribe")))},1791:function(e,t,a){a.r(t),a.d(t,{default:function(){return E}});var n=a(7294),l=a(5660),r=a.n(l),c=a(2651),s=(a(7013),a(6456),a(235),a(8674),a(9208),a(677),a(3697)),i=a(4109),o=a(2768);var m=e=>{let{sections:t,activeSectionId:a,onSetActiveSectionId:l}=e;const{0:r,1:c}=(0,n.useState)(!1),s=t.findIndex((e=>e.id===a)),i=t.find((e=>e.id===a));return n.createElement("aside",{className:"mb-4 md:mb-0"},n.createElement("div",{className:"md:hidden"},n.createElement("button",{onClick:()=>c(!r),className:"flex justify-between items-center px-4 py-2 font-medium text-left w-full bg-gray-100 rounded-md"},n.createElement("span",null,i?i.title:"Select a Section"),n.createElement("span",{className:"transform transition-transform "+(r?"rotate-180":"")},"▼")),r&&n.createElement("ul",{className:"list-none p-0 mt-2 bg-gray-100 rounded-md"},t.map(((e,t)=>n.createElement("li",{key:e.id,className:"rounded-md"},n.createElement("button",{onClick:()=>{l(e.id),c(!1)},className:"block text-left w-full px-3 py-2 font-medium truncate rounded-md transition-colors "+(a===e.id?"bg-black text-white":"hover:bg-gray-50")},t+1,". ",e.title)))))),n.createElement("div",{className:"hidden md:block lg:w-72 bg-gray-100 p-4 overflow-y-auto"},n.createElement("ul",{className:"list-none p-0"},t.map(((e,t)=>n.createElement("li",{key:e.id,className:"rounded-md"},n.createElement("button",{onClick:()=>l(e.id),className:`block text-left w-full px-3 py-2 font-medium rounded-md transition-colors ${a===e.id?"bg-black text-white hover:bg-gray-800":"hover:bg-gray-300"} ${t<s?"bg-gray-700 text-gray-300 hover:bg-gray-800":""}`},t+1,". ",e.title)))))))};var d=e=>{let{sections:t,activeSectionId:a,onNavigateSection:l,upperContent:r,bottomContent:c}=e;const s=t.findIndex((e=>e.id===a));return n.createElement("main",{className:"bg-gray-50 flex-1 p-1 md:p-5 pt-0 w-full"},n.createElement("div",{className:"w-full"},t.map((e=>{if(e.id===a)return n.createElement(n.Fragment,null,n.createElement("div",{key:e.id,className:"bg-white shadow-lg rounded p-6 mb-4 w-full min-h-[500px]"},n.createElement("div",{className:"flex flex-row align-middle justify-between"},n.createElement("h2",{className:"m-0 mb-4"},e.title),n.createElement("div",{className:"text-right text-sm text-gray-500"},e.duration," mins")),n.createElement("div",{className:"content-section"},e.content)),n.createElement("div",{className:"flex justify-between mt-4"},s>0?n.createElement("button",{onClick:()=>l("prev"),className:"bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-900"},"Previous"):n.createElement(n.Fragment,null," "),s<t.length-1&&n.createElement("button",{onClick:()=>l("next"),className:"bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-900"},"Next")))})),c))},u=a(625);var p=e=>{let{htmlContent:t,upperContent:a,bottomContent:l}=e;const c=(0,o.P)(t),s=c.length>0?c[0].id:"",[i,p]=n.useState(s);return(0,n.useEffect)((()=>{r().highlightAll()}),[i]),n.createElement(n.Fragment,null,n.createElement("div",{className:"flex flex-col md:flex-row w-full"},n.createElement(m,{sections:c,activeSectionId:i,onSetActiveSectionId:p}),n.createElement("div",{className:"flex flex-col h-screen mx-auto w-full"},n.createElement("div",{className:"max-w-[800px]"},n.createElement(d,{sections:c,activeSectionId:i,onNavigateSection:e=>{const t=c.findIndex((e=>e.id===i)),a="prev"===e?t-1:t+1;c[a]&&p(c[a].id)},bottomContent:l}),n.createElement("br",null),n.createElement("hr",{className:"hr-full"}),n.createElement(u.Z,null)))))};var g=e=>{let{children:t}=e;return n.createElement("div",{className:"px-4"},t)},b=a(4593),f=a(5811);var E=e=>{let{pageContext:t}=e;const{id:a,title:l,subtitle:o,url:m,publishedAt:d,coverImage:u,content:E,seo:h}=t.node;return(0,n.useEffect)((()=>{r().highlightAll(),window.MathJax&&window.MathJax.typeset().catch((e=>console.error("MathJax typesetPromise failed:",e)))}),[E]),n.createElement(g,null,n.createElement(b.q,null,n.createElement("title",null,`${l.replace("Page::","")} | xprilion's blog`),n.createElement("meta",{itemProp:"name",content:`${l.replace("Page::","")} | xprilion's blog`}),n.createElement("meta",{name:"description",content:o}),n.createElement("meta",{property:"og:description",content:o}),n.createElement("meta",{name:"twitter:title",content:`${l.replace("Page::","")} | xprilion's blog`}),n.createElement("meta",{name:"twitter:description",content:o})),n.createElement(f.Z,{closeBtn:!0,title:`${l.replace("Page::","")} | xprilion's blog`}),n.createElement("hr",{className:"hr-full"}),n.createElement(p,{htmlContent:(v=E.html,v.replace(/\\?\(\((.*?)\\?\)\)/g,"(( $1 ))").replace(/\\?\[\[\s*(.*?)\s*\\?\]\]/g,"[[ $1 ]]")),upperContent:n.createElement(n.Fragment,null,n.createElement("h1",null,l.replace("Codelab::","")),n.createElement("p",{style:{marginTop:"-1rem"}},n.createElement("small",null,(0,c.p)(d))),u&&n.createElement("img",{src:u.url,alt:l})),bottomContent:n.createElement(n.Fragment,null,n.createElement("br",null),n.createElement(i.C,null),n.createElement("br",null),n.createElement(s.s,{attrs:{host:"https://cusdis.com",appId:"e9bc0bcb-d463-4f63-8604-34e78a1ec232",pageId:a,pageTitle:l,pageUrl:m}}))}));var v}},3697:function(e,t,a){t.s=void 0;const n=a(7294),l=a(168);t.s=function(e){const t=n.useRef(null),a=e.attrs.host||"https://cusdis.com";return l.useScript(`${a}/js/cusdis.es.js`),l.useScript(e.lang?`${a}/js/widget/lang/${e.lang}.js`:""),n.useLayoutEffect((()=>{const e=window.renderCusdis;e&&e(t.current)}),[e.attrs.appId,e.attrs.host,e.attrs.pageId,e.attrs.pageTitle,e.attrs.pageUrl,e.lang]),n.createElement(n.Fragment,null,n.createElement("div",{id:"cusdis_thread","data-host":a,"data-page-id":e.attrs.pageId,"data-app-id":e.attrs.appId,"data-page-title":e.attrs.pageTitle,"data-page-url":e.attrs.pageUrl,"data-theme":e.attrs.theme,style:e.style,ref:t}))}},168:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),t.useScript=void 0;const n=a(7294);t.useScript=function(e){const[t,a]=n.useState(e?"loading":"idle");return n.useEffect((()=>{if(!e)return void a("idle");let t=document.querySelector(`script[src="${e}"]`);if(t)a(t.getAttribute("data-status"));else{t=document.createElement("script"),t.src=e,t.async=!0,t.setAttribute("data-status","loading"),document.body.appendChild(t);const a=e=>{t.setAttribute("data-status","load"===e.type?"ready":"error")};t.addEventListener("load",a),t.addEventListener("error",a)}const n=e=>{a("load"===e.type?"ready":"error")};return t.addEventListener("load",n),t.addEventListener("error",n),()=>{t&&(t.removeEventListener("load",n),t.removeEventListener("error",n))}}),[e]),t}}}]);
//# sourceMappingURL=component---src-templates-codelabs-codelab-tsx-7235a9556527c2b7b406.js.map