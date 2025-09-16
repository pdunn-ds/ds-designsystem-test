'use strict';var d=require('react'),theming=require('storybook/theming'),components=require('storybook/internal/components'),react=require('@figspec/react'),blocks=require('@storybook/addon-docs/blocks');function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null);if(e){Object.keys(e).forEach(function(k){if(k!=='default'){var d=Object.getOwnPropertyDescriptor(e,k);Object.defineProperty(n,k,d.get?d:{enumerable:true,get:function(){return e[k]}});}})}n.default=e;return Object.freeze(n)}var d__namespace=/*#__PURE__*/_interopNamespace(d);var u0=Object.defineProperty;var k=(e,t)=>()=>(e&&(t=e(e=0)),t);var E0=(e,t)=>{for(var a in t)u0(e,a,{get:t[a],enumerable:true});};var u,z0,x0,I0,H=k(()=>{u=({config:e,defer:t=false})=>{let[a,l]=d.useState(t?void 0:e.url),[r,n]=d.useState(false);return d.useEffect(()=>{if(!t)return;let o=requestAnimationFrame(()=>{l(e.url);});return ()=>cancelAnimationFrame(o)},[t,e.url]),d.useEffect(()=>{n(false);},[a]),theming.jsx("div",{css:z0},!r&&theming.jsx(components.Placeholder,{css:x0},"Loading..."),theming.jsx("iframe",{css:I0,src:a,allowFullScreen:e.allowFullscreen,onLoad:()=>n(true)}))},z0=theming.css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`,x0=theming.css`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,I0=theming.css`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;

  z-index: 1;
`;});function B0(e,t){let a=new URL(e);a.hostname=a.hostname.replace(/^www\./,"embed."),a.searchParams.delete("embed_origin"),a.searchParams.set("embed-host",t);for(let[l,r]of a.searchParams)a.searchParams.delete(l),a.searchParams.set(l.replace(/_/g,"-"),r);return a.href}var T,L0,A,V=k(()=>{H();T=/https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/,L0=e=>T.test(e),A=({config:e})=>{let t=d.useMemo(()=>L0(e.url)?{url:B0(e.url,e.embedHost||location.hostname),allowFullscreen:e.allowFullscreen}:(console.warn(`[storybook-addon-designs] The URL you specified is not valid Figma URL.
The addon fallbacks to normal iframe mode.For more detail, please check <https://www.figma.com/developers/embed>.`),e),[e.url,e.allowFullscreen,e.embedHost]);return theming.jsx(u,{defer:true,config:t})};});var X={};E0(X,{Figspec:()=>S,default:()=>y0});function P(e){return e.status!==200?Promise.reject(e.statusText):e.json()}function b0(e){if(e.accessToken)return e.accessToken;try{return process.env.STORYBOOK_FIGMA_ACCESS_TOKEN??null}catch{return null}}function K(e){return "absoluteBoundingBox"in e?[e]:!e.children||e.children.length===0?[]:e.children.map(K).reduce((t,a)=>t.concat(a),[])}var Y,S,y0,O=k(()=>{V();Y=theming.css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;S=({config:e})=>{let[t,a]=d.useState({state:"loading"}),l=async r=>{a({state:"loading"});try{let n=e.url.match(T);if(!n)throw new Error(e.url+" is not a valid Figma URL.");let[,,o]=n,R=new URL(e.url).searchParams.get("node-id"),g=b0(e);if(!g)throw new Error("Personal Access Token is required.");let i={"X-FIGMA-TOKEN":g},w=new URL(`https://api.figma.com/v1/files/${o}`),c=new URL(`https://api.figma.com/v1/images/${o}`);if(c.searchParams.set("format","svg"),!R){let z=await fetch(w.href,{headers:i,signal:r}).then(C=>P(C)),p0=K(z.document);c.searchParams.set("ids",p0.map(C=>C.id).join(","));let g0=await fetch(c.href,{headers:i,signal:r}).then(C=>P(C));a({state:"fetched",value:{type:"file",props:{documentNode:z,renderedImages:g0.images,link:e.url}}});return}w.pathname+="/nodes",w.searchParams.set("ids",R),c.searchParams.set("ids",R);let[s,I]=await Promise.all([fetch(w.href,{headers:i,signal:r}).then(z=>P(z)),fetch(c.href,{headers:i,signal:r}).then(z=>P(z))]);a({state:"fetched",value:{type:"frame",props:{nodes:s,renderedImage:Object.values(I.images)[0],link:e.url}}});}catch(n){if(n instanceof DOMException&&n.code===DOMException.ABORT_ERR)return;console.error(n),a({state:"failed",error:n instanceof Error?n.message:String(n)});}};switch(d.useEffect(()=>{let r=false,n=()=>{r=true;},o=new AbortController;return l(o.signal).then(n,n),()=>{r||o.abort();}},[e.url]),t.state){case "loading":return theming.jsx(components.Placeholder,null,theming.jsx(d.Fragment,null,"Loading Figma file..."));case "failed":return theming.jsx(components.Placeholder,null,theming.jsx(d.Fragment,null,"Failed to load Figma file"),theming.jsx(d.Fragment,null,t.error));case "fetched":return t.value.type==="file"?theming.jsx(react.FigspecFileViewer,{css:Y,...t.value.props}):theming.jsx(react.FigspecFrameViewer,{css:Y,...t.value.props})}},y0=S;});V();O();H();var Q=(e,t)=>{let[a,l]=d.useState([0,0]),[r,n]=d.useState(false),o=d.useCallback(c=>{c.button===0&&(l([c.screenX,c.screenY]),n(true));},[n,l]),h=d.useCallback(c=>{let s=c.touches[0];l([s.screenX,s.screenY]),n(true);},[n,l]),R=d.useCallback(c=>{r&&l(s=>(e([c[0]-s[0],c[1]-s[1]]),c));},[l,r,...t]),g=d.useCallback(c=>{let{screenX:s,screenY:I}=c;R([s,I]);},[R]),i=d.useCallback(c=>{let{screenX:s,screenY:I}=c.touches[0];R([s,I]);},[l,r,...t]),w=d.useCallback(()=>{l([0,0]),n(false);},[n,l]);return {onMouseDown:o,onMouseMove:g,onMouseUp:w,onMouseLeave:w,onTouchStart:h,onTouchMove:i,onTouchCancel:w,onTouchEnd:w}};var t0=({children:e,className:t,style:a,defaultValue:l,value:r,onChange:n})=>{let[o,h]=d.useState([0,0]);d.useEffect(()=>{h(l||r||[0,0]);},[l]);let R=Q(i=>{n&&n(i),h(w=>[w[0]+i[0],w[1]+i[1]]);},[h,n]),g=d.useMemo(()=>{let i=r||o;return {transform:`translate(${i[0]}px, ${i[1]}px)`}},[r,o]);return theming.jsx("div",{css:T0,className:t,style:a,...R},theming.jsx("div",{css:U0,style:g},e))};var T0=theming.css`
  position: relative;
  overflow: hidden;

  &:active {
    cursor: move;
  }
`,U0=theming.css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;var a0=d__namespace.forwardRef(({color:e="currentColor",size:t=14,...a},l)=>d__namespace.createElement("svg",{width:t,height:t,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:l,...a},d__namespace.createElement("path",{d:"M6 3.5a.5.5 0 01.5.5v1.5H8a.5.5 0 010 1H6.5V8a.5.5 0 01-1 0V6.5H4a.5.5 0 010-1h1.5V4a.5.5 0 01.5-.5z",fill:e}),d__namespace.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9.544 10.206a5.5 5.5 0 11.662-.662.5.5 0 01.148.102l3 3a.5.5 0 01-.708.708l-3-3a.5.5 0 01-.102-.148zM10.5 6a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z",fill:e}))),l0=d__namespace.forwardRef(({color:e="currentColor",size:t=14,...a},l)=>d__namespace.createElement("svg",{width:t,height:t,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:l,...a},d__namespace.createElement("path",{d:"M4 5.5a.5.5 0 000 1h4a.5.5 0 000-1H4z",fill:e}),d__namespace.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 11.5c1.35 0 2.587-.487 3.544-1.294a.5.5 0 00.102.148l3 3a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.148-.102A5.5 5.5 0 106 11.5zm0-1a4.5 4.5 0 100-9 4.5 4.5 0 000 9z",fill:e}))),r0=d__namespace.forwardRef(({color:e="currentColor",size:t=14,...a},l)=>d__namespace.createElement("svg",{width:t,height:t,viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:l,...a},d__namespace.createElement("path",{d:"M1.5 2.837V1.5a.5.5 0 00-1 0V4a.5.5 0 00.5.5h2.5a.5.5 0 000-1H2.258a4.5 4.5 0 11-.496 4.016.5.5 0 10-.942.337 5.502 5.502 0 008.724 2.353.5.5 0 00.102.148l3 3a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.148-.102A5.5 5.5 0 101.5 2.837z",fill:e})));var n0=({onZoomIn:e,onZoomOut:t,onReset:a})=>theming.jsx(d.Fragment,null,theming.jsx(components.IconButton,{onClick:e},theming.jsx(a0,null)),theming.jsx(components.IconButton,{onClick:t},theming.jsx(l0,null)),theming.jsx(components.IconButton,{onClick:a},theming.jsx(r0,null)));var o0=(e,t)=>{let[a,l]=d.useState(1);d.useEffect(()=>{l(e);},t);let r=d.useCallback(()=>{l(h=>h+.1);},[l]),n=d.useCallback(()=>{l(h=>Math.max(h-.1,.1));},[l]),o=d.useCallback(()=>{l(1);},[l]);return {scale:a,zoomIn:r,zoomOut:n,resetZoom:o}};var F=({config:e})=>{let t=o0(e.scale||1,[e.scale]),a=d.useMemo(()=>({transform:`scale(${t.scale})`}),[t.scale]);return theming.jsx("div",{css:Y0},theming.jsx(components.FlexBar,{border:true},theming.jsx("div",{style:{display:"grid",gridAutoFlow:"column",gap:"4px",alignItems:"center"}},theming.jsx(d.Fragment,{key:"left"},theming.jsx("p",null,theming.jsx("b",null,"Image")),theming.jsx(components.Separator,null),theming.jsx(n0,{onReset:t.resetZoom,onZoomIn:t.zoomIn,onZoomOut:t.zoomOut})))),theming.jsx(t0,{css:K0,defaultValue:e.offset},theming.jsx("img",{css:X0,src:e.url,style:a})))};var Y0=theming.css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`,K0=theming.css`
  flex-grow: 1;
