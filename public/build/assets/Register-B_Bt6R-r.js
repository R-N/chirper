var b=Object.defineProperty;var P=(o,e,r)=>e in o?b(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var _=(o,e,r)=>P(o,typeof e!="symbol"?e+"":e,r);import{_ as I}from"./GuestLayout-CxY3jg3T.js";import{_ as L}from"./InputError-blRIJqDf.js";import{_ as $,a as C}from"./TextInput-DhBzVQR2.js";import{P as B}from"./PrimaryButton-D7nFVjVU.js";import{T,a as k,F as N,r as n,c as U,w as c,o as h,b as s,d as m,e as g,n as q,f as E}from"./app-DJXqVf7l.js";import{t as O,C as R,V as j,_ as A}from"./index-Dbxdjc5y.js";import{u as G}from"./auth-su_BHed1.js";import"./ApplicationLogo-COLPxi7-.js";var S=Object.defineProperty,D=Object.getOwnPropertyDescriptor,F=(o,e,r,l)=>{for(var t=l>1?void 0:l?D(e,r):e,u=o.length-1,i;u>=0;u--)(i=o[u])&&(t=(l?i(e,r,t):i(t))||t);return l&&t&&S(e,r,t),t};let w=class extends j{constructor(){super(...arguments);_(this,"form",T({name:"",email:"",password:"",password_confirmation:""}))}async register(){const e=G();let r=await k.post("/register",this.form);this.form.reset("password","password_confirmation"),e.updateUser(r.data.user),e.setAuthToken(r.data.auth_token),N.visit(r.data.redirect||"/dashboard")}};w=F([R({components:{GuestLayout:I,InputError:L,InputLabel:$,PrimaryButton:B,TextInput:C}})],w);const H=O(w),z={class:"mt-4"},M={class:"mt-4"},J={class:"mt-4"},K={class:"mt-4 flex items-center justify-end"};function Q(o,e,r,l,t,u){const i=n("Head"),d=n("InputLabel"),p=n("TextInput"),f=n("InputError"),v=n("Link"),V=n("PrimaryButton"),y=n("GuestLayout");return h(),U(y,null,{default:c(()=>[s(i,{title:"Register"}),m("form",{onSubmit:e[4]||(e[4]=E((...a)=>o.register&&o.register(...a),["prevent"]))},[m("div",null,[s(d,{for:"name",value:"Name"}),s(p,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:o.form.name,"onUpdate:modelValue":e[0]||(e[0]=a=>o.form.name=a),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),s(f,{class:"mt-2",message:o.form.errors.name},null,8,["message"])]),m("div",z,[s(d,{for:"email",value:"Email"}),s(p,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:o.form.email,"onUpdate:modelValue":e[1]||(e[1]=a=>o.form.email=a),required:"",autocomplete:"username"},null,8,["modelValue"]),s(f,{class:"mt-2",message:o.form.errors.email},null,8,["message"])]),m("div",M,[s(d,{for:"password",value:"Password"}),s(p,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:o.form.password,"onUpdate:modelValue":e[2]||(e[2]=a=>o.form.password=a),required:"",autocomplete:"new-password"},null,8,["modelValue"]),s(f,{class:"mt-2",message:o.form.errors.password},null,8,["message"])]),m("div",J,[s(d,{for:"password_confirmation",value:"Confirm Password"}),s(p,{id:"password_confirmation",type:"password",class:"mt-1 block w-full",modelValue:o.form.password_confirmation,"onUpdate:modelValue":e[3]||(e[3]=a=>o.form.password_confirmation=a),required:"",autocomplete:"new-password"},null,8,["modelValue"]),s(f,{class:"mt-2",message:o.form.errors.password_confirmation},null,8,["message"])]),m("div",K,[s(v,{href:o.route("login"),class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"},{default:c(()=>e[5]||(e[5]=[g(" Already registered? ")])),_:1},8,["href"]),s(V,{class:q(["ms-4",{"opacity-25":o.form.processing}]),disabled:o.form.processing},{default:c(()=>e[6]||(e[6]=[g(" Register ")])),_:1},8,["class","disabled"])])],32)]),_:1})}const ae=A(H,[["render",Q]]);export{ae as default};
