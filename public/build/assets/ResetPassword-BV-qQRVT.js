var y=Object.defineProperty;var h=(o,e,a)=>e in o?y(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a;var p=(o,e,a)=>h(o,typeof e!="symbol"?e+"":e,a);import{_ as E}from"./AuthenticationCardLogo-DGiXKqyv.js";import{I as A}from"./InputError-Bwl4ZAo1.js";import{C as I,W as $,I as k,A as w,B,b as s,w as n,F as O,o as R,E as T}from"./app-DrYLPU_X.js";import{t as j,d as V,C as q,V as F,a as g,_ as H}from"./_plugin-vue_export-helper-BUg55JK2.js";import{a as L}from"./auth-DyhWbsp0.js";import{V as C,a as _,b as v,c as P}from"./VCard-Dz8tKv04.js";import{V as u}from"./VTextField-GCQIZL8v.js";import"./VField-C66dwn1o.js";import"./VAvatar-CGwUysPS.js";import"./forwardRefs-DiIHdaJ1.js";var N=Object.defineProperty,S=Object.getOwnPropertyDescriptor,c=(o,e,a,t)=>{for(var r=t>1?void 0:t?S(e,a):e,d=o.length-1,m;d>=0;d--)(m=o[d])&&(r=(t?m(e,a,r):m(r))||r);return t&&r&&N(e,a,r),r};let i=class extends F{constructor(){super(...arguments);p(this,"email");p(this,"token");p(this,"form",I({token:"",email:"",password:"",password_confirmation:""}))}mounted(){this.form.token=this.token,this.form.email=this.email}async submit(){let e=await L.resetPassword(this.form);this.form.reset("password","password_confirmation"),$.visit(e.redirect||"/login")}};c([V(String)],i.prototype,"email",2);c([V(String)],i.prototype,"token",2);i=c([q({components:{AuthenticationCardLogo:E,InputError:A,Head:k,VCard:C,VCardTitle:_,VCardText:v,VCardActions:P,VTextField:u,VBtn:g}})],i);const U=j(i);function D(o,e,a,t,r,d){const m=w("Head"),b=w("AuthenticationCardLogo"),f=w("InputError");return R(),B(O,null,[s(m,{title:"Reset Password"}),s(C,{class:"mx-auto my-10","max-width":"400",elevation:"10"},{default:n(()=>[s(_,{class:"text-center"},{default:n(()=>[s(b)]),_:1}),s(v,null,{default:n(()=>[s(u,{id:"email",modelValue:o.form.email,"onUpdate:modelValue":e[0]||(e[0]=l=>o.form.email=l),label:"Email",type:"email",required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),s(f,{message:o.form.errors.email,class:"mt-2"},null,8,["message"]),s(u,{id:"password",modelValue:o.form.password,"onUpdate:modelValue":e[1]||(e[1]=l=>o.form.password=l),label:"Password",type:"password",required:"",autocomplete:"new-password",class:"mt-4"},null,8,["modelValue"]),s(f,{message:o.form.errors.password,class:"mt-2"},null,8,["message"]),s(u,{id:"password_confirmation",modelValue:o.form.password_confirmation,"onUpdate:modelValue":e[2]||(e[2]=l=>o.form.password_confirmation=l),label:"Confirm Password",type:"password",required:"",autocomplete:"new-password",class:"mt-4"},null,8,["modelValue"]),s(f,{message:o.form.errors.password_confirmation,class:"mt-2"},null,8,["message"])]),_:1}),s(P,{class:"justify-end"},{default:n(()=>[s(g,{color:"primary",variant:"elevated",loading:o.form.processing,onClick:o.submit},{default:n(()=>e[3]||(e[3]=[T(" Reset Password ")])),_:1},8,["loading","onClick"])]),_:1})]),_:1})],64)}const ee=H(U,[["render",D]]);export{ee as default};