`,X0=theming.css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  pointer-events: none;
  border-radius: 1px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;V();H();var i0=({config:e})=>theming.jsx("div",{css:j0},theming.jsx(components.Link,{cancel:false,href:e.url,target:e.target??"_blank",rel:e.rel??"noopener",withArrow:e.showArrow??true},e.label||e.url));var j0=theming.css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;H();var a1=e=>{if(e.protocol!=="https:")return {valid:false,error:theming.jsx(d.Fragment,null,"Expected HTTPS link, received ",theming.jsx("code",null,e.protocol),".")};if(e.hostname!=="www.sketch.com")return {valid:false,error:theming.jsx(d.Fragment,null,"Expected a hostname ",theming.jsx("code",null,"www.sketch.com"),", received"," ",theming.jsx("code",null,e.hostname))};let t=theming.jsx(d.Fragment,null,"Expected pathname ",theming.jsx("code",null,"/s/<string>/a/<string>"),", received"," ",theming.jsx("code",null,e.pathname),"."),a=e.pathname.split("/").slice(1);if(a.length<4)return {valid:false,error:t};if(a[0]==="embed")return {valid:true,data:{url:e.href,offscreen:false}};let[l,r,n,o]=a;return l!=="s"||!r||n!=="a"||!o?{valid:false,error:t}:{valid:true,data:{url:`https://www.sketch.com/embed/s/${r}/a/${o}`,offscreen:false}}},h0=({config:e})=>{let t=d.useMemo(()=>{let a=a1(new URL(e.url));return a.valid?{...a,data:{...e,...a.data}}:a},[e]);return t.valid?theming.jsx(u,{defer:true,config:t.data}):theming.jsx(components.Placeholder,null,theming.jsx(d.Fragment,null,"Invalid Sketch URL"),theming.jsx(d.Fragment,null,t.error))};var d0=({tabs:e,deps:t=[]})=>{let[a,l]=d.useState(e[0].id);return d.useEffect(()=>{l(e[0].id);},t),theming.jsx(components.Tabs,{absolute:true,selected:a,actions:{onSelect:l}},e.map(r=>theming.jsx("div",{key:r.id,id:r.id,title:r.name},r.offscreen||a===r.id?r.content:null)))};var i1=d.lazy(()=>Promise.resolve().then(()=>(O(),X))),m0=({config:e})=>{if(!e||"length"in e&&e.length===0)return theming.jsx(components.Placeholder,null,theming.jsx(d.Fragment,null,"No designs found"),theming.jsx(d.Fragment,null,"Learn how to"," ",theming.jsx(components.Link,{href:"https://github.com/storybookjs/addon-designs#3-add-it-to-story",target:"_blank",rel:"noopener",withArrow:true,cancel:false},"display design preview for the story")));let t=[...e instanceof Array?e:[e]].map(a=>{let l={id:JSON.stringify(a),name:a.name||a.type?.toUpperCase()||"ERROR",offscreen:a.offscreen??true};switch(a.type){case "iframe":return {...l,content:theming.jsx(u,{config:a})};case "figma":return {...l,content:theming.jsx(A,{config:a}),offscreen:false};case "sketch":return {...l,content:theming.jsx(h0,{config:a})};case "figspec":case "experimental-figspec":return a.type==="experimental-figspec"&&console.warn("[storybook-addon-designs] `experimental-figspec` is deprecated. We will remove it in v7.0. Please replace it to `figspec` type."),{...l,content:theming.jsx(d.Suspense,{fallback:"Preparing Figspec viewer..."},theming.jsx(i1,{config:a})),offscreen:false};case "image":return {...l,content:theming.jsx(F,{config:a})};case "link":return {...l,content:theming.jsx(i0,{config:a})}}return {...l,content:theming.jsx(components.Placeholder,null,theming.jsx(d.Fragment,null,"Invalid config type"),theming.jsx(d.Fragment,null,"Config type you set is not supported. Please choose one from"," ",theming.jsx(components.Link,{href:"https://github.com/storybookjs/addon-designs/blob/master/packages/storybook-addon-designs/src/config.ts",target:"_blank",rel:"noopener",withArrow:true,cancel:false},"available config types")))}});return t.length===1?theming.jsx("div",null,t[0].content):theming.jsx(d0,{tabs:t,deps:[e]})};var s0="design";var w1=theming.styled.div(({theme:e})=>`
  font-family: ${e.typography.fonts.base};
  font-size: ${e.typography.size.s3}px;
  margin: 0;
