import{m as T,c as $,u as B,V as P}from"./VOverlay-CZgdwhL6.js";import{f as L}from"./forwardRefs-DvBWcYN4.js";import{p as O,g as R,u as F,r as I,Z as j,aj as N,h as b,n as W,ah as H,v as U,t as V,b as s,A as z,o as M,c as Z,w as r,ad as h}from"./app-D4do6SPm.js";import{f as q}from"./VAvatar-Bg5ilFUs.js";import{C as G,t as J,V as K,_ as Q}from"./_plugin-vue_export-helper-CFsRs_PN.js";import{S as X}from"./SectionTitle-CdCxXf3-.js";import{V as S}from"./VContainer-DSl5-3wa.js";import{V as x,b as w}from"./VCard-CWuaa-a7.js";import{V as A,a as E}from"./VRow-CpG1yRc5.js";const Y=O({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...T({origin:"center center",scrollStrategy:"block",transition:{component:$},zIndex:2400})},"VDialog"),me=R()({name:"VDialog",props:Y(),emits:{"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,c){let{emit:i,slots:a}=c;const o=F(e,"modelValue"),{scopeId:d}=B(),t=I();function p(n){var f,v;const u=n.relatedTarget,m=n.target;if(u!==m&&((f=t.value)!=null&&f.contentEl)&&((v=t.value)!=null&&v.globalTop)&&![document,t.value.contentEl].includes(m)&&!t.value.contentEl.contains(m)){const l=H(t.value.contentEl);if(!l.length)return;const g=l[0],y=l[l.length-1];u===g?y.focus():g.focus()}}j(()=>{document.removeEventListener("focusin",p)}),N&&b(()=>o.value&&e.retainFocus,n=>{n?document.addEventListener("focusin",p):document.removeEventListener("focusin",p)},{immediate:!0});function C(){var n;i("afterEnter"),(n=t.value)!=null&&n.contentEl&&!t.value.contentEl.contains(document.activeElement)&&t.value.contentEl.focus({preventScroll:!0})}function D(){i("afterLeave")}return b(o,async n=>{var u;n||(await U(),(u=t.value.activatorEl)==null||u.focus({preventScroll:!0}))}),W(()=>{const n=P.filterProps(e),u=V({"aria-haspopup":"dialog"},e.activatorProps),m=V({tabindex:-1},e.contentProps);return s(P,V({ref:t,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},n,{modelValue:o.value,"onUpdate:modelValue":f=>o.value=f,"aria-modal":"true",activatorProps:u,contentProps:m,height:e.fullscreen?void 0:e.height,width:e.fullscreen?void 0:e.width,maxHeight:e.fullscreen?void 0:e.maxHeight,maxWidth:e.fullscreen?void 0:e.maxWidth,role:"dialog",onAfterEnter:C,onAfterLeave:D},d),{activator:a.activator,default:function(){for(var f=arguments.length,v=new Array(f),l=0;l<f;l++)v[l]=arguments[l];return s(q,{root:"VDialog"},{default:()=>{var g;return[(g=a.default)==null?void 0:g.call(a,...v)]}})}})}),L({},t)}});var k=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,te=(e,c,i,a)=>{for(var o=a>1?void 0:a?ee(c,i):c,d=e.length-1,t;d>=0;d--)(t=e[d])&&(o=(a?t(c,i,o):t(o))||o);return a&&o&&k(c,i,o),o};let _=class extends K{};_=te([G({components:{SectionTitle:X,VContainer:S,VRow:A,VCol:E,VCard:x,VCardText:w}})],_);const oe=J(_);function ne(e,c,i,a,o,d){const t=z("SectionTitle");return M(),Z(S,null,{default:r(()=>[s(A,{class:"d-flex"},{default:r(()=>[s(E,{cols:"12",md:"4"},{default:r(()=>[s(t,null,{title:r(()=>[h(e.$slots,"title")]),description:r(()=>[h(e.$slots,"description")]),_:3})]),_:3}),s(E,{cols:"12",md:"8"},{default:r(()=>[s(x,{class:"pa-5"},{default:r(()=>[s(w,null,{default:r(()=>[h(e.$slots,"content")]),_:3})]),_:3})]),_:3})]),_:3})]),_:3})}const ge=Q(oe,[["render",ne]]);export{ge as A,me as V};
