import{aV as U,g as E,aO as Xe,aR as Ue,M as N,aP as pe,p as y,aW as Ye,Q as Ke,l as v,_ as h,n as A,b as u,aX as V,aA as ke,aY as ce,aZ as Qe,a_ as Ge,a$ as Ze,aL as L,t as we,aQ as Je,aa as xe,b0 as te,R as Y,ao as ne,s as z,r as ae,h as q,ap as et,v as Ee,Z as Le,T as de,U as tt,F as Pe,ar as nt,a3 as ve,K as Te,m as se,e as ie,b1 as at,b2 as st,b3 as it,a4 as $e,u as rt,a1 as fe,aj as Be,b4 as ot,b5 as me,aE as ge,L as lt,q as ut,b6 as ct,b7 as he}from"./app-D4do6SPm.js";const Re=["top","bottom"],dt=["start","end","left","right"];function vt(e,t){let[n,a]=e.split(" ");return a||(a=U(Re,n)?"start":U(dt,n)?"top":"center"),{side:be(n,t),align:be(a,t)}}function be(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function Kt(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function Qt(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Gt(e){return{side:e.align,align:e.side}}function Zt(e){return U(Re,e.side)?"y":"x"}function Jt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",n=arguments.length>2?arguments[2]:void 0;return E()({name:n??Xe(Ue(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...N()},setup(a,i){let{slots:s}=i;return()=>{var r;return pe(a.tag,{class:[e,a.class],style:a.style},(r=s.default)==null?void 0:r.call(s))}}})}const re=y({tag:{type:String,default:"div"}},"tag"),ft=y({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),mt=E(!1)({name:"VDefaultsProvider",props:ft(),setup(e,t){let{slots:n}=t;const{defaults:a,disabled:i,reset:s,root:r,scoped:o}=Ye(e);return Ke(a,{reset:s,root:r,scoped:o,disabled:i}),()=>{var l;return(l=n.default)==null?void 0:l.call(n)}}}),gt=y({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function ht(e){return{dimensionStyles:v(()=>{const n={},a=h(e.height),i=h(e.maxHeight),s=h(e.maxWidth),r=h(e.minHeight),o=h(e.minWidth),l=h(e.width);return a!=null&&(n.height=a),i!=null&&(n.maxHeight=i),s!=null&&(n.maxWidth=s),r!=null&&(n.minHeight=r),o!=null&&(n.minWidth=o),l!=null&&(n.width=l),n})}}function bt(e){return{aspectStyles:v(()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0})}}const ze=y({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...N(),...gt()},"VResponsive"),ye=E()({name:"VResponsive",props:ze(),setup(e,t){let{slots:n}=t;const{aspectStyles:a}=bt(e),{dimensionStyles:i}=ht(e);return A(()=>{var s;return u("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[i.value,e.style]},[u("div",{class:"v-responsive__sizer",style:a.value},null),(s=n.additional)==null?void 0:s.call(n),n.default&&u("div",{class:["v-responsive__content",e.contentClass]},[n.default()])])}),{}}});function oe(e){return ke(()=>{const t=[],n={};if(e.value.background)if(ce(e.value.background)){if(n.backgroundColor=e.value.background,!e.value.text&&Qe(e.value.background)){const a=Ge(e.value.background);if(a.a==null||a.a===1){const i=Ze(a);n.color=i,n.caretColor=i}}}else t.push(`bg-${e.value.background}`);return e.value.text&&(ce(e.value.text)?(n.color=e.value.text,n.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:n}})}function Ve(e,t){const n=v(()=>({text:V(e)?e.value:t?e[t]:null})),{colorClasses:a,colorStyles:i}=oe(n);return{textColorClasses:a,textColorStyles:i}}function X(e,t){const n=v(()=>({background:V(e)?e.value:t?e[t]:null})),{colorClasses:a,colorStyles:i}=oe(n);return{backgroundColorClasses:a,backgroundColorStyles:i}}const le=y({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded");function ue(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();return{roundedClasses:v(()=>{const a=V(e)?e.value:e.rounded,i=V(e)?e.value:e.tile,s=[];if(a===!0||a==="")s.push(`${t}--rounded`);else if(typeof a=="string"||a===0)for(const r of String(a).split(" "))s.push(`rounded-${r}`);else(i||a===!1)&&s.push("rounded-0");return s})}}const yt=y({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),M=(e,t)=>{let{slots:n}=t;const{transition:a,disabled:i,group:s,...r}=e,{component:o=s?Je:xe,...l}=typeof a=="object"?a:{};return pe(o,we(typeof a=="string"?{name:i?"":a}:l,typeof a=="string"?{}:Object.fromEntries(Object.entries({disabled:i,group:s}).filter(c=>{let[d,g]=c;return g!==void 0})),r),n)};function _t(e,t){if(!te)return;const n=t.modifiers||{},a=t.value,{handler:i,options:s}=typeof a=="object"?a:{handler:a,options:{}},r=new IntersectionObserver(function(){var g;let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1?arguments[1]:void 0;const c=(g=e._observe)==null?void 0:g[t.instance.$.uid];if(!c)return;const d=o.some(b=>b.isIntersecting);i&&(!n.quiet||c.init)&&(!n.once||d||c.init)&&i(d,o,l),d&&n.once?Ne(e,t):c.init=!0},s);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:r},r.observe(e)}function Ne(e,t){var a;const n=(a=e._observe)==null?void 0:a[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const St={mounted:_t,unmounted:Ne},Ct=y({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...ze(),...N(),...le(),...yt()},"VImg"),pt=E()({name:"VImg",directives:{intersect:St},props:Ct(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:n,slots:a}=t;const{backgroundColorClasses:i,backgroundColorStyles:s}=X(Y(e,"color")),{roundedClasses:r}=ue(e),o=ne("VImg"),l=z(""),c=ae(),d=z(e.eager?"loading":"idle"),g=z(),b=z(),f=v(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),S=v(()=>f.value.aspect||g.value/b.value||0);q(()=>e.src,()=>{w(d.value!=="idle")}),q(S,(m,_)=>{!m&&_&&c.value&&p(c.value)}),et(()=>w());function w(m){if(!(e.eager&&m)&&!(te&&!m&&!e.eager)){if(d.value="loading",f.value.lazySrc){const _=new Image;_.src=f.value.lazySrc,p(_,null)}f.value.src&&Ee(()=>{var _;n("loadstart",((_=c.value)==null?void 0:_.currentSrc)||f.value.src),setTimeout(()=>{var k;if(!o.isUnmounted)if((k=c.value)!=null&&k.complete){if(c.value.naturalWidth||P(),d.value==="error")return;S.value||p(c.value,null),d.value==="loading"&&H()}else S.value||p(c.value),W()})})}}function H(){var m;o.isUnmounted||(W(),p(c.value),d.value="loaded",n("load",((m=c.value)==null?void 0:m.currentSrc)||f.value.src))}function P(){var m;o.isUnmounted||(d.value="error",n("error",((m=c.value)==null?void 0:m.currentSrc)||f.value.src))}function W(){const m=c.value;m&&(l.value=m.currentSrc||m.src)}let x=-1;Le(()=>{clearTimeout(x)});function p(m){let _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const k=()=>{if(clearTimeout(x),o.isUnmounted)return;const{naturalHeight:R,naturalWidth:j}=m;R||j?(g.value=j,b.value=R):!m.complete&&d.value==="loading"&&_!=null?x=window.setTimeout(k,_):(m.currentSrc.endsWith(".svg")||m.currentSrc.startsWith("data:image/svg+xml"))&&(g.value=1,b.value=1)};k()}const T=v(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),D=()=>{var k;if(!f.value.src||d.value==="idle")return null;const m=u("img",{class:["v-img__img",T.value],style:{objectPosition:e.position},crossorigin:e.crossorigin,src:f.value.src,srcset:f.value.srcset,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:c,onLoad:H,onError:P},null),_=(k=a.sources)==null?void 0:k.call(a);return u(M,{transition:e.transition,appear:!0},{default:()=>[de(_?u("picture",{class:"v-img__picture"},[_,m]):m,[[nt,d.value==="loaded"]])]})},$=()=>u(M,{transition:e.transition},{default:()=>[f.value.lazySrc&&d.value!=="loaded"&&u("img",{class:["v-img__img","v-img__img--preload",T.value],style:{objectPosition:e.position},crossorigin:e.crossorigin,src:f.value.lazySrc,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),Q=()=>a.placeholder?u(M,{transition:e.transition,appear:!0},{default:()=>[(d.value==="loading"||d.value==="error"&&!a.error)&&u("div",{class:"v-img__placeholder"},[a.placeholder()])]}):null,B=()=>a.error?u(M,{transition:e.transition,appear:!0},{default:()=>[d.value==="error"&&u("div",{class:"v-img__error"},[a.error()])]}):null,G=()=>e.gradient?u("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,I=z(!1);{const m=q(S,_=>{_&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{I.value=!0})}),m())})}return A(()=>{const m=ye.filterProps(e);return de(u(ye,we({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!I.value},i.value,r.value,e.class],style:[{width:h(e.width==="auto"?g.value:e.width)},s.value,e.style]},m,{aspectRatio:S.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>u(Pe,null,[u(D,null,null),u($,null,null),u(G,null,null),u(Q,null,null),u(B,null,null)]),default:a.default}),[[tt("intersect"),{handler:w,options:e.options},null,{once:!0}]])}),{currentSrc:l,image:c,state:d,naturalWidth:g,naturalHeight:b}}}),kt=y({border:[Boolean,Number,String]},"border");function wt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();return{borderClasses:v(()=>{const a=V(e)?e.value:e.border,i=[];if(a===!0||a==="")i.push(`${t}--border`);else if(typeof a=="string"||a===0)for(const s of String(a).split(" "))i.push(`border-${s}`);return i})}}const en=y({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function tn(e){return{elevationClasses:v(()=>{const n=V(e)?e.value:e.elevation,a=[];return n==null||a.push(`elevation-${n}`),a})}}const xt=[null,"default","comfortable","compact"],Et=y({density:{type:String,default:"default",validator:e=>xt.includes(e)}},"density");function Lt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();return{densityClasses:v(()=>`${t}--density-${e.density}`)}}const Pt=["elevated","flat","tonal","outlined","text","plain"];function Tt(e,t){return u(Pe,null,[e&&u("span",{key:"overlay",class:`${t}__overlay`},null),u("span",{key:"underlay",class:`${t}__underlay`},null)])}const $t=y({color:String,variant:{type:String,default:"elevated",validator:e=>Pt.includes(e)}},"variant");function Bt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();const n=v(()=>{const{variant:s}=ve(e);return`${t}--variant-${s}`}),{colorClasses:a,colorStyles:i}=oe(v(()=>{const{variant:s,color:r}=ve(e);return{[["elevated","flat"].includes(s)?"background":"text"]:r}}));return{colorClasses:a,colorStyles:i,variantClasses:n}}const Rt=["x-small","small","default","large","x-large"],Ie=y({size:{type:[String,Number],default:"default"}},"size");function Oe(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();return ke(()=>{let n,a;return U(Rt,e.size)?n=`${t}--size-${e.size}`:e.size&&(a={width:h(e.size),height:h(e.size)}),{sizeClasses:n,sizeStyles:a}})}const zt=y({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:Te,...N(),...Ie(),...re({tag:"i"}),...se()},"VIcon"),Vt=E()({name:"VIcon",props:zt(),setup(e,t){let{attrs:n,slots:a}=t;const i=ae(),{themeClasses:s}=ie(e),{iconData:r}=at(v(()=>i.value||e.icon)),{sizeClasses:o}=Oe(e),{textColorClasses:l,textColorStyles:c}=Ve(Y(e,"color"));return A(()=>{var b,f;const d=(b=a.default)==null?void 0:b.call(a);d&&(i.value=(f=st(d).filter(S=>S.type===it&&S.children&&typeof S.children=="string")[0])==null?void 0:f.children);const g=!!(n.onClick||n.onClickOnce);return u(r.value.component,{tag:e.tag,icon:r.value.icon,class:["v-icon","notranslate",s.value,o.value,l.value,{"v-icon--clickable":g,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[o.value?void 0:{fontSize:h(e.size),height:h(e.size),width:h(e.size)},c.value,e.style],role:g?"button":void 0,"aria-hidden":!g,tabindex:g?e.disabled?-1:0:void 0},{default:()=>[d]})}),{}}});function Nt(e,t){const n=ae(),a=z(!1);if(te){const i=new IntersectionObserver(s=>{a.value=!!s.find(r=>r.isIntersecting)},t);Le(()=>{i.disconnect()}),q(n,(s,r)=>{r&&(i.unobserve(r),a.value=!1),s&&i.observe(s)},{flush:"post"})}return{intersectionRef:n,isIntersecting:a}}const _e={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},It=y({location:String},"location");function Ot(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2?arguments[2]:void 0;const{isRtl:a}=$e();return{locationStyles:v(()=>{if(!e.location)return{};const{side:s,align:r}=vt(e.location.split(" ").length>1?e.location:`${e.location} center`,a.value);function o(c){return n?n(c):0}const l={};return s!=="center"&&(t?l[_e[s]]=`calc(100% - ${o(s)}px)`:l[s]=0),r!=="center"?t?l[_e[r]]=`calc(100% - ${o(r)}px)`:l[r]=0:(s==="center"?l.top=l.left="50%":l[{top:"left",bottom:"left",left:"top",right:"top"}[s]]="50%",l.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[s]),l})}}const Ft=y({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...N(),...It({location:"top"}),...le(),...re(),...se()},"VProgressLinear"),At=E()({name:"VProgressLinear",props:Ft(),emits:{"update:modelValue":e=>!0},setup(e,t){var I;let{slots:n}=t;const a=rt(e,"modelValue"),{isRtl:i,rtlClasses:s}=$e(),{themeClasses:r}=ie(e),{locationStyles:o}=Ot(e),{textColorClasses:l,textColorStyles:c}=Ve(e,"color"),{backgroundColorClasses:d,backgroundColorStyles:g}=X(v(()=>e.bgColor||e.color)),{backgroundColorClasses:b,backgroundColorStyles:f}=X(v(()=>e.bufferColor||e.bgColor||e.color)),{backgroundColorClasses:S,backgroundColorStyles:w}=X(e,"color"),{roundedClasses:H}=ue(e),{intersectionRef:P,isIntersecting:W}=Nt(),x=v(()=>parseFloat(e.max)),p=v(()=>parseFloat(e.height)),T=v(()=>fe(parseFloat(e.bufferValue)/x.value*100,0,100)),D=v(()=>fe(parseFloat(a.value)/x.value*100,0,100)),$=v(()=>i.value!==e.reverse),Q=v(()=>e.indeterminate?"fade-transition":"slide-x-transition"),B=Be&&((I=window.matchMedia)==null?void 0:I.call(window,"(forced-colors: active)").matches);function G(m){if(!P.value)return;const{left:_,right:k,width:R}=P.value.getBoundingClientRect(),j=$.value?R-m.clientX+(k-R):m.clientX-_;a.value=Math.round(j/R*x.value)}return A(()=>u(e.tag,{ref:P,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&W.value,"v-progress-linear--reverse":$.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},H.value,r.value,s.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?h(p.value):0,"--v-progress-linear-height":h(p.value),...e.absolute?o.value:{}},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:Math.min(parseFloat(a.value),x.value),onClick:e.clickable&&G},{default:()=>[e.stream&&u("div",{key:"stream",class:["v-progress-linear__stream",l.value],style:{...c.value,[$.value?"left":"right"]:h(-p.value),borderTop:`${h(p.value/2)} dotted`,opacity:parseFloat(e.bufferOpacity),top:`calc(50% - ${h(p.value/4)})`,width:h(100-T.value,"%"),"--v-progress-linear-stream-to":h(p.value*($.value?1:-1))}},null),u("div",{class:["v-progress-linear__background",B?void 0:d.value],style:[g.value,{opacity:parseFloat(e.bgOpacity),width:e.stream?0:void 0}]},null),u("div",{class:["v-progress-linear__buffer",B?void 0:b.value],style:[f.value,{opacity:parseFloat(e.bufferOpacity),width:h(T.value,"%")}]},null),u(xe,{name:Q.value},{default:()=>[e.indeterminate?u("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(m=>u("div",{key:m,class:["v-progress-linear__indeterminate",m,B?void 0:S.value],style:w.value},null))]):u("div",{class:["v-progress-linear__determinate",B?void 0:S.value],style:[w.value,{width:h(D.value,"%")}]},null)]}),n.default&&u("div",{class:"v-progress-linear__content"},[n.default({value:D.value,buffer:T.value})])]})),{}}}),nn=y({loading:[Boolean,String]},"loader");function an(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();return{loaderClasses:v(()=>({[`${t}--loading`]:e.loading}))}}function sn(e,t){var a;let{slots:n}=t;return u("div",{class:`${e.name}__loader`},[((a=n.default)==null?void 0:a.call(n,{color:e.color,isActive:e.active}))||u(At,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const Ht=["static","relative","fixed","absolute","sticky"],rn=y({position:{type:String,validator:e=>Ht.includes(e)}},"position");function on(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:L();return{positionClasses:v(()=>e.position?`${t}--${e.position}`:void 0)}}function Wt(){const e=ne("useRoute");return v(()=>{var t;return(t=e==null?void 0:e.proxy)==null?void 0:t.$route})}function ln(){var e,t;return(t=(e=ne("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function un(e,t){var g,b;const n=ot("RouterLink"),a=v(()=>!!(e.href||e.to)),i=v(()=>(a==null?void 0:a.value)||me(t,"click")||me(e,"click"));if(typeof n=="string"||!("useLink"in n)){const f=Y(e,"href");return{isLink:a,isClickable:i,href:f,linkProps:ge({href:f})}}const s=v(()=>({...e,to:Y(()=>e.to||"")})),r=n.useLink(s.value),o=v(()=>e.to?r:void 0),l=Wt(),c=v(()=>{var f,S,w;return o.value?e.exact?l.value?((w=o.value.isExactActive)==null?void 0:w.value)&&lt(o.value.route.value.query,l.value.query):((S=o.value.isExactActive)==null?void 0:S.value)??!1:((f=o.value.isActive)==null?void 0:f.value)??!1:!1}),d=v(()=>{var f;return e.to?(f=o.value)==null?void 0:f.route.value.href:e.href});return{isLink:a,isClickable:i,isActive:c,route:(g=o.value)==null?void 0:g.route,navigate:(b=o.value)==null?void 0:b.navigate,href:d,linkProps:ge({href:d,"aria-current":v(()=>c.value?"page":void 0)})}}const cn=y({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let Z=!1;function dn(e,t){let n=!1,a,i;Be&&(e!=null&&e.beforeEach)&&(Ee(()=>{window.addEventListener("popstate",s),a=e.beforeEach((r,o,l)=>{Z?n?t(l):l():setTimeout(()=>n?t(l):l()),Z=!0}),i=e==null?void 0:e.afterEach(()=>{Z=!1})}),ut(()=>{window.removeEventListener("popstate",s),a==null||a(),i==null||i()}));function s(r){var o;(o=r.state)!=null&&o.replaced||(n=!0,setTimeout(()=>n=!1))}}const J=Symbol("rippleStop"),Dt=80;function Se(e,t){e.style.transform=t,e.style.webkitTransform=t}function ee(e){return e.constructor.name==="TouchEvent"}function Fe(e){return e.constructor.name==="KeyboardEvent"}const jt=function(e,t){var g;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=0,i=0;if(!Fe(e)){const b=t.getBoundingClientRect(),f=ee(e)?e.touches[e.touches.length-1]:e;a=f.clientX-b.left,i=f.clientY-b.top}let s=0,r=.3;(g=t._ripple)!=null&&g.circle?(r=.15,s=t.clientWidth/2,s=n.center?s:s+Math.sqrt((a-s)**2+(i-s)**2)/4):s=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const o=`${(t.clientWidth-s*2)/2}px`,l=`${(t.clientHeight-s*2)/2}px`,c=n.center?o:`${a-s}px`,d=n.center?l:`${i-s}px`;return{radius:s,scale:r,x:c,y:d,centerX:o,centerY:l}},K={show(e,t){var f;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((f=t==null?void 0:t._ripple)!=null&&f.enabled))return;const a=document.createElement("span"),i=document.createElement("span");a.appendChild(i),a.className="v-ripple__container",n.class&&(a.className+=` ${n.class}`);const{radius:s,scale:r,x:o,y:l,centerX:c,centerY:d}=jt(e,t,n),g=`${s*2}px`;i.className="v-ripple__animation",i.style.width=g,i.style.height=g,t.appendChild(a);const b=window.getComputedStyle(t);b&&b.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),i.classList.add("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--visible"),Se(i,`translate(${o}, ${l}) scale3d(${r},${r},${r})`),i.dataset.activated=String(performance.now()),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--in"),Se(i,`translate(${c}, ${d}) scale3d(1,1,1)`)})})},hide(e){var s;if(!((s=e==null?void 0:e._ripple)!=null&&s.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const n=t[t.length-1];if(n.dataset.isHiding)return;n.dataset.isHiding="true";const a=performance.now()-Number(n.dataset.activated),i=Math.max(250-a,0);setTimeout(()=>{n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),setTimeout(()=>{var o;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((o=n.parentNode)==null?void 0:o.parentNode)===e&&e.removeChild(n.parentNode)},300)},i)}};function Ae(e){return typeof e>"u"||!!e}function O(e){const t={},n=e.currentTarget;if(!(!(n!=null&&n._ripple)||n._ripple.touched||e[J])){if(e[J]=!0,ee(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;if(t.center=n._ripple.centered||Fe(e),n._ripple.class&&(t.class=n._ripple.class),ee(e)){if(n._ripple.showTimerCommit)return;n._ripple.showTimerCommit=()=>{K.show(e,n,t)},n._ripple.showTimer=window.setTimeout(()=>{var a;(a=n==null?void 0:n._ripple)!=null&&a.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null)},Dt)}else K.show(e,n,t)}}function Ce(e){e[J]=!0}function C(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{C(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),K.hide(t)}}function He(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let F=!1;function We(e){!F&&(e.keyCode===he.enter||e.keyCode===he.space)&&(F=!0,O(e))}function De(e){F=!1,C(e)}function je(e){F&&(F=!1,C(e))}function Me(e,t,n){const{value:a,modifiers:i}=t,s=Ae(a);if(s||K.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=s,e._ripple.centered=i.center,e._ripple.circle=i.circle,ct(a)&&a.class&&(e._ripple.class=a.class),s&&!n){if(i.stop){e.addEventListener("touchstart",Ce,{passive:!0}),e.addEventListener("mousedown",Ce);return}e.addEventListener("touchstart",O,{passive:!0}),e.addEventListener("touchend",C,{passive:!0}),e.addEventListener("touchmove",He,{passive:!0}),e.addEventListener("touchcancel",C),e.addEventListener("mousedown",O),e.addEventListener("mouseup",C),e.addEventListener("mouseleave",C),e.addEventListener("keydown",We),e.addEventListener("keyup",De),e.addEventListener("blur",je),e.addEventListener("dragstart",C,{passive:!0})}else!s&&n&&qe(e)}function qe(e){e.removeEventListener("mousedown",O),e.removeEventListener("touchstart",O),e.removeEventListener("touchend",C),e.removeEventListener("touchmove",He),e.removeEventListener("touchcancel",C),e.removeEventListener("mouseup",C),e.removeEventListener("mouseleave",C),e.removeEventListener("keydown",We),e.removeEventListener("keyup",De),e.removeEventListener("dragstart",C),e.removeEventListener("blur",je)}function Mt(e,t){Me(e,t,!1)}function qt(e){delete e._ripple,qe(e)}function Xt(e,t){if(t.value===t.oldValue)return;const n=Ae(t.oldValue);Me(e,t,n)}const vn={mounted:Mt,unmounted:qt,updated:Xt},Ut=y({start:Boolean,end:Boolean,icon:Te,image:String,text:String,...kt(),...N(),...Et(),...le(),...Ie(),...re(),...se(),...$t({variant:"flat"})},"VAvatar"),fn=E()({name:"VAvatar",props:Ut(),setup(e,t){let{slots:n}=t;const{themeClasses:a}=ie(e),{borderClasses:i}=wt(e),{colorClasses:s,colorStyles:r,variantClasses:o}=Bt(e),{densityClasses:l}=Lt(e),{roundedClasses:c}=ue(e),{sizeClasses:d,sizeStyles:g}=Oe(e);return A(()=>u(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,i.value,s.value,l.value,c.value,d.value,o.value,e.class],style:[r.value,g.value,e.style]},{default:()=>[n.default?u(mt,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[n.default()]}):e.image?u(pt,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?u(Vt,{key:"icon",icon:e.icon},null):e.text,Tt(!1,"v-avatar")]})),{}}});export{Jt as A,cn as B,un as C,vt as D,Kt as E,Qt as F,Gt as G,Zt as H,St as I,yt as J,dn as K,Ie as L,M,Oe as N,nn as O,an as P,sn as Q,vn as R,Nt as S,At as V,rn as a,le as b,$t as c,Bt as d,ue as e,mt as f,Tt as g,pt as h,Et as i,Vt as j,Lt as k,Ve as l,It as m,X as n,kt as o,gt as p,en as q,re as r,wt as s,ht as t,on as u,tn as v,Ot as w,ln as x,be as y,fn as z};
