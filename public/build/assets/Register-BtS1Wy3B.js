var T=Object.defineProperty;var j=(o,e,r)=>e in o?T(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var g=(o,e,r)=>j(o,typeof e!="symbol"?e+"":e,r);import{_ as L}from"./AuthenticationCardLogo-BZG0F2Gf.js";import{C as R,q as U,W as $,s as q,P as x,x as u,f as N,b as a,w as t,F as B,o as w,m,c as F,l as O}from"./app-CPfewmGe.js";import{t as H,C as S,V as h,a as C,_ as D}from"./_plugin-vue_export-helper-Bf4a9asG.js";import{u as E}from"./auth-BvlRZsZ9.js";import{V as d}from"./VTextField-4sMH03gq.js";import{V as y}from"./VCheckbox-BtN2eMNO.js";import{V as b,b as v,a as P,c as k}from"./VCard-GT_KN03z.js";import{V as c}from"./VContainer-v6UAIoxN.js";import{V as I,a as W}from"./VRow-B9VDY_ti.js";import{V as _}from"./VAvatar-BWhNs8M-.js";import"./VField-WdJWQtL9.js";import"./index-D2A-LN9Q.js";import"./forwardRefs-B931MWyl.js";/* empty css              */var z=Object.defineProperty,G=Object.getOwnPropertyDescriptor,J=(o,e,r,n)=>{for(var l=n>1?void 0:n?G(e,r):e,f=o.length-1,i;f>=0;f--)(i=o[f])&&(l=(n?i(e,r,l):i(l))||l);return n&&l&&z(e,r,l),l};let V=class extends h{constructor(){super(...arguments);g(this,"form",R({name:"",email:"",password:"",password_confirmation:"",terms:!1}))}async register(){const e=E();let r=await U.post("/register",this.form);this.form.reset("password","password_confirmation"),e.updateUser(r.data.user),e.setAuthToken(r.data.auth_token),$.visit(r.data.redirect||"/dashboard")}};V=J([S({components:{AuthenticationCardLogo:L,Head:q,Link:x,VTextField:d,VCheckbox:y,VBtn:C,VCard:b,VCardTitle:v,VCardText:P,VCardActions:k,VContainer:c,VRow:I,VCol:W,VImg:_}})],V);const K=H(V);function M(o,e,r,n,l,f){const i=u("Head"),A=u("AuthenticationCardLogo"),p=u("Link");return w(),N(B,null,[a(i,{title:"Register"}),a(c,{class:"fill-height d-flex flex-column justify-center align-center"},{default:t(()=>[a(A,{justify:"center",align:"center",class:"mb-4"}),a(b,{class:"d-flex flex-column pa-6"},{default:t(()=>[a(v,null,{default:t(()=>e[5]||(e[5]=[m(" Register ")])),_:1}),a(P,{class:"d-flex flex-column pa-0 ga-2"},{default:t(()=>[a(d,{modelValue:o.form.name,"onUpdate:modelValue":e[0]||(e[0]=s=>o.form.name=s),label:"Name",type:"text",name:"name",autocomplete:"name",required:"",autofocus:""},null,8,["modelValue"]),a(d,{modelValue:o.form.email,"onUpdate:modelValue":e[1]||(e[1]=s=>o.form.email=s),label:"Email",type:"email",name:"email",autocomplete:"email",required:""},null,8,["modelValue"]),a(d,{modelValue:o.form.password,"onUpdate:modelValue":e[2]||(e[2]=s=>o.form.password=s),label:"Password",type:"password",name:"password",autocomplete:"new-password",required:""},null,8,["modelValue"]),a(d,{modelValue:o.form.password_confirmation,"onUpdate:modelValue":e[3]||(e[3]=s=>o.form.password_confirmation=s),label:"Confirm Password",type:"password",required:""},null,8,["modelValue"]),o.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature?(w(),F(y,{key:0,modelValue:o.form.terms,"onUpdate:modelValue":e[4]||(e[4]=s=>o.form.terms=s)},{label:t(()=>[e[8]||(e[8]=m(" I agree to the ")),a(p,{target:"_blank",href:o.route("terms.show"),class:"text-primary"},{default:t(()=>e[6]||(e[6]=[m("Terms of Service")])),_:1},8,["href"]),e[9]||(e[9]=m(" and ")),a(p,{target:"_blank",href:o.route("policy.show"),class:"text-primary"},{default:t(()=>e[7]||(e[7]=[m("Privacy Policy")])),_:1},8,["href"])]),_:1},8,["modelValue"])):O("",!0)]),_:1}),a(k,{class:"d-flex justify-space-between"},{default:t(()=>[a(p,{href:o.route("login"),class:"text-sm"},{default:t(()=>e[10]||(e[10]=[m("Already registered?")])),_:1},8,["href"]),a(C,{loading:o.form.processing,onClick:o.register,color:"primary",variant:"elevated"},{default:t(()=>e[11]||(e[11]=[m("Register")])),_:1},8,["loading","onClick"])]),_:1})]),_:1})]),_:1})],64)}const fe=D(K,[["render",M]]);export{fe as default};
