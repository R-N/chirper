var x=Object.defineProperty;var A=(e,o,r)=>o in e?x(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r;var d=(e,o,r)=>A(e,typeof o!="symbol"?o+"":o,r);import{C as B,Y as F,q as $,W as j,s as L,x as _,f as l,b as a,a as h,w as c,F as m,o as s,m as u,c as V}from"./app-CPfewmGe.js";import{_ as N}from"./AuthenticationCardLogo-BZG0F2Gf.js";import{t as O,b,C as U,V as H,a as v,_ as R}from"./_plugin-vue_export-helper-Bf4a9asG.js";import{V as C}from"./VTextField-4sMH03gq.js";import{V as w,b as I,a as k,c as T}from"./VCard-GT_KN03z.js";import"./VAvatar-BWhNs8M-.js";import"./VField-WdJWQtL9.js";import"./index-D2A-LN9Q.js";import"./forwardRefs-B931MWyl.js";var D=Object.defineProperty,W=Object.getOwnPropertyDescriptor,g=(e,o,r,n)=>{for(var t=n>1?void 0:n?W(o,r):o,f=e.length-1,i;f>=0;f--)(i=e[f])&&(t=(n?i(o,r,t):i(t))||t);return n&&t&&D(o,r,t),t};let p=class extends H{constructor(){super(...arguments);d(this,"recovery",!1);d(this,"form",B({code:"",recovery_code:""}));d(this,"recoveryCodeInput");d(this,"codeInput")}async toggleRecovery(){this.recovery=!this.recovery,await F(),this.recovery?(this.recoveryCodeInput.value.focus(),this.form.code=""):(this.codeInput.value.focus(),this.form.recovery_code="")}async submit(){let o=await $.post(route("two-factor.login"),this.form);j.visit(o.data.redirect||"/dashboard")}};g([b("recoveryCodeInput")],p.prototype,"recoveryCodeInput",2);g([b("codeInput")],p.prototype,"codeInput",2);p=g([U({components:{AuthenticationCardLogo:N,VTextField:C,VBtn:v,VCard:w,VCardTitle:I,VCardText:k,VCardActions:T,Head:L}})],p);const q=O(p),E={class:"d-flex justify-center mt-10"},Y={class:"text-gray-600 text-sm"};function z(e,o,r,n,t,f){const i=_("Head"),P=_("AuthenticationCardLogo");return s(),l(m,null,[a(i,{title:"Two-factor Confirmation"}),h("div",E,[a(w,{class:"pa-6",width:"400"},{default:c(()=>[a(I,{class:"text-center"},{default:c(()=>[a(P)]),_:1}),a(k,null,{default:c(()=>[h("p",Y,[e.recovery?(s(),l(m,{key:1},[u(" Please confirm access to your account by entering one of your emergency recovery codes. ")],64)):(s(),l(m,{key:0},[u(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")],64))]),e.recovery?(s(),V(C,{key:1,id:"recovery_code",ref:"recoveryCodeInput",modelValue:e.form.recovery_code,"onUpdate:modelValue":o[1]||(o[1]=y=>e.form.recovery_code=y),label:"Recovery Code",type:"text",autocomplete:"one-time-code","error-messages":e.form.errors.recovery_code},null,8,["modelValue","error-messages"])):(s(),V(C,{key:0,id:"code",ref:"codeInput",modelValue:e.form.code,"onUpdate:modelValue":o[0]||(o[0]=y=>e.form.code=y),label:"Authentication Code",type:"text",inputmode:"numeric",autofocus:"",autocomplete:"one-time-code","error-messages":e.form.errors.code},null,8,["modelValue","error-messages"]))]),_:1}),a(T,{class:"d-flex justify-space-between"},{default:c(()=>[a(v,{variant:"text",onClick:e.toggleRecovery},{default:c(()=>[e.recovery?(s(),l(m,{key:1},[u("Use an authentication code")],64)):(s(),l(m,{key:0},[u("Use a recovery code")],64))]),_:1},8,["onClick"]),a(v,{color:"primary",variant:"elevated",loading:e.form.processing,onClick:e.submit},{default:c(()=>o[2]||(o[2]=[u(" Log in ")])),_:1},8,["loading","onClick"])]),_:1})]),_:1})])],64)}const re=R(q,[["render",z]]);export{re as default};
