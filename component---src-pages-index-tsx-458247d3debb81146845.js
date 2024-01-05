"use strict";(self.webpackChunkgatsbyblog=self.webpackChunkgatsbyblog||[]).push([[691],{6193:function(e,t,l){l.d(t,{Z:function(){return c}});var a=l(7294),n=l(1883);function r(){const[e,t]=a.useState(!1);return a.createElement("nav",{className:"flex justify-between"},a.createElement(n.Link,{to:"/"},a.createElement("h1",{className:"text-3xl text-black leading-normal mb-6 mt-0 inline-block"},"xprilion's blog")),a.createElement("div",null,a.createElement("div",{className:"hidden sm:flex"},a.createElement(n.Link,{to:"/posts",className:"m-1"},"Posts"),"·",a.createElement(n.Link,{to:"/talks",className:"m-1"},"Talks"),"·",a.createElement(n.Link,{to:"/publications",className:"m-1"},"Publications"),"·",a.createElement(n.Link,{to:"/codelabs",className:"m-1"},"Codelabs")),a.createElement("button",{type:"button",className:"flex items-center justify-center w-10 h-10 sm:hidden text-3xl rounded-full border-2 border-black",onClick:()=>t(!e),style:{backgroundImage:"url(/ellipses.png)",backgroundSize:"50%",backgroundPosition:"50%",backgroundRepeat:"no-repeat"}}),e&&a.createElement("div",{className:"sm:hidden",id:"small-nav-menu"},a.createElement(n.Link,{to:"/posts",className:"m-1"},"Posts"),"·",a.createElement(n.Link,{to:"/talks",className:"m-1"},"Talks"),"·",a.createElement(n.Link,{to:"/publications",className:"m-1"},"Publications"),"·",a.createElement(n.Link,{to:"/codelabs",className:"m-1"},"Codelabs"))))}function m(){return a.createElement("div",{className:"w-full max-w-[800px] mx-auto py-8"},a.createElement("div",{className:"flex justify-between"},a.createElement("div",null,"© Anubhav Singh ",(new Date).getFullYear()),a.createElement("div",null,a.createElement(n.Link,{to:"/sitemap.xml"},"Sitemap"))))}var c=e=>{let{children:t}=e;return a.createElement("div",{className:"flex flex-col h-screen mx-auto p-4 lg:p-8 mx-w-full max-w-screen-xl"},a.createElement(r,null),a.createElement("hr",{className:"hr-full"}),a.createElement("main",{className:"max-w-[stretch] lg:max-w-[800px] mx-auto"},t),a.createElement("br",null),a.createElement("hr",{className:"hr-full"}),a.createElement(m,null))}},4109:function(e,t,l){l.d(t,{C:function(){return n}});var a=l(7294);const n=()=>a.createElement("form",{action:"https://newsletter.xprilion.com/subscription/form",method:"post",target:"popupwindow",onSubmit:()=>(window.open("https://newsletter.xprilion.com/subscription/form","popupwindow","scrollbars=yes,width=800,height=600"),!0),className:"SignupForm"},a.createElement("h3",null,"Subscribe to my newsletter"),a.createElement("i",null,"I often write about my experiences, sometimes tech, sometimes life"),a.createElement("br",null),a.createElement("div",{className:"Wrapper"},a.createElement("input",{"aria-label":"Email address",placeholder:"john@example.com",name:"email",type:"email",required:!0,id:"tlemail"}),a.createElement("input",{className:"ml-2 mr-2","aria-label":"Your name",placeholder:"John Doe",name:"name",type:"text",required:!0,id:"tlname"}),a.createElement("input",{id:"l-69f4cf24-c231-434c-be19-6d8899d60fbf",type:"hidden",name:"l",value:"69f4cf24-c231-434c-be19-6d8899d60fbf"}),a.createElement("button",{type:"submit"},"Subscribe")))},7200:function(e,t,l){l.r(t),l.d(t,{Head:function(){return s}});var a=l(7294),n=l(1883),r=l(6193),m=l(2651),c=l(4109);t.default=e=>{let{data:t}=e;const l=t.hashnode.publication.posts.edges;return a.createElement(r.Z,null,a.createElement("div",{className:"flex mt-8 flex-col border-b-2"},a.createElement("div",{className:"flex flex-row justify-start items-start"},a.createElement("img",{className:"rounded-full h-12 w-12 m-0",src:"/favicon.png",alt:"Anubhav Singh"}),a.createElement("div",{className:"ml-4"},"Hey, I'm ",a.createElement("strong",null,"Anubhav Singh"),". I love building software, mixing stacks and making memes.",a.createElement("br",null),"Co-founder @ ",a.createElement("a",{href:"https://dynopii.com/anubhav",target:"blank"},"Dynopii"),"  & ",a.createElement("a",{href:"https://developers.google.com/community/experts/directory/profile/profile-anubhav-singh",target:"blank"},"Google Dev Expert")," in GCP",a.createElement("p",null,a.createElement("a",{href:"https://twitter.com/xprilion",target:"blank"},"Twitter")," ·",a.createElement("a",{href:"https://github.com/xprilion",target:"blank"},"GitHub")," ·",a.createElement("a",{href:"https://linkedin.com/in/xprilion",target:"blank"},"LinkedIn")," ·",a.createElement("a",{href:"https://instagram.com/xprilion",target:"blank"},"Instagram"))))),a.createElement("div",{className:"mt-8 border-b-2"},"I used to lead the volunteer team at ",a.createElement("a",{href:"https://gdg.community.dev/gdg-cloud-kolkata/",target:"blank"},"GDG Cloud Kolkata")," and co-led the team at ",a.createElement("a",{href:"https://tfug.kolkata.dev",target:"blank"},"TFUG Kolkata"),a.createElement("br",null),"I established ",a.createElement("a",{href:"https://dscnsec.com",target:"blank"},"DSC NSEC")," and ",a.createElement("a",{href:"https://winterofcode.com",target:"blank"},"Winter of Code"),".",a.createElement("br",null),"I run a support channel for GSoC aspirants at ",a.createElement("a",{href:"https://t.me/fossflow",target:"blank"},"FossFlow")," since 2020. ",a.createElement("br",null),a.createElement("br",null)),a.createElement("ul",{className:"mt-8 p-0"},l.map((e=>a.createElement("li",{style:{display:"block"},key:e.node.slug},a.createElement(n.Link,{style:{boxShadow:"none"},to:`/${e.node.slug}`},a.createElement("h2",{style:{marginBottom:"0.2rem"}},e.node.title)),a.createElement("small",null,(0,m.p)(e.node.publishedAt)),a.createElement("p",{style:{marginTop:"0.5rem"}},e.node.brief))))),a.createElement("br",null),a.createElement(n.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit",padding:"0.5em 1em",border:"2px solid #5c5c5c",borderRadius:"4px"},to:"/posts/"},"More →"),a.createElement("br",null),a.createElement("br",null),a.createElement(c.C,null),a.createElement("br",null))};const s=()=>a.createElement("title",null,"Anubhav Singh | xprilion's blog")},2651:function(e,t,l){l.d(t,{p:function(){return a}});const a=e=>{const t=new Date(e);return`${t.getDate()} ${["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()]}, ${t.getFullYear()}`}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-458247d3debb81146845.js.map