"use strict";(self.webpackChunkgatsbyblog=self.webpackChunkgatsbyblog||[]).push([[376],{4434:function(e,n,t){t.r(n),t.d(n,{Head:function(){return B},default:function(){return H}});var r=t(6540),l=t(8848),o=t.n(l),u=t(2046),c=(t(3552),t(8125),t(2661),t(3564),t(6792),t(9348),t(5835)),i={fullscreenEnabled:0,fullscreenElement:1,requestFullscreen:2,exitFullscreen:3,fullscreenchange:4,fullscreenerror:5,fullscreen:6},a=["webkitFullscreenEnabled","webkitFullscreenElement","webkitRequestFullscreen","webkitExitFullscreen","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"],s=["mozFullScreenEnabled","mozFullScreenElement","mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozfullscreenerror","-moz-full-screen"],f=["msFullscreenEnabled","msFullscreenElement","msRequestFullscreen","msExitFullscreen","MSFullscreenChange","MSFullscreenError","-ms-fullscreen"],d="undefined"!=typeof window&&void 0!==window.document?window.document:{},m="fullscreenEnabled"in d&&Object.keys(i)||a[0]in d&&a||s[0]in d&&s||f[0]in d&&f||[],v={requestFullscreen:function(e){return e[m[i.requestFullscreen]]()},requestFullscreenFunction:function(e){return e[m[i.requestFullscreen]]},get exitFullscreen(){return d[m[i.exitFullscreen]].bind(d)},get fullscreenPseudoClass(){return":"+m[i.fullscreen]},addEventListener:function(e,n,t){return d.addEventListener(m[i[e]],n,t)},removeEventListener:function(e,n,t){return d.removeEventListener(m[i[e]],n,t)},get fullscreenEnabled(){return Boolean(d[m[i.fullscreenEnabled]])},set fullscreenEnabled(e){},get fullscreenElement(){return d[m[i.fullscreenElement]]},set fullscreenElement(e){},get onfullscreenchange(){return d[("on"+m[i.fullscreenchange]).toLowerCase()]},set onfullscreenchange(e){return d[("on"+m[i.fullscreenchange]).toLowerCase()]=e},get onfullscreenerror(){return d[("on"+m[i.fullscreenerror]).toLowerCase()]},set onfullscreenerror(e){return d[("on"+m[i.fullscreenerror]).toLowerCase()]=e}};var h=function(e){var n=e.handle,t=e.onChange,l=e.children,o=e.className,u=[];return o&&u.push(o),u.push("fullscreen"),n.active&&u.push("fullscreen-enabled"),(0,r.useEffect)((function(){t&&t(n.active,n)}),[n.active]),r.createElement("div",{className:u.join(" "),ref:n.node,style:n.active?{height:"100%",width:"100%"}:void 0},l)};t(4848);function p(){return p=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},p.apply(this,arguments)}var g=["shift","alt","meta","mod","ctrl"],E={esc:"escape",return:"enter",".":"period",",":"comma","-":"slash"," ":"space","`":"backquote","#":"backslash","+":"bracketright",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",OSLeft:"meta",OSRight:"meta",ControlLeft:"ctrl",ControlRight:"ctrl"};function y(e){return(E[e]||e).trim().toLowerCase().replace(/key|digit|numpad|arrow/,"")}function b(e,n){return void 0===n&&(n=","),e.split(n)}function w(e,n,t){void 0===n&&(n="+");var r=e.toLocaleLowerCase().split(n).map((function(e){return y(e)}));return p({},{alt:r.includes("alt"),ctrl:r.includes("ctrl")||r.includes("control"),shift:r.includes("shift"),meta:r.includes("meta"),mod:r.includes("mod")},{keys:r.filter((function(e){return!g.includes(e)})),description:t})}"undefined"!=typeof document&&(document.addEventListener("keydown",(function(e){void 0!==e.key&&C([y(e.key),y(e.code)])})),document.addEventListener("keyup",(function(e){void 0!==e.key&&L([y(e.key),y(e.code)])}))),"undefined"!=typeof window&&window.addEventListener("blur",(function(){k.clear()}));var k=new Set;function x(e){return Array.isArray(e)}function C(e){var n=Array.isArray(e)?e:[e];k.has("meta")&&k.forEach((function(e){return!function(e){return g.includes(e)}(e)&&k.delete(e.toLowerCase())})),n.forEach((function(e){return k.add(e.toLowerCase())}))}function L(e){var n=Array.isArray(e)?e:[e];"meta"===e?k.clear():n.forEach((function(e){return k.delete(e.toLowerCase())}))}function F(e,n){var t=e.target;void 0===n&&(n=!1);var r=t&&t.tagName;return x(n)?Boolean(r&&n&&n.some((function(e){return e.toLowerCase()===r.toLowerCase()}))):Boolean(r&&n&&!0===n)}var S=function(e,n,t){void 0===t&&(t=!1);var r=n.alt,l=n.meta,o=n.mod,u=n.shift,c=n.ctrl,i=n.keys,a=e.key,s=e.code,f=e.ctrlKey,d=e.metaKey,m=e.shiftKey,v=e.altKey,h=y(s),p=a.toLowerCase();if(!(null!=i&&i.includes(h)||null!=i&&i.includes(p)||["ctrl","control","unknown","meta","alt","shift","os"].includes(h)))return!1;if(!t){if(r===!v&&"alt"!==p)return!1;if(u===!m&&"shift"!==p)return!1;if(o){if(!d&&!f)return!1}else{if(l===!d&&"meta"!==p&&"os"!==p)return!1;if(c===!f&&"ctrl"!==p&&"control"!==p)return!1}}return!(!i||1!==i.length||!i.includes(p)&&!i.includes(h))||(i?function(e,n){return void 0===n&&(n=","),(x(e)?e:e.split(n)).every((function(e){return k.has(e.trim().toLowerCase())}))}(i):!i)},N=(0,r.createContext)(void 0);function A(e,n){return e&&n&&"object"==typeof e&&"object"==typeof n?Object.keys(e).length===Object.keys(n).length&&Object.keys(e).reduce((function(t,r){return t&&A(e[r],n[r])}),!0):e===n}var R=(0,r.createContext)({hotkeys:[],enabledScopes:[],toggleScope:function(){},enableScope:function(){},disableScope:function(){}});var j=function(e){e.stopPropagation(),e.preventDefault(),e.stopImmediatePropagation()},O="undefined"!=typeof window?r.useLayoutEffect:r.useEffect;function q(e,n,t,l){var o=(0,r.useRef)(null),u=(0,r.useRef)(!1),c=t instanceof Array?l instanceof Array?void 0:l:t,i=x(e)?e.join(null==c?void 0:c.splitKey):e,a=t instanceof Array?t:l instanceof Array?l:void 0,s=(0,r.useCallback)(n,null!=a?a:[]),f=(0,r.useRef)(s);f.current=a?s:n;var d=function(e){var n=(0,r.useRef)(void 0);return A(n.current,e)||(n.current=e),n.current}(c),m=(0,r.useContext)(R).enabledScopes,v=(0,r.useContext)(N);return O((function(){if(!1!==(null==d?void 0:d.enabled)&&(e=m,n=null==d?void 0:d.scopes,0===e.length&&n?(console.warn('A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>'),1):!n||e.some((function(e){return n.includes(e)}))||e.includes("*"))){var e,n,t=function(e,n){var t;if(void 0===n&&(n=!1),!F(e,["input","textarea","select"])||F(e,null==d?void 0:d.enableOnFormTags)){if(null!==o.current){var r=o.current.getRootNode();if((r instanceof Document||r instanceof ShadowRoot)&&r.activeElement!==o.current&&!o.current.contains(r.activeElement))return void j(e)}(null==(t=e.target)||!t.isContentEditable||null!=d&&d.enableOnContentEditable)&&b(i,null==d?void 0:d.splitKey).forEach((function(t){var r,l=w(t,null==d?void 0:d.combinationKey);if(S(e,l,null==d?void 0:d.ignoreModifiers)||null!=(r=l.keys)&&r.includes("*")){if(null!=d&&null!=d.ignoreEventWhen&&d.ignoreEventWhen(e))return;if(n&&u.current)return;if(function(e,n,t){("function"==typeof t&&t(e,n)||!0===t)&&e.preventDefault()}(e,l,null==d?void 0:d.preventDefault),!function(e,n,t){return"function"==typeof t?t(e,n):!0===t||void 0===t}(e,l,null==d?void 0:d.enabled))return void j(e);f.current(e,l),n||(u.current=!0)}}))}},r=function(e){void 0!==e.key&&(C(y(e.code)),(void 0===(null==d?void 0:d.keydown)&&!0!==(null==d?void 0:d.keyup)||null!=d&&d.keydown)&&t(e))},l=function(e){void 0!==e.key&&(L(y(e.code)),u.current=!1,null!=d&&d.keyup&&t(e,!0))},a=o.current||(null==c?void 0:c.document)||document;return a.addEventListener("keyup",l),a.addEventListener("keydown",r),v&&b(i,null==d?void 0:d.splitKey).forEach((function(e){return v.addHotkey(w(e,null==d?void 0:d.combinationKey,null==d?void 0:d.description))})),function(){a.removeEventListener("keyup",l),a.removeEventListener("keydown",r),v&&b(i,null==d?void 0:d.splitKey).forEach((function(e){return v.removeHotkey(w(e,null==d?void 0:d.combinationKey,null==d?void 0:d.description))}))}}}),[i,d,m]),o}var K=e=>{let{sections:n,activeSectionId:t,onNavigateSection:l,upperContent:o,bottomContent:u}=e;const c=n.findIndex((e=>e.id===t)),i=function(){var e=(0,r.useState)(!1),n=e[0],t=e[1],l=(0,r.useRef)(null);(0,r.useEffect)((function(){var e=function(){t(v.fullscreenElement===l.current)};return v.addEventListener("fullscreenchange",e),function(){return v.removeEventListener("fullscreenchange",e)}}),[]);var o=(0,r.useCallback)((function(){return v.fullscreenElement?v.exitFullscreen().then((function(){return v.requestFullscreen(l.current)})):l.current?v.requestFullscreen(l.current):void 0}),[]),u=(0,r.useCallback)((function(){return v.fullscreenElement===l.current?v.exitFullscreen():Promise.resolve()}),[]);return(0,r.useMemo)((function(){return{active:n,enter:o,exit:u,node:l}}),[n,o,u])}(),{0:a,1:s}=(0,r.useState)(!1),f=(0,r.useCallback)(((e,n)=>{s(e)}),[i]);return q("ArrowRight",(()=>l("next"))),q("Space",(()=>l("next"))),q("Enter",(()=>l("next"))),q("ArrowLeft",(()=>l("prev"))),r.createElement("main",{className:"bg-gray-50 flex-1 p-1 md:p-5 pt-0 w-full"},r.createElement(h,{handle:i,onChange:f},r.createElement("div",{className:"w-full"},n.map((e=>{if(e.id===t)return r.createElement(r.Fragment,null,r.createElement("div",{key:e.id,className:"bg-white shadow-lg rounded p-6 mb-4 w-full min-h-[500px] overflow-y-scroll "+(a?"h-screen":"max-h-[500px]")},r.createElement("div",{className:"flex flex-row align-middle justify-between"},r.createElement("h2",{className:"m-0 mb-4"},e.title),r.createElement("div",{className:"text-right text-sm text-gray-500"},e.duration," mins")),r.createElement("div",{className:"content-section"},e.content)),r.createElement("div",{className:"flex justify-between mt-4"},r.createElement("button",{onClick:i.enter},"Enter fullscreen"),r.createElement("div",{className:""+(a?"fixed bottom-0 right-0 z-[99999] p-2":"")},r.createElement("button",{onClick:()=>l("prev"),className:"px-2 py-1 mr-2 text-sm rounded shadow "+(c>0?"bg-gray-700 text-white hover:bg-gray-900":"bg-gray-100"),disabled:0===c},"Previous"),r.createElement("button",{onClick:()=>l("next"),className:"px-2 py-1 text-sm rounded shadow "+(c<n.length-1?"bg-gray-700 text-white hover:bg-gray-900":"bg-gray-100"),disabled:c===n.length-1},"Next"))))})),u)))},P=t(7212);var z=e=>{let{htmlContent:n,upperContent:t,bottomContent:l}=e;const u=(0,c.T)(n),i=u.length>0?u[0].id:"",[a,s]=r.useState(i);return(0,r.useEffect)((()=>{o().highlightAll()}),[a]),r.createElement(r.Fragment,null,r.createElement("div",{className:"flex flex-col h-screen w-full"},r.createElement("div",{className:"lg:min-w-[800px] max-w-[800px] mx-auto"},r.createElement(K,{sections:u,activeSectionId:a,onNavigateSection:e=>{const n=u.findIndex((e=>e.id===a)),t="prev"===e?n-1:n+1;u[t]&&s(u[t].id)},bottomContent:l}),r.createElement("br",null),r.createElement("hr",{className:"hr-full"}),r.createElement(P.A,null))))};var I=e=>{let{children:n}=e;return r.createElement("div",{className:"px-4"},n)},M=t(9822),D=t(1042);const B=e=>{let{pageContext:n}=e;return r.createElement(D.k,{pageData:n.node})};var H=e=>{let{pageContext:n}=e;const{id:t,title:l,subtitle:c,url:i,publishedAt:a,coverImage:s,content:f,seo:d}=n.node;return(0,r.useEffect)((()=>{o().highlightAll()}),[f]),r.createElement(I,null,r.createElement(M.A,{closeBtn:!0,title:`${l.replace("Page::","")} | xprilion's blog`}),r.createElement("hr",{className:"hr-full"}),r.createElement(z,{htmlContent:f.html,upperContent:r.createElement(r.Fragment,null,r.createElement("h1",null,l.replace("Presentation::","")),r.createElement("p",{style:{marginTop:"-1rem"}},r.createElement("small",null,(0,u.Y)(a))),s&&r.createElement("img",{src:s.url,alt:l})),bottomContent:r.createElement(r.Fragment,null)}))}}}]);
//# sourceMappingURL=component---src-templates-presentations-presentation-tsx-c3e79801d8d57dd7811f.js.map