import {lazy,Component,Fragment,useState,useEffect,Suspense,useMemo,useCallback}from'react';import {css,jsx}from'storybook/theming';import {Placeholder,Link,FlexBar,Separator,Tabs,IconButton}from'storybook/internal/components';import {FigspecFileViewer,FigspecFrameViewer}from'@figspec/react';import {addons,types,useStorybookState,useParameter}from'storybook/manager-api';import {ZoomIcon,ZoomOutIcon,ZoomResetIcon}from'@storybook/icons';var Ce=Object.defineProperty;var U=(e,r)=>()=>(e&&(r=e(e=0)),r);var ke=(e,r)=>{for(var o in r)Ce(e,o,{get:r[o],enumerable:true});};var w,Ie,Le,Ae,A=U(()=>{w=({config:e,defer:r=false})=>{let[o,t]=useState(r?void 0:e.url),[n,a]=useState(false);return useEffect(()=>{if(!r)return;let i=requestAnimationFrame(()=>{t(e.url);});return ()=>cancelAnimationFrame(i)},[r,e.url]),useEffect(()=>{a(false);},[o]),jsx("div",{css:Ie},!n&&jsx(Placeholder,{css:Le},"Loading..."),jsx("iframe",{css:Ae,src:o,allowFullScreen:e.allowFullscreen,onLoad:()=>a(true)}))},Ie=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`,Le=css`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`,Ae=css`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;

  z-index: 1;
`;});function De(e,r){let o=new URL(e);o.hostname=o.hostname.replace(/^www\./,"embed."),o.searchParams.delete("embed_origin"),o.searchParams.set("embed-host",r);for(let[t,n]of o.searchParams)o.searchParams.delete(t),o.searchParams.set(t.replace(/_/g,"-"),n);return o.href}var $,Ue,q,Z=U(()=>{A();$=/https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/,Ue=e=>$.test(e),q=({config:e})=>{let r=useMemo(()=>Ue(e.url)?{url:De(e.url,e.embedHost||location.hostname),allowFullscreen:e.allowFullscreen}:(console.warn(`[storybook-addon-designs] The URL you specified is not valid Figma URL.
The addon fallbacks to normal iframe mode.For more detail, please check <https://www.figma.com/developers/embed>.`),e),[e.url,e.allowFullscreen,e.embedHost]);return jsx(w,{defer:true,config:r})};});var fe={};ke(fe,{Figspec:()=>pe,default:()=>ho});function M(e){return e.status!==200?Promise.reject(e.statusText):e.json()}function go(e){if(e.accessToken)return e.accessToken;try{return process.env.STORYBOOK_FIGMA_ACCESS_TOKEN??null}catch{return null}}function de(e){return "absoluteBoundingBox"in e?[e]:!e.children||e.children.length===0?[]:e.children.map(de).reduce((r,o)=>r.concat(o),[])}var le,pe,ho,ue=U(()=>{Z();le=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;pe=({config:e})=>{let[r,o]=useState({state:"loading"}),t=async n=>{o({state:"loading"});try{let a=e.url.match($);if(!a)throw new Error(e.url+" is not a valid Figma URL.");let[,,i]=a,g=new URL(e.url).searchParams.get("node-id"),v=go(e);if(!v)throw new Error("Personal Access Token is required.");let m={"X-FIGMA-TOKEN":v},l=new URL(`https://api.figma.com/v1/files/${i}`),s=new URL(`https://api.figma.com/v1/images/${i}`);if(s.searchParams.set("format","svg"),!g){let b=await fetch(l.href,{headers:m,signal:n}).then(T=>M(T)),ye=de(b.document);s.searchParams.set("ids",ye.map(T=>T.id).join(","));let we=await fetch(s.href,{headers:m,signal:n}).then(T=>M(T));o({state:"fetched",value:{type:"file",props:{documentNode:b,renderedImages:we.images,link:e.url}}});return}l.pathname+="/nodes",l.searchParams.set("ids",g),s.searchParams.set("ids",g);let[f,S]=await Promise.all([fetch(l.href,{headers:m,signal:n}).then(b=>M(b)),fetch(s.href,{headers:m,signal:n}).then(b=>M(b))]);o({state:"fetched",value:{type:"frame",props:{nodes:f,renderedImage:Object.values(S.images)[0],link:e.url}}});}catch(a){if(a instanceof DOMException&&a.code===DOMException.ABORT_ERR)return;console.error(a),o({state:"failed",error:a instanceof Error?a.message:String(a)});}};switch(useEffect(()=>{let n=false,a=()=>{n=true;},i=new AbortController;return t(i.signal).then(a,a),()=>{n||i.abort();}},[e.url]),r.state){case "loading":return jsx(Placeholder,null,jsx(Fragment,null,"Loading Figma file..."));case "failed":return jsx(Placeholder,null,jsx(Fragment,null,"Failed to load Figma file"),jsx(Fragment,null,r.error));case "fetched":return r.value.type==="file"?jsx(FigspecFileViewer,{css:le,...r.value.props}):jsx(FigspecFrameViewer,{css:le,...r.value.props})}},ho=pe;});var L="STORYBOOK_ADDON_DESIGNS",D=L+"/panel",y="design";var E=class extends Component{state={hasError:false};static getDerivedStateFromError(r){return {hasError:true,error:r}}componentDidCatch(r,o){console.group("An error occurred during rendering Addon panel of storybook-addon-designs"),console.log("--- Error ---"),console.error(r),console.log("--- React Component Stack ---"),console.error(o.componentStack),console.groupEnd();}render(){return this.state.hasError?jsx(Placeholder,null,jsx(Fragment,null,"Failed to render addon UI"),jsx(Fragment,null,jsx("p",null,"Sorry, this addon has crashed due to the below error has thrown during rendering the addon UI."),jsx("pre",null,String(this.state.error)),jsx("p",null,"See console log for more details. To clear the error state, please reload the page."," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs/issues/new?assignees=&labels=category%3A+bug&template=bug_report.yml",target:"_blank",rel:"noopener",withArrow:true,cancel:false},"Bug report")))):this.props.children}};Z();A();var Q=(e,r)=>{let[o,t]=useState([0,0]),[n,a]=useState(false),i=useCallback(s=>{s.button===0&&(t([s.screenX,s.screenY]),a(true));},[a,t]),d=useCallback(s=>{let f=s.touches[0];t([f.screenX,f.screenY]),a(true);},[a,t]),g=useCallback(s=>{n&&t(f=>(e([s[0]-f[0],s[1]-f[1]]),s));},[t,n,...r]),v=useCallback(s=>{let{screenX:f,screenY:S}=s;g([f,S]);},[g]),m=useCallback(s=>{let{screenX:f,screenY:S}=s.touches[0];g([f,S]);},[t,n,...r]),l=useCallback(()=>{t([0,0]),a(false);},[a,t]);return {onMouseDown:i,onMouseMove:v,onMouseUp:l,onMouseLeave:l,onTouchStart:d,onTouchMove:m,onTouchCancel:l,onTouchEnd:l}};var ee=({children:e,className:r,style:o,defaultValue:t,value:n,onChange:a})=>{let[i,d]=useState([0,0]);useEffect(()=>{d(t||n||[0,0]);},[t]);let g=Q(m=>{a&&a(m),d(l=>[l[0]+m[0],l[1]+m[1]]);},[d,a]),v=useMemo(()=>{let m=n||i;return {transform:`translate(${m[0]}px, ${m[1]}px)`}},[n,i]);return jsx("div",{css:Ze,className:r,style:o,...g},jsx("div",{css:_e,style:v},e))};var Ze=css`
  position: relative;
  overflow: hidden;

  &:active {
    cursor: move;
  }
`,_e=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;var oe=({onZoomIn:e,onZoomOut:r,onReset:o})=>jsx(Fragment,null,jsx(IconButton,{onClick:e},jsx(ZoomIcon,null)),jsx(IconButton,{onClick:r},jsx(ZoomOutIcon,null)),jsx(IconButton,{onClick:o},jsx(ZoomResetIcon,null)));var re=(e,r)=>{let[o,t]=useState(1);useEffect(()=>{t(e);},r);let n=useCallback(()=>{t(d=>d+.1);},[t]),a=useCallback(()=>{t(d=>Math.max(d-.1,.1));},[t]),i=useCallback(()=>{t(1);},[t]);return {scale:o,zoomIn:n,zoomOut:a,resetZoom:i}};var te=({config:e})=>{let r=re(e.scale||1,[e.scale]),o=useMemo(()=>({transform:`scale(${r.scale})`}),[r.scale]);return jsx("div",{css:Qe},jsx(FlexBar,{border:true},jsx("div",{style:{display:"grid",gridAutoFlow:"column",gap:"4px",alignItems:"center"}},jsx(Fragment,{key:"left"},jsx("p",null,jsx("b",null,"Image")),jsx(Separator,null),jsx(oe,{onReset:r.resetZoom,onZoomIn:r.zoomIn,onZoomOut:r.zoomOut})))),jsx(ee,{css:xe,defaultValue:e.offset},jsx("img",{css:je,src:e.url,style:o})))};var Qe=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`,xe=css`
  flex-grow: 1;
`,je=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  pointer-events: none;
  border-radius: 1px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;var ae=({config:e})=>jsx("div",{css:ro},jsx(Link,{cancel:false,href:e.url,target:e.target??"_blank",rel:e.rel??"noopener",withArrow:e.showArrow??true},e.label||e.url));var ro=css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;A();var ao=e=>{if(e.protocol!=="https:")return {valid:false,error:jsx(Fragment,null,"Expected HTTPS link, received ",jsx("code",null,e.protocol),".")};if(e.hostname!=="www.sketch.com")return {valid:false,error:jsx(Fragment,null,"Expected a hostname ",jsx("code",null,"www.sketch.com"),", received"," ",jsx("code",null,e.hostname))};let r=jsx(Fragment,null,"Expected pathname ",jsx("code",null,"/s/<string>/a/<string>"),", received"," ",jsx("code",null,e.pathname),"."),o=e.pathname.split("/").slice(1);if(o.length<4)return {valid:false,error:r};if(o[0]==="embed")return {valid:true,data:{url:e.href,offscreen:false}};let[t,n,a,i]=o;return t!=="s"||!n||a!=="a"||!i?{valid:false,error:r}:{valid:true,data:{url:`https://www.sketch.com/embed/s/${n}/a/${i}`,offscreen:false}}},se=({config:e})=>{let r=useMemo(()=>{let o=ao(new URL(e.url));return o.valid?{...o,data:{...e,...o.data}}:o},[e]);return r.valid?jsx(w,{defer:true,config:r.data}):jsx(Placeholder,null,jsx(Fragment,null,"Invalid Sketch URL"),jsx(Fragment,null,r.error))};var ce=({tabs:e,deps:r=[]})=>{let[o,t]=useState(e[0].id);return useEffect(()=>{t(e[0].id);},r),jsx(Tabs,{absolute:true,selected:o,actions:{onSelect:t}},e.map(n=>jsx("div",{key:n.id,id:n.id,title:n.name},n.offscreen||o===n.id?n.content:null)))};var vo=lazy(()=>Promise.resolve().then(()=>(ue(),fe))),Pe=({config:e})=>{if(!e||"length"in e&&e.length===0)return jsx(Placeholder,null,jsx(Fragment,null,"No designs found"),jsx(Fragment,null,"Learn how to"," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs#3-add-it-to-story",target:"_blank",rel:"noopener",withArrow:true,cancel:false},"display design preview for the story")));let r=[...e instanceof Array?e:[e]].map(o=>{let t={id:JSON.stringify(o),name:o.name||o.type?.toUpperCase()||"ERROR",offscreen:o.offscreen??true};switch(o.type){case "iframe":return {...t,content:jsx(w,{config:o})};case "figma":return {...t,content:jsx(q,{config:o}),offscreen:false};case "sketch":return {...t,content:jsx(se,{config:o})};case "figspec":case "experimental-figspec":return o.type==="experimental-figspec"&&console.warn("[storybook-addon-designs] `experimental-figspec` is deprecated. We will remove it in v7.0. Please replace it to `figspec` type."),{...t,content:jsx(Suspense,{fallback:"Preparing Figspec viewer..."},jsx(vo,{config:o})),offscreen:false};case "image":return {...t,content:jsx(te,{config:o})};case "link":return {...t,content:jsx(ae,{config:o})}}return {...t,content:jsx(Placeholder,null,jsx(Fragment,null,"Invalid config type"),jsx(Fragment,null,"Config type you set is not supported. Please choose one from"," ",jsx(Link,{href:"https://github.com/storybookjs/addon-designs/blob/master/packages/storybook-addon-designs/src/config.ts",target:"_blank",rel:"noopener",withArrow:true,cancel:false},"available config types")))}});return r.length===1?jsx("div",null,r[0].content):jsx(ce,{tabs:r,deps:[e]})};var K=({active:e})=>{let r=useStorybookState(),o=useParameter(y),[t,n]=useState(e);return useEffect(()=>{n(e);},[o]),useEffect(()=>{e&&n(true);},[e]),t?jsx(Pe,{key:r.storyId,config:o}):null};var I="Design";function be(e){addons.register(L,r=>{addons.add(D,{title:I,render({active:t}){return t?jsx(E,null,jsx(K,{active:true})):jsx("noscript",null)},type:types.TAB,paramKey:y});});}be();//# sourceMappingURL=register-tab.mjs.map
//# sourceMappingURL=register-tab.mjs.map