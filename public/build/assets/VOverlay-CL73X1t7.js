import{az as Re,aA as Ne,E as _e,b as D,R as $,T as fe,z as j,r as W,av as q,a8 as ye,g as M,K as V,aB as Je,d as A,Y as ge,a0 as H,a3 as xe,_ as he,aC as De,aD as Ze,ak as ae,U as He,aE as Se,X as Qe,O as X,ad as et,h as tt,aF as Ve,J as nt,aj as ot,ai as at,B as rt,D as it,G as st,a5 as lt,a6 as ct,M as ut,$ as ft,N as dt,aG as vt,e as mt,j as yt,S as gt,F as ht}from"./app-CPfewmGe.js";import{a as Z,d as wt,s as de,b as Et,g as Ie,n as $e,B as ie,c as ke}from"./forwardRefs-B931MWyl.js";import{C as pe,D as se,E as le,F as Oe,G as Pe,e as bt,H as xt,c as St,l as kt,t as pt,M as Ot,J as Pt}from"./VAvatar-BWhNs8M-.js";const ee=new WeakMap;function At(e,n){Object.keys(n).forEach(t=>{if(Re(t)){const o=Ne(t),a=ee.get(e);if(n[t]==null)a==null||a.forEach(i=>{const[l,r]=i;l===o&&(e.removeEventListener(o,r),a.delete(i))});else if(!a||![...a].some(i=>i[0]===o&&i[1]===n[t])){e.addEventListener(o,n[t]);const i=a||new Set;i.add([o,n[t]]),ee.has(e)||ee.set(e,i)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function Ct(e,n){Object.keys(n).forEach(t=>{if(Re(t)){const o=Ne(t),a=ee.get(e);a==null||a.forEach(i=>{const[l,r]=i;l===o&&(e.removeEventListener(o,r),a.delete(i))})}else e.removeAttribute(t)})}function We(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function Tt(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?Bt(e):we(e))return e;e=e.parentElement}return document.scrollingElement}function ne(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(we(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function we(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function Bt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function Lt(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}const Ft=j({target:[Object,Array]},"v-dialog-transition"),dn=_e()({name:"VDialogTransition",props:Ft(),setup(e,n){let{slots:t}=n;const o={onBeforeEnter(a){a.style.pointerEvents="none",a.style.visibility="hidden"},async onEnter(a,i){var w;await new Promise(y=>requestAnimationFrame(y)),await new Promise(y=>requestAnimationFrame(y)),a.style.visibility="";const{x:l,y:r,sx:u,sy:d,speed:s}=Ce(e.target,a),h=Z(a,[{transform:`translate(${l}px, ${r}px) scale(${u}, ${d})`,opacity:0},{}],{duration:225*s,easing:wt});(w=Ae(a))==null||w.forEach(y=>{Z(y,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*s,easing:de})}),h.finished.then(()=>i())},onAfterEnter(a){a.style.removeProperty("pointer-events")},onBeforeLeave(a){a.style.pointerEvents="none"},async onLeave(a,i){var w;await new Promise(y=>requestAnimationFrame(y));const{x:l,y:r,sx:u,sy:d,speed:s}=Ce(e.target,a);Z(a,[{},{transform:`translate(${l}px, ${r}px) scale(${u}, ${d})`,opacity:0}],{duration:125*s,easing:Et}).finished.then(()=>i()),(w=Ae(a))==null||w.forEach(y=>{Z(y,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*s,easing:de})})},onAfterLeave(a){a.style.removeProperty("pointer-events")}};return()=>e.target?D(fe,$({name:"dialog-transition"},o,{css:!1}),t):D(fe,{name:"dialog-transition"},t)}});function Ae(e){var t;const n=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return n&&[...n]}function Ce(e,n){const t=Ie(e),o=$e(n),[a,i]=getComputedStyle(n).transformOrigin.split(" ").map(S=>parseFloat(S)),[l,r]=getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");let u=t.left+t.width/2;l==="left"||r==="left"?u-=t.width/2:(l==="right"||r==="right")&&(u+=t.width/2);let d=t.top+t.height/2;l==="top"||r==="top"?d-=t.height/2:(l==="bottom"||r==="bottom")&&(d+=t.height/2);const s=t.width/o.width,h=t.height/o.height,w=Math.max(1,s,h),y=s/w||0,v=h/w||0,f=o.width*o.height/(window.innerWidth*window.innerHeight),O=f>.12?Math.min(1.5,(f-.12)*10+1):1;return{x:u-(a+o.left),y:d-(i+o.top),sx:y,sy:v,speed:O}}function ce(e,n){return{x:e.x+n.x,y:e.y+n.y}}function Mt(e,n){return{x:e.x-n.x,y:e.y-n.y}}function Te(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:o}=e,a=o==="left"?0:o==="center"?n.width/2:o==="right"?n.width:o,i=t==="top"?0:t==="bottom"?n.height:t;return ce({x:a,y:i},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:o}=e,a=t==="left"?0:t==="right"?n.width:t,i=o==="top"?0:o==="center"?n.height/2:o==="bottom"?n.height:o;return ce({x:a,y:i},n)}return ce({x:n.width/2,y:n.height/2},n)}const qe={static:_t,connected:Ht},Rt=j({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in qe},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function Nt(e,n){const t=W({}),o=W();q&&ye(()=>!!(n.isActive.value&&e.locationStrategy),i=>{var l,r;M(()=>e.locationStrategy,i),V(()=>{window.removeEventListener("resize",a),o.value=void 0}),window.addEventListener("resize",a,{passive:!0}),typeof e.locationStrategy=="function"?o.value=(l=e.locationStrategy(n,e,t))==null?void 0:l.updateLocation:o.value=(r=qe[e.locationStrategy](n,e,t))==null?void 0:r.updateLocation});function a(i){var l;(l=o.value)==null||l.call(o,i)}return{contentStyles:t,updateLocation:o}}function _t(){}function Dt(e,n){const t=$e(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function Ht(e,n,t){(Array.isArray(e.target.value)||Lt(e.target.value))&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:a,preferredOrigin:i}=Je(()=>{const v=pe(n.location,e.isRtl.value),f=n.origin==="overlap"?v:n.origin==="auto"?se(v):pe(n.origin,e.isRtl.value);return v.side===f.side&&v.align===le(f).align?{preferredAnchor:Oe(v),preferredOrigin:Oe(f)}:{preferredAnchor:v,preferredOrigin:f}}),[l,r,u,d]=["minWidth","minHeight","maxWidth","maxHeight"].map(v=>A(()=>{const f=parseFloat(n[v]);return isNaN(f)?1/0:f})),s=A(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const v=n.offset.split(" ").map(parseFloat);return v.length<2&&v.push(0),v}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let h=!1;const w=new ResizeObserver(()=>{h&&y()});M([e.target,e.contentEl],(v,f)=>{let[O,S]=v,[k,x]=f;k&&!Array.isArray(k)&&w.unobserve(k),O&&!Array.isArray(O)&&w.observe(O),x&&w.unobserve(x),S&&w.observe(S)},{immediate:!0}),V(()=>{w.disconnect()});function y(){if(h=!1,requestAnimationFrame(()=>h=!0),!e.target.value||!e.contentEl.value)return;const v=Ie(e.target.value),f=Dt(e.contentEl.value,e.isRtl.value),O=ne(e.contentEl.value),S=12;O.length||(O.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(f.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),f.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const k=O.reduce((p,b)=>{const g=b.getBoundingClientRect(),E=new ie({x:b===document.documentElement?0:g.x,y:b===document.documentElement?0:g.y,width:b.clientWidth,height:b.clientHeight});return p?new ie({x:Math.max(p.left,E.left),y:Math.max(p.top,E.top),width:Math.min(p.right,E.right)-Math.max(p.left,E.left),height:Math.min(p.bottom,E.bottom)-Math.max(p.top,E.top)}):E},void 0);k.x+=S,k.y+=S,k.width-=S*2,k.height-=S*2;let x={anchor:a.value,origin:i.value};function T(p){const b=new ie(f),g=Te(p.anchor,v),E=Te(p.origin,b);let{x:N,y:_}=Mt(g,E);switch(p.anchor.side){case"top":_-=s.value[0];break;case"bottom":_+=s.value[0];break;case"left":N-=s.value[0];break;case"right":N+=s.value[0];break}switch(p.anchor.align){case"top":_-=s.value[1];break;case"bottom":_+=s.value[1];break;case"left":N-=s.value[1];break;case"right":N+=s.value[1];break}return b.x+=N,b.y+=_,b.width=Math.min(b.width,u.value),b.height=Math.min(b.height,d.value),{overflows:ke(b,k),x:N,y:_}}let L=0,R=0;const P={x:0,y:0},c={x:!1,y:!1};let B=-1;for(;!(B++>10);){const{x:p,y:b,overflows:g}=T(x);L+=p,R+=b,f.x+=p,f.y+=b;{const E=Pe(x.anchor),N=g.x.before||g.x.after,_=g.y.before||g.y.after;let z=!1;if(["x","y"].forEach(C=>{if(C==="x"&&N&&!c.x||C==="y"&&_&&!c.y){const I={anchor:{...x.anchor},origin:{...x.origin}},Y=C==="x"?E==="y"?le:se:E==="y"?se:le;I.anchor=Y(I.anchor),I.origin=Y(I.origin);const{overflows:G}=T(I);(G[C].before<=g[C].before&&G[C].after<=g[C].after||G[C].before+G[C].after<(g[C].before+g[C].after)/2)&&(x=I,z=c[C]=!0)}}),z)continue}g.x.before&&(L+=g.x.before,f.x+=g.x.before),g.x.after&&(L-=g.x.after,f.x-=g.x.after),g.y.before&&(R+=g.y.before,f.y+=g.y.before),g.y.after&&(R-=g.y.after,f.y-=g.y.after);{const E=ke(f,k);P.x=k.width-E.x.before-E.x.after,P.y=k.height-E.y.before-E.y.after,L+=E.x.before,f.x+=E.x.before,R+=E.y.before,f.y+=E.y.before}break}const re=Pe(x.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${x.anchor.side} ${x.anchor.align}`,transformOrigin:`${x.origin.side} ${x.origin.align}`,top:H(ue(R)),left:e.isRtl.value?void 0:H(ue(L)),right:e.isRtl.value?H(ue(-L)):void 0,minWidth:H(re==="y"?Math.min(l.value,v.width):l.value),maxWidth:H(Be(xe(P.x,l.value===1/0?0:l.value,u.value))),maxHeight:H(Be(xe(P.y,r.value===1/0?0:r.value,d.value)))}),{available:P,contentBox:f}}return M(()=>[a.value,i.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>y()),ge(()=>{const v=y();if(!v)return;const{available:f,contentBox:O}=v;O.height>f.y&&requestAnimationFrame(()=>{y(),requestAnimationFrame(()=>{y()})})}),{updateLocation:y}}function ue(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Be(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let ve=!0;const oe=[];function Vt(e){!ve||oe.length?(oe.push(e),me()):(ve=!1,e(),me())}let Le=-1;function me(){cancelAnimationFrame(Le),Le=requestAnimationFrame(()=>{const e=oe.shift();e&&e(),oe.length?me():ve=!0})}const te={none:null,close:Wt,block:qt,reposition:jt},It=j({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in te}},"VOverlay-scroll-strategies");function $t(e,n){if(!q)return;let t;he(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=De(),await new Promise(o=>setTimeout(o)),t.active&&t.run(()=>{var o;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(o=te[e.scrollStrategy])==null||o.call(te,n,e,t)}))}),V(()=>{t==null||t.stop()})}function Wt(e){function n(t){e.isActive.value=!1}je(e.targetEl.value??e.contentEl.value,n)}function qt(e,n){var l;const t=(l=e.root.value)==null?void 0:l.offsetParent,o=[...new Set([...ne(e.targetEl.value,n.contained?t:void 0),...ne(e.contentEl.value,n.contained?t:void 0)])].filter(r=>!r.classList.contains("v-overlay-scroll-blocked")),a=window.innerWidth-document.documentElement.offsetWidth,i=(r=>we(r)&&r)(t||document.documentElement);i&&e.root.value.classList.add("v-overlay--scroll-blocked"),o.forEach((r,u)=>{r.style.setProperty("--v-body-scroll-x",H(-r.scrollLeft)),r.style.setProperty("--v-body-scroll-y",H(-r.scrollTop)),r!==document.documentElement&&r.style.setProperty("--v-scrollbar-offset",H(a)),r.classList.add("v-overlay-scroll-blocked")}),V(()=>{o.forEach((r,u)=>{const d=parseFloat(r.style.getPropertyValue("--v-body-scroll-x")),s=parseFloat(r.style.getPropertyValue("--v-body-scroll-y")),h=r.style.scrollBehavior;r.style.scrollBehavior="auto",r.style.removeProperty("--v-body-scroll-x"),r.style.removeProperty("--v-body-scroll-y"),r.style.removeProperty("--v-scrollbar-offset"),r.classList.remove("v-overlay-scroll-blocked"),r.scrollLeft=-d,r.scrollTop=-s,r.style.scrollBehavior=h}),i&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function jt(e,n,t){let o=!1,a=-1,i=-1;function l(r){Vt(()=>{var s,h;const u=performance.now();(h=(s=e.updateLocation).value)==null||h.call(s,r),o=(performance.now()-u)/(1e3/60)>2})}i=(typeof requestIdleCallback>"u"?r=>r():requestIdleCallback)(()=>{t.run(()=>{je(e.targetEl.value??e.contentEl.value,r=>{o?(cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=requestAnimationFrame(()=>{l(r)})})):l(r)})})}),V(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(i),cancelAnimationFrame(a)})}function je(e,n){const t=[document,...ne(e)];t.forEach(o=>{o.addEventListener("scroll",n,{passive:!0})}),V(()=>{t.forEach(o=>{o.removeEventListener("scroll",n)})})}const zt=Symbol.for("vuetify:v-menu"),Yt=j({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function Gt(e,n){let t=()=>{};function o(l){t==null||t();const r=Number(l?e.openDelay:e.closeDelay);return new Promise(u=>{t=Ze(r,()=>{n==null||n(l),u(l)})})}function a(){return o(!0)}function i(){return o(!1)}return{clearDelay:t,runOpenDelay:a,runCloseDelay:i}}const Xt=j({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Yt()},"VOverlay-activator");function Kt(e,n){let{isActive:t,isTop:o,contentEl:a}=n;const i=ae("useActivator"),l=W();let r=!1,u=!1,d=!0;const s=A(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),h=A(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!s.value),{runOpenDelay:w,runCloseDelay:y}=Gt(e,c=>{c===(e.openOnHover&&r||s.value&&u)&&!(e.openOnHover&&t.value&&!o.value)&&(t.value!==c&&(d=!0),t.value=c)}),v=W(),f={onClick:c=>{c.stopPropagation(),l.value=c.currentTarget||c.target,t.value||(v.value=[c.clientX,c.clientY]),t.value=!t.value},onMouseenter:c=>{var B;(B=c.sourceCapabilities)!=null&&B.firesTouchEvents||(r=!0,l.value=c.currentTarget||c.target,w())},onMouseleave:c=>{r=!1,y()},onFocus:c=>{Qe(c.target,":focus-visible")!==!1&&(u=!0,c.stopPropagation(),l.value=c.currentTarget||c.target,w())},onBlur:c=>{u=!1,c.stopPropagation(),y()}},O=A(()=>{const c={};return h.value&&(c.onClick=f.onClick),e.openOnHover&&(c.onMouseenter=f.onMouseenter,c.onMouseleave=f.onMouseleave),s.value&&(c.onFocus=f.onFocus,c.onBlur=f.onBlur),c}),S=A(()=>{const c={};if(e.openOnHover&&(c.onMouseenter=()=>{r=!0,w()},c.onMouseleave=()=>{r=!1,y()}),s.value&&(c.onFocusin=()=>{u=!0,w()},c.onFocusout=()=>{u=!1,y()}),e.closeOnContentClick){const B=He(zt,null);c.onClick=()=>{t.value=!1,B==null||B.closeParents()}}return c}),k=A(()=>{const c={};return e.openOnHover&&(c.onMouseenter=()=>{d&&(r=!0,d=!1,w())},c.onMouseleave=()=>{r=!1,y()}),c});M(o,c=>{var B;c&&(e.openOnHover&&!r&&(!s.value||!u)||s.value&&!u&&(!e.openOnHover||!r))&&!((B=a.value)!=null&&B.contains(document.activeElement))&&(t.value=!1)}),M(t,c=>{c||setTimeout(()=>{v.value=void 0})},{flush:"post"});const x=Se();he(()=>{x.value&&ge(()=>{l.value=x.el})});const T=Se(),L=A(()=>e.target==="cursor"&&v.value?v.value:T.value?T.el:ze(e.target,i)||l.value),R=A(()=>Array.isArray(L.value)?void 0:L.value);let P;return M(()=>!!e.activator,c=>{c&&q?(P=De(),P.run(()=>{Ut(e,i,{activatorEl:l,activatorEvents:O})})):P&&P.stop()},{flush:"post",immediate:!0}),V(()=>{P==null||P.stop()}),{activatorEl:l,activatorRef:x,target:L,targetEl:R,targetRef:T,activatorEvents:O,contentEvents:S,scrimEvents:k}}function Ut(e,n,t){let{activatorEl:o,activatorEvents:a}=t;M(()=>e.activator,(u,d)=>{if(d&&u!==d){const s=r(d);s&&l(s)}u&&ge(()=>i())},{immediate:!0}),M(()=>e.activatorProps,()=>{i()}),V(()=>{l()});function i(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;u&&At(u,$(a.value,d))}function l(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;u&&Ct(u,$(a.value,d))}function r(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator;const d=ze(u,n);return o.value=(d==null?void 0:d.nodeType)===Node.ELEMENT_NODE?d:void 0,o.value}}function ze(e,n){var o,a;if(!e)return;let t;if(e==="parent"){let i=(a=(o=n==null?void 0:n.proxy)==null?void 0:o.$el)==null?void 0:a.parentNode;for(;i!=null&&i.hasAttribute("data-no-activator");)i=i.parentNode;t=i}else typeof e=="string"?t=document.querySelector(e):"$el"in e?t=e.$el:t=e;return t}function Jt(){if(!q)return X(!1);const{ssr:e}=et();if(e){const n=X(!1);return tt(()=>{n.value=!0}),n}else return X(!0)}const Zt=j({eager:Boolean},"lazy");function Qt(e,n){const t=X(!1),o=A(()=>t.value||e.eager||n.value);M(n,()=>t.value=!0);function a(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:o,onAfterLeave:a}}function en(){const n=ae("useScopeId").vnode.scopeId;return{scopeId:n?{[n]:""}:void 0}}const Fe=Symbol.for("vuetify:stack"),J=Ve([]);function tn(e,n,t){const o=ae("useStack"),a=!t,i=He(Fe,void 0),l=Ve({activeChildren:new Set});nt(Fe,l);const r=X(Number(n.value));ye(e,()=>{var h;const s=(h=J.at(-1))==null?void 0:h[1];r.value=s?s+10:Number(n.value),a&&J.push([o.uid,r.value]),i==null||i.activeChildren.add(o.uid),V(()=>{if(a){const w=ot(J).findIndex(y=>y[0]===o.uid);J.splice(w,1)}i==null||i.activeChildren.delete(o.uid)})});const u=X(!0);a&&he(()=>{var h;const s=((h=J.at(-1))==null?void 0:h[0])===o.uid;setTimeout(()=>u.value=s)});const d=A(()=>!l.activeChildren.size);return{globalTop:at(u),localTop:d,stackStyles:A(()=>({zIndex:r.value}))}}function nn(e){return{teleportTarget:A(()=>{const t=e();if(t===!0||!q)return;const o=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(o==null)return;let a=[...o.children].find(i=>i.matches(".v-overlay-container"));return a||(a=document.createElement("div"),a.className="v-overlay-container",o.appendChild(a)),a})}}function on(){return!0}function Ye(e,n,t){if(!e||Ge(e,t)===!1)return!1;const o=We(n);if(typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&o.host===e.target)return!1;const a=(typeof t.value=="object"&&t.value.include||(()=>[]))();return a.push(n),!a.some(i=>i==null?void 0:i.contains(e.target))}function Ge(e,n){return(typeof n.value=="object"&&n.value.closeConditional||on)(e)}function an(e,n,t){const o=typeof t.value=="function"?t.value:t.value.handler;e.shadowTarget=e.target,n._clickOutside.lastMousedownWasOutside&&Ye(e,n,t)&&setTimeout(()=>{Ge(e,t)&&o&&o(e)},0)}function Me(e,n){const t=We(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const rn={mounted(e,n){const t=a=>an(a,e,n),o=a=>{e._clickOutside.lastMousedownWasOutside=Ye(a,e,n)};Me(e,a=>{a.addEventListener("click",t,!0),a.addEventListener("mousedown",o,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:o}},beforeUnmount(e,n){e._clickOutside&&(Me(e,t=>{var i;if(!t||!((i=e._clickOutside)!=null&&i[n.instance.$.uid]))return;const{onClick:o,onMousedown:a}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",o,!0),t.removeEventListener("mousedown",a,!0)}),delete e._clickOutside[n.instance.$.uid])}};function sn(e){const{modelValue:n,color:t,...o}=e;return D(fe,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&D("div",$({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const ln=j({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Xt(),...rt(),...bt(),...Zt(),...Rt(),...It(),...it(),...xt()},"VOverlay"),vn=_e()({name:"VOverlay",directives:{ClickOutside:rn},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...ln()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,keydown:e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:o,emit:a}=n;const i=ae("VOverlay"),l=W(),r=W(),u=W(),d=st(e,"modelValue"),s=A({get:()=>d.value,set:m=>{m&&e.disabled||(d.value=m)}}),{themeClasses:h}=lt(e),{rtlClasses:w,isRtl:y}=ct(),{hasContent:v,onAfterLeave:f}=Qt(e,s),O=St(A(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:S,localTop:k,stackStyles:x}=tn(s,ut(e,"zIndex"),e._disableGlobalStack),{activatorEl:T,activatorRef:L,target:R,targetEl:P,targetRef:c,activatorEvents:B,contentEvents:re,scrimEvents:p}=Kt(e,{isActive:s,isTop:k,contentEl:u}),{teleportTarget:b}=nn(()=>{var K,U,be;const m=e.attach||e.contained;if(m)return m;const F=((K=T==null?void 0:T.value)==null?void 0:K.getRootNode())||((be=(U=i.proxy)==null?void 0:U.$el)==null?void 0:be.getRootNode());return F instanceof ShadowRoot?F:!1}),{dimensionStyles:g}=kt(e),E=Jt(),{scopeId:N}=en();M(()=>e.disabled,m=>{m&&(s.value=!1)});const{contentStyles:_,updateLocation:z}=Nt(e,{isRtl:y,contentEl:u,target:R,isActive:s});$t(e,{root:l,contentEl:u,targetEl:P,isActive:s,updateLocation:z});function C(m){a("click:outside",m),e.persistent?Q():s.value=!1}function I(m){return s.value&&S.value&&(!e.scrim||m.target===r.value||m instanceof MouseEvent&&m.shadowTarget===r.value)}q&&M(s,m=>{m?window.addEventListener("keydown",Y):window.removeEventListener("keydown",Y)},{immediate:!0}),ft(()=>{q&&window.removeEventListener("keydown",Y)});function Y(m){var F,K,U;m.key==="Escape"&&S.value&&((F=u.value)!=null&&F.contains(document.activeElement)||a("keydown",m),e.persistent?Q():(s.value=!1,(K=u.value)!=null&&K.contains(document.activeElement)&&((U=T.value)==null||U.focus())))}function G(m){m.key==="Escape"&&!S.value||a("keydown",m)}const Xe=pt();ye(()=>e.closeOnBack,()=>{Pt(Xe,m=>{S.value&&s.value?(m(!1),e.persistent?Q():s.value=!1):m()})});const Ee=W();M(()=>s.value&&(e.absolute||e.contained)&&b.value==null,m=>{if(m){const F=Tt(l.value);F&&F!==document.scrollingElement&&(Ee.value=F.scrollTop)}});function Q(){e.noClickAnimation||u.value&&Z(u.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:de})}function Ke(){a("afterEnter")}function Ue(){f(),a("afterLeave")}return dt(()=>{var m;return D(ht,null,[(m=t.activator)==null?void 0:m.call(t,{isActive:s.value,targetRef:c,props:$({ref:L},B.value,e.activatorProps)}),E.value&&v.value&&D(vt,{disabled:!b.value,to:b.value},{default:()=>[D("div",$({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},h.value,w.value,e.class],style:[x.value,{"--v-overlay-opacity":e.opacity,top:H(Ee.value)},e.style],ref:l,onKeydown:G},N,o),[D(sn,$({color:O,modelValue:s.value&&!!e.scrim,ref:r},p.value),null),D(Ot,{appear:!0,persisted:!0,transition:e.transition,target:R.value,onAfterEnter:Ke,onAfterLeave:Ue},{default:()=>{var F;return[mt(D("div",$({ref:u,class:["v-overlay__content",e.contentClass],style:[g.value,_.value]},re.value,e.contentProps),[(F=t.default)==null?void 0:F.call(t,{isActive:s})]),[[yt,s.value],[gt("click-outside"),{handler:C,closeConditional:I,include:()=>[T.value]}]])]}})])]})])}),{activatorEl:T,scrimEl:r,target:R,animateClick:Q,contentEl:u,globalTop:S,localTop:k,updateLocation:z}}});export{dn as V,Gt as a,ln as b,zt as c,vn as d,Yt as m,en as u};
