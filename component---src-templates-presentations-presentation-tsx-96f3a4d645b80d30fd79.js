"use strict";(self.webpackChunkgatsbyblog=self.webpackChunkgatsbyblog||[]).push([[526],{5269:function(e,t,n){n.r(t),n.d(t,{default:function(){return D}});var r=n(7294),l=n(5660),o=n.n(l),c=n(2651),u=(n(7013),n(6456),n(235),n(8674),n(9208),n(2768)),i={fullscreenEnabled:0,fullscreenElement:1,requestFullscreen:2,exitFullscreen:3,fullscreenchange:4,fullscreenerror:5,fullscreen:6},a=["webkitFullscreenEnabled","webkitFullscreenElement","webkitRequestFullscreen","webkitExitFullscreen","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"],s=["mozFullScreenEnabled","mozFullScreenElement","mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozfullscreenerror","-moz-full-screen"],f=["msFullscreenEnabled","msFullscreenElement","msRequestFullscreen","msExitFullscreen","MSFullscreenChange","MSFullscreenError","-ms-fullscreen"],d="undefined"!=typeof window&&void 0!==window.document?window.document:{},m="fullscreenEnabled"in d&&Object.keys(i)||a[0]in d&&a||s[0]in d&&s||f[0]in d&&f||[],v={requestFullscreen:function(e){return e[m[i.requestFullscreen]]()},requestFullscreenFunction:function(e){return e[m[i.requestFullscreen]]},get exitFullscreen(){return d[m[i.exitFullscreen]].bind(d)},get fullscreenPseudoClass(){return":"+m[i.fullscreen]},addEventListener:function(e,t,n){return d.addEventListener(m[i[e]],t,n)},removeEventListener:function(e,t,n){return d.removeEventListener(m[i[e]],t,n)},get fullscreenEnabled(){return Boolean(d[m[i.fullscreenEnabled]])},set fullscreenEnabled(e){},get fullscreenElement(){return d[m[i.fullscreenElement]]},set fullscreenElement(e){},get onfullscreenchange(){return d[("on"+m[i.fullscreenchange]).toLowerCase()]},set onfullscreenchange(e){return d[("on"+m[i.fullscreenchange]).toLowerCase()]=e},get onfullscreenerror(){return d[("on"+m[i.fullscreenerror]).toLowerCase()]},set onfullscreenerror(e){return d[("on"+m[i.fullscreenerror]).toLowerCase()]=e}};var p=function(e){var t=e.handle,n=e.onChange,l=e.children,o=e.className,c=[];return o&&c.push(o),c.push("fullscreen"),t.active&&c.push("fullscreen-enabled"),(0,r.useEffect)((function(){n&&n(t.active,t)}),[t.active]),r.createElement("div",{className:c.join(" "),ref:t.node,style:t.active?{height:"100%",width:"100%"}:void 0},l)};n(5893);function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h.apply(this,arguments)}var g=["shift","alt","meta","mod","ctrl"],E={esc:"escape",return:"enter",".":"period",",":"comma","-":"slash"," ":"space","`":"backquote","#":"backslash","+":"bracketright",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",OSLeft:"meta",OSRight:"meta",ControlLeft:"ctrl",ControlRight:"ctrl"};function y(e){return(E[e]||e).trim().toLowerCase().replace(/key|digit|numpad|arrow/,"")}function b(e,t){return void 0===t&&(t=","),e.split(t)}function w(e,t,n){void 0===t&&(t="+");var r=e.toLocaleLowerCase().split(t).map((function(e){return y(e)}));return h({},{alt:r.includes("alt"),ctrl:r.includes("ctrl")||r.includes("control"),shift:r.includes("shift"),meta:r.includes("meta"),mod:r.includes("mod")},{keys:r.filter((function(e){return!g.includes(e)})),description:n})}"undefined"!=typeof document&&(document.addEventListener("keydown",(function(e){void 0!==e.key&&C([y(e.key),y(e.code)])})),document.addEventListener("keyup",(function(e){void 0!==e.key&&L([y(e.key),y(e.code)])}))),"undefined"!=typeof window&&window.addEventListener("blur",(function(){k.clear()}));var k=new Set;function x(e){return Array.isArray(e)}function C(e){var t=Array.isArray(e)?e:[e];k.has("meta")&&k.forEach((function(e){return!function(e){return g.includes(e)}(e)&&k.delete(e.toLowerCase())})),t.forEach((function(e){return k.add(e.toLowerCase())}))}function L(e){var t=Array.isArray(e)?e:[e];"meta"===e?k.clear():t.forEach((function(e){return k.delete(e.toLowerCase())}))}function F(e,t){var n=e.target;void 0===t&&(t=!1);var r=n&&n.tagName;return x(t)?Boolean(r&&t&&t.some((function(e){return e.toLowerCase()===r.toLowerCase()}))):Boolean(r&&t&&!0===t)}var S=function(e,t,n){void 0===n&&(n=!1);var r=t.alt,l=t.meta,o=t.mod,c=t.shift,u=t.ctrl,i=t.keys,a=e.key,s=e.code,f=e.ctrlKey,d=e.metaKey,m=e.shiftKey,v=e.altKey,p=y(s),h=a.toLowerCase();if(!(null!=i&&i.includes(p)||null!=i&&i.includes(h)||["ctrl","control","unknown","meta","alt","shift","os"].includes(p)))return!1;if(!n){if(r===!v&&"alt"!==h)return!1;if(c===!m&&"shift"!==h)return!1;if(o){if(!d&&!f)return!1}else{if(l===!d&&"meta"!==h&&"os"!==h)return!1;if(u===!f&&"ctrl"!==h&&"control"!==h)return!1}}return!(!i||1!==i.length||!i.includes(h)&&!i.includes(p))||(i?function(e,t){return void 0===t&&(t=","),(x(e)?e:e.split(t)).every((function(e){return k.has(e.trim().toLowerCase())}))}(i):!i)},N=(0,r.createContext)(void 0);function A(e,t){return e&&t&&"object"==typeof e&&"object"==typeof t?Object.keys(e).length===Object.keys(t).length&&Object.keys(e).reduce((function(n,r){return n&&A(e[r],t[r])}),!0):e===t}var R=(0,r.createContext)({hotkeys:[],enabledScopes:[],toggleScope:function(){},enableScope:function(){},disableScope:function(){}});var P=function(e){e.stopPropagation(),e.preventDefault(),e.stopImmediatePropagation()},j="undefined"!=typeof window?r.useLayoutEffect:r.useEffect;function q(e,t,n,l){var o=(0,r.useRef)(null),c=(0,r.useRef)(!1),u=n instanceof Array?l instanceof Array?void 0:l:n,i=x(e)?e.join(null==u?void 0:u.splitKey):e,a=n instanceof Array?n:l instanceof Array?l:void 0,s=(0,r.useCallback)(t,null!=a?a:[]),f=(0,r.useRef)(s);f.current=a?s:t;var d=function(e){var t=(0,r.useRef)(void 0);return A(t.current,e)||(t.current=e),t.current}(u),m=(0,r.useContext)(R).enabledScopes,v=(0,r.useContext)(N);return j((function(){if(!1!==(null==d?void 0:d.enabled)&&(e=m,t=null==d?void 0:d.scopes,0===e.length&&t?(console.warn('A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>'),1):!t||e.some((function(e){return t.includes(e)}))||e.includes("*"))){var e,t,n=function(e,t){var n;if(void 0===t&&(t=!1),!F(e,["input","textarea","select"])||F(e,null==d?void 0:d.enableOnFormTags)){if(null!==o.current){var r=o.current.getRootNode();if((r instanceof Document||r instanceof ShadowRoot)&&r.activeElement!==o.current&&!o.current.contains(r.activeElement))return void P(e)}(null==(n=e.target)||!n.isContentEditable||null!=d&&d.enableOnContentEditable)&&b(i,null==d?void 0:d.splitKey).forEach((function(n){var r,l=w(n,null==d?void 0:d.combinationKey);if(S(e,l,null==d?void 0:d.ignoreModifiers)||null!=(r=l.keys)&&r.includes("*")){if(null!=d&&null!=d.ignoreEventWhen&&d.ignoreEventWhen(e))return;if(t&&c.current)return;if(function(e,t,n){("function"==typeof n&&n(e,t)||!0===n)&&e.preventDefault()}(e,l,null==d?void 0:d.preventDefault),!function(e,t,n){return"function"==typeof n?n(e,t):!0===n||void 0===n}(e,l,null==d?void 0:d.enabled))return void P(e);f.current(e,l),t||(c.current=!0)}}))}},r=function(e){void 0!==e.key&&(C(y(e.code)),(void 0===(null==d?void 0:d.keydown)&&!0!==(null==d?void 0:d.keyup)||null!=d&&d.keydown)&&n(e))},l=function(e){void 0!==e.key&&(L(y(e.code)),c.current=!1,null!=d&&d.keyup&&n(e,!0))},a=o.current||(null==u?void 0:u.document)||document;return a.addEventListener("keyup",l),a.addEventListener("keydown",r),v&&b(i,null==d?void 0:d.splitKey).forEach((function(e){return v.addHotkey(w(e,null==d?void 0:d.combinationKey,null==d?void 0:d.description))})),function(){a.removeEventListener("keyup",l),a.removeEventListener("keydown",r),v&&b(i,null==d?void 0:d.splitKey).forEach((function(e){return v.removeHotkey(w(e,null==d?void 0:d.combinationKey,null==d?void 0:d.description))}))}}}),[i,d,m]),o}var O=e=>{let{sections:t,activeSectionId:n,onNavigateSection:l,upperContent:o,bottomContent:c}=e;const u=t.findIndex((e=>e.id===n)),i=function(){var e=(0,r.useState)(!1),t=e[0],n=e[1],l=(0,r.useRef)(null);(0,r.useEffect)((function(){var e=function(){n(v.fullscreenElement===l.current)};return v.addEventListener("fullscreenchange",e),function(){return v.removeEventListener("fullscreenchange",e)}}),[]);var o=(0,r.useCallback)((function(){return v.fullscreenElement?v.exitFullscreen().then((function(){return v.requestFullscreen(l.current)})):l.current?v.requestFullscreen(l.current):void 0}),[]),c=(0,r.useCallback)((function(){return v.fullscreenElement===l.current?v.exitFullscreen():Promise.resolve()}),[]);return(0,r.useMemo)((function(){return{active:t,enter:o,exit:c,node:l}}),[t,o,c])}(),{0:a,1:s}=(0,r.useState)(!1),f=(0,r.useCallback)(((e,t)=>{s(e)}),[i]);return q("ArrowRight",(()=>l("next"))),q("Space",(()=>l("next"))),q("Enter",(()=>l("next"))),q("ArrowLeft",(()=>l("prev"))),r.createElement("main",{className:"bg-gray-50 flex-1 p-1 md:p-5 pt-0 w-full"},r.createElement(p,{handle:i,onChange:f},r.createElement("div",{className:"w-full"},t.map((e=>{if(e.id===n)return r.createElement(r.Fragment,null,r.createElement("div",{key:e.id,className:"bg-white shadow-lg rounded p-6 mb-4 w-full min-h-[500px] overflow-y-scroll "+(a?"h-screen":"max-h-[500px]")},r.createElement("div",{className:"flex flex-row align-middle justify-between"},r.createElement("h2",{className:"m-0 mb-4"},e.title),r.createElement("div",{className:"text-right text-sm text-gray-500"},e.duration," mins")),r.createElement("div",{className:"content-section"},e.content)),r.createElement("div",{className:"flex justify-between mt-4"},r.createElement("button",{onClick:i.enter},"Enter fullscreen"),r.createElement("div",{className:""+(a?"fixed bottom-0 right-0 z-[99999] p-2":"")},r.createElement("button",{onClick:()=>l("prev"),className:"px-2 py-1 mr-2 text-sm rounded shadow "+(u>0?"bg-gray-700 text-white hover:bg-gray-900":"bg-gray-100"),disabled:0===u},"Previous"),r.createElement("button",{onClick:()=>l("next"),className:"px-2 py-1 text-sm rounded shadow "+(u<t.length-1?"bg-gray-700 text-white hover:bg-gray-900":"bg-gray-100"),disabled:u===t.length-1},"Next"))))})),c)))},K=n(625);var z=e=>{let{htmlContent:t,upperContent:n,bottomContent:l}=e;const c=(0,u.P)(t),i=c.length>0?c[0].id:"",[a,s]=r.useState(i);return(0,r.useEffect)((()=>{o().highlightAll()}),[a]),r.createElement(r.Fragment,null,r.createElement("div",{className:"flex flex-col h-screen w-full"},r.createElement("div",{className:"lg:min-w-[800px] max-w-[800px] mx-auto"},r.createElement(O,{sections:c,activeSectionId:a,onNavigateSection:e=>{const t=c.findIndex((e=>e.id===a)),n="prev"===e?t-1:t+1;c[n]&&s(c[n].id)},bottomContent:l}),r.createElement("br",null),r.createElement("hr",{className:"hr-full"}),r.createElement(K.Z,null))))};var I=e=>{let{children:t}=e;return r.createElement("div",{className:"px-4"},t)},M=n(4593),B=n(5811);var D=e=>{let{pageContext:t}=e;const{id:n,title:l,subtitle:u,url:i,publishedAt:a,coverImage:s,content:f,seo:d}=t.node;return(0,r.useEffect)((()=>{o().highlightAll()}),[f]),r.createElement(I,null,r.createElement(M.q,null,r.createElement("title",null,`${l.replace("Presentation::","")} | xprilion's blog`),r.createElement("meta",{itemProp:"name",content:`${l.replace("Page::","")} | xprilion's blog`}),r.createElement("meta",{name:"description",content:u}),r.createElement("meta",{property:"og:description",content:u}),r.createElement("meta",{name:"twitter:title",content:`${l.replace("Page::","")} | xprilion's blog`}),r.createElement("meta",{name:"twitter:description",content:u})),r.createElement(B.Z,{closeBtn:!0,title:`${l.replace("Page::","")} | xprilion's blog`}),r.createElement("hr",{className:"hr-full"}),r.createElement(z,{htmlContent:f.html,upperContent:r.createElement(r.Fragment,null,r.createElement("h1",null,l.replace("Presentation::","")),r.createElement("p",{style:{marginTop:"-1rem"}},r.createElement("small",null,(0,c.p)(a))),s&&r.createElement("img",{src:s.url,alt:l})),bottomContent:r.createElement(r.Fragment,null)}))}}}]);
//# sourceMappingURL=component---src-templates-presentations-presentation-tsx-96f3a4d645b80d30fd79.js.map