`),m1=theming.styled.div(({theme:e,height:t="60%",collapsed:a})=>`
  position: relative;
  width: 100%;
  height: 0;
  padding: 0;
  padding-top: ${a?"3em":typeof t=="string"?t:t+"px"};
  margin: 25px 0 40px;
  border: 1px solid ${e.appBorderColor};

  border-radius: ${e.appBorderRadius}px;
  box-shadow:
    ${e.base==="light"?"rgba(0, 0, 0, 0.10) 0 1px 3px 0":"rgba(0, 0, 0, 0.20) 0 2px 5px 0"};
`),R1=theming.styled(components.Placeholder)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,B=({children:e,collapsable:t=true,defaultCollapsed:a=false,placeholder:l,showLink:r=true,onCollapsedChange:n,...o})=>{let[h,R]=d.useState(!!a),g=r&&"url"in o;return d__namespace.default.createElement(w1,null,d__namespace.default.createElement(m1,{collapsed:t&&h,...o},t&&h?d__namespace.default.createElement(R1,null,l):e,d__namespace.default.createElement(components.ActionBar,{actionItems:[t&&{title:h?"Show":"Hide",onClick:()=>{let i=!h;n&&n(i,h),R(i);}},g&&{title:"Open in new tab",onClick:()=>window.open(o.url,"_blank")}].filter(i=>!!i)})))},oe=({placeholder:e,...t})=>d__namespace.default.createElement(B,{placeholder:e??"Design (Figma)",...t},d__namespace.default.createElement(A,{config:{type:"figma",...t}})),ce=({placeholder:e,...t})=>d__namespace.default.createElement(B,{placeholder:e??"Design (Figma-Spec)",...t},d__namespace.default.createElement(S,{config:{type:"figspec",...t}})),ie=({placeholder:e,...t})=>d__namespace.default.createElement(B,{placeholder:e??"Design (iframe)",...t},d__namespace.default.createElement(u,{config:t})),he=({placeholder:e,...t})=>d__namespace.default.createElement(B,{placeholder:e??"Design (Image)",...t},d__namespace.default.createElement(F,{config:{type:"image",...t}})),s1=theming.styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: auto;
`,ve=e=>{let{of:t,placeholder:a,...l}=e;if("of"in e&&t===void 0)throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");let{story:r}=blocks.useOf(t||"story",["story"]);return d__namespace.default.createElement(B,{placeholder:a??"Design",...l},d__namespace.default.createElement(s1,null,d__namespace.default.createElement(m0,{config:r.parameters[s0]})))};exports.Design=ve;exports.DocBlockBase=B;exports.Figma=oe;exports.Figspec=ce;exports.IFrame=ie;exports.Image=he;//# sourceMappingURL=blocks.js.map
//# sourceMappingURL=blocks.js.map