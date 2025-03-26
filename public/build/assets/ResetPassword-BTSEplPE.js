var y=Object.defineProperty;var h=(e,o,a)=>o in e?y(e,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[o]=a;var p=(e,o,a)=>h(e,typeof o!="symbol"?o+"":o,a);import{_ as E}from"./AuthenticationCardLogo-BZG0F2Gf.js";import{I as $}from"./InputError-xAJO7AMq.js";import{C as k,q,W as A,s as I,x as w,f as O,b as s,w as n,F as R,o as T,m as j}from"./app-CPfewmGe.js";import{t as B,d as V,C as F,V as H,a as g,_ as L}from"./_plugin-vue_export-helper-Bf4a9asG.js";import{V as C,b as _,a as v,c as P}from"./VCard-GT_KN03z.js";import{V as u}from"./VTextField-4sMH03gq.js";import"./VAvatar-BWhNs8M-.js";import"./VField-WdJWQtL9.js";import"./index-D2A-LN9Q.js";import"./forwardRefs-B931MWyl.js";var N=Object.defineProperty,U=Object.getOwnPropertyDescriptor,c=(e,o,a,t)=>{for(var r=t>1?void 0:t?U(o,a):o,d=e.length-1,m;d>=0;d--)(m=e[d])&&(r=(t?m(o,a,r):m(r))||r);return t&&r&&N(o,a,r),r};let i=class extends H{constructor(){super(...arguments);p(this,"email");p(this,"token");p(this,"form",k({token:"",email:"",password:"",password_confirmation:""}))}mounted(){this.form.token=this.token,this.form.email=this.email}async submit(){let o=route("password.update"),a=await q.post(o,this.form);this.form.reset("password","password_confirmation"),A.visit(a.data.redirect||"/login")}};c([V(String)],i.prototype,"email",2);c([V(String)],i.prototype,"token",2);i=c([F({components:{AuthenticationCardLogo:E,InputError:$,Head:I,VCard:C,VCardTitle:_,VCardText:v,VCardActions:P,VTextField:u,VBtn:g}})],i);const D=B(i);function S(e,o,a,t,r,d){const m=w("Head"),b=w("AuthenticationCardLogo"),f=w("InputError");return T(),O(R,null,[s(m,{title:"Reset Password"}),s(C,{class:"mx-auto my-10","max-width":"400",elevation:"10"},{default:n(()=>[s(_,{class:"text-center"},{default:n(()=>[s(b)]),_:1}),s(v,null,{default:n(()=>[s(u,{id:"email",modelValue:e.form.email,"onUpdate:modelValue":o[0]||(o[0]=l=>e.form.email=l),label:"Email",type:"email",required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),s(f,{message:e.form.errors.email,class:"mt-2"},null,8,["message"]),s(u,{id:"password",modelValue:e.form.password,"onUpdate:modelValue":o[1]||(o[1]=l=>e.form.password=l),label:"Password",type:"password",required:"",autocomplete:"new-password",class:"mt-4"},null,8,["modelValue"]),s(f,{message:e.form.errors.password,class:"mt-2"},null,8,["message"]),s(u,{id:"password_confirmation",modelValue:e.form.password_confirmation,"onUpdate:modelValue":o[2]||(o[2]=l=>e.form.password_confirmation=l),label:"Confirm Password",type:"password",required:"",autocomplete:"new-password",class:"mt-4"},null,8,["modelValue"]),s(f,{message:e.form.errors.password_confirmation,class:"mt-2"},null,8,["message"])]),_:1}),s(P,{class:"justify-end"},{default:n(()=>[s(g,{color:"primary",variant:"elevated",loading:e.form.processing,onClick:e.submit},{default:n(()=>o[3]||(o[3]=[j(" Reset Password ")])),_:1},8,["loading","onClick"])]),_:1})]),_:1})],64)}const oo=L(D,[["render",S]]);export{oo as default};
