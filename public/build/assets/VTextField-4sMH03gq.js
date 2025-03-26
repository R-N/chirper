import{m as q,b as H,u as J,a as _,c as S,d as K}from"./VField-WdJWQtL9.js";import{f as W}from"./forwardRefs-B931MWyl.js";import{z as X,E as Z,G as $,d as v,r as x,N as ee,Q as te,b as n,R as V,e as ne,S as le,F as y,aL as ae,Y as w,a2 as ue}from"./app-CPfewmGe.js";import{I as ie}from"./VAvatar-BWhNs8M-.js";const oe=["color","file","time","date","datetime-local","week","month"],re=X({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:"text"},modelModifiers:Object,...q(),...H()},"VTextField"),me=Z()({name:"VTextField",directives:{Intersect:ie},inheritAttrs:!1,props:re(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,R){let{attrs:m,emit:g,slots:l}=R;const i=$(e,"modelValue"),{isFocused:r,focus:A,blur:D}=J(e),N=v(()=>typeof e.counterValue=="function"?e.counterValue(i.value):typeof e.counterValue=="number"?e.counterValue:(i.value??"").toString().length),T=v(()=>{if(m.maxlength)return m.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter}),C=v(()=>["plain","underlined"].includes(e.variant));function B(t,a){var u,o;!e.autofocus||!t||(o=(u=a[0].target)==null?void 0:u.focus)==null||o.call(u)}const h=x(),k=x(),s=x(),E=v(()=>oe.includes(e.type)||e.persistentPlaceholder||r.value||e.active);function d(){var t;s.value!==document.activeElement&&((t=s.value)==null||t.focus()),r.value||A()}function M(t){g("mousedown:control",t),t.target!==s.value&&(d(),t.preventDefault())}function p(t){d(),g("click:control",t)}function z(t){t.stopPropagation(),d(),w(()=>{i.value=null,ue(e["onClick:clear"],t)})}function O(t){var u;const a=t.target;if(i.value=a.value,(u=e.modelModifiers)!=null&&u.trim&&["text","search","password","tel","url"].includes(e.type)){const o=[a.selectionStart,a.selectionEnd];w(()=>{a.selectionStart=o[0],a.selectionEnd=o[1]})}}return ee(()=>{const t=!!(l.counter||e.counter!==!1&&e.counter!=null),a=!!(t||l.details),[u,o]=te(m),{modelValue:se,...U}=_.filterProps(e),j=S.filterProps(e);return n(_,V({ref:h,modelValue:i.value,"onUpdate:modelValue":c=>i.value=c,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-input--plain-underlined":C.value},e.class],style:e.style},u,U,{centerAffix:!C.value,focused:r.value}),{...l,default:c=>{let{id:f,isDisabled:F,isDirty:P,isReadonly:G,isValid:L}=c;return n(S,V({ref:k,onMousedown:M,onClick:p,"onClick:clear":z,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:e.role},j,{id:f.value,active:E.value||P.value,dirty:P.value||e.dirty,disabled:F.value,focused:r.value,error:L.value===!1}),{...l,default:Q=>{let{props:{class:b,...Y}}=Q;const I=ne(n("input",V({ref:s,value:i.value,onInput:O,autofocus:e.autofocus,readonly:G.value,disabled:F.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:d,onBlur:D},Y,o),null),[[le("intersect"),{handler:B},null,{once:!0}]]);return n(y,null,[e.prefix&&n("span",{class:"v-text-field__prefix"},[n("span",{class:"v-text-field__prefix__text"},[e.prefix])]),l.default?n("div",{class:b,"data-no-activator":""},[l.default(),I]):ae(I,{class:b}),e.suffix&&n("span",{class:"v-text-field__suffix"},[n("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:a?c=>{var f;return n(y,null,[(f=l.details)==null?void 0:f.call(l,c),t&&n(y,null,[n("span",null,null),n(K,{active:e.persistentCounter||r.value,value:N.value,max:T.value,disabled:e.disabled},l.counter)])])}:void 0})}),W({},h,k,s)}});export{me as V};
