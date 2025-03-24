var V=Object.defineProperty;var x=(s,o,e)=>o in s?V(s,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[o]=e;var f=(s,o,e)=>x(s,typeof o!="symbol"?o+"":o,e);import{C as O,i as I,j as d,c as L,w as r,o as l,g as a,a as n,e as u,F as A,h as M,f as $,b as p,I as P,n as D,t as y}from"./app-DCXzMWXa.js";import{_ as T}from"./ActionMessage-BdQ6Ope5.js";import{a as j,b as F}from"./DialogModal-CJzMldpY.js";import{_ as H}from"./InputError-BJCQ_2OS.js";import{_ as N}from"./PrimaryButton-CoZ8PQbO.js";import{_ as E}from"./SecondaryButton-ATj6J-qY.js";import{_ as z}from"./TextInput-CoUy5fzm.js";import{t as K,d as U,a as q,C as G,V as J}from"./index-CSEC8W1N.js";import{_ as Q}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./SectionTitle-Da4cl8iM.js";var R=Object.defineProperty,W=Object.getOwnPropertyDescriptor,_=(s,o,e,m)=>{for(var i=m>1?void 0:m?W(o,e):o,g=s.length-1,c;g>=0;g--)(c=s[g])&&(i=(m?c(o,e,i):c(i))||i);return m&&i&&R(o,e,i),i};let w=class extends J{constructor(){super(...arguments);f(this,"sessions");f(this,"confirmingLogout",!1);f(this,"passwordInput");f(this,"form",O({password:""}))}confirmLogout(){this.confirmingLogout=!0,setTimeout(()=>this.passwordInput.focus(),250)}async logoutOtherBrowserSessions(){let e=route("other-browser-sessions.destroy");try{let m=await I.delete(e,{data:this.form});this.closeModal()}catch{this.passwordInput.focus()}finally{this.form.reset()}}closeModal(){this.confirmingLogout=!1,this.form.reset()}};_([U(Array)],w.prototype,"sessions",2);_([q("passwordInput")],w.prototype,"passwordInput",2);w=_([G({components:{ActionMessage:T,ActionSection:j,DialogModal:F,InputError:H,PrimaryButton:N,SecondaryButton:E,TextInput:z}})],w);const X=K(w),Y={key:0,class:"mt-5 space-y-6"},Z={key:0,class:"size-8 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},oo={key:1,class:"size-8 text-gray-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"},so={class:"ms-3"},eo={class:"text-sm text-gray-600 dark:text-gray-400"},to={class:"text-xs text-gray-500"},ro={key:0,class:"text-green-500 font-semibold"},no={key:1},ao={class:"flex items-center mt-5"},io={class:"mt-4"};function lo(s,o,e,m,i,g){const c=d("PrimaryButton"),v=d("ActionMessage"),h=d("TextInput"),k=d("InputError"),B=d("SecondaryButton"),C=d("DialogModal"),S=d("ActionSection");return l(),L(S,null,{title:r(()=>o[1]||(o[1]=[a(" Browser Sessions ")])),description:r(()=>o[2]||(o[2]=[a(" Manage and log out your active sessions on other browsers and devices. ")])),content:r(()=>[o[11]||(o[11]=n("div",{class:"max-w-xl text-sm text-gray-600 dark:text-gray-400"}," If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password. ",-1)),s.sessions.length>0?(l(),u("div",Y,[(l(!0),u(A,null,M(s.sessions,(t,b)=>(l(),u("div",{key:b,class:"flex items-center"},[n("div",null,[t.agent.is_desktop?(l(),u("svg",Z,o[3]||(o[3]=[n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"},null,-1)]))):(l(),u("svg",oo,o[4]||(o[4]=[n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"},null,-1)])))]),n("div",so,[n("div",eo,y(t.agent.platform?t.agent.platform:"Unknown")+" - "+y(t.agent.browser?t.agent.browser:"Unknown"),1),n("div",null,[n("div",to,[a(y(t.ip_address)+", ",1),t.is_current_device?(l(),u("span",ro,"This device")):(l(),u("span",no,"Last active "+y(t.last_active),1))])])])]))),128))])):$("",!0),n("div",ao,[p(c,{onClick:s.confirmLogout},{default:r(()=>o[5]||(o[5]=[a(" Log Out Other Browser Sessions ")])),_:1},8,["onClick"]),p(v,{on:s.form.recentlySuccessful,class:"ms-3"},{default:r(()=>o[6]||(o[6]=[a(" Done. ")])),_:1},8,["on"])]),p(C,{show:s.confirmingLogout,onClose:s.closeModal},{title:r(()=>o[7]||(o[7]=[a(" Log Out Other Browser Sessions ")])),content:r(()=>[o[8]||(o[8]=a(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. ")),n("div",io,[p(h,{ref:"passwordInput",modelValue:s.form.password,"onUpdate:modelValue":o[0]||(o[0]=t=>s.form.password=t),type:"password",class:"mt-1 block w-3/4",placeholder:"Password",autocomplete:"current-password",onKeyup:P(s.logoutOtherBrowserSessions,["enter"])},null,8,["modelValue","onKeyup"]),p(k,{message:s.form.errors.password,class:"mt-2"},null,8,["message"])])]),footer:r(()=>[p(B,{onClick:s.closeModal},{default:r(()=>o[9]||(o[9]=[a(" Cancel ")])),_:1},8,["onClick"]),p(c,{class:D(["ms-3",{"opacity-25":s.form.processing}]),disabled:s.form.processing,onClick:s.logoutOtherBrowserSessions},{default:r(()=>o[10]||(o[10]=[a(" Log Out Other Browser Sessions ")])),_:1},8,["class","disabled","onClick"])]),_:1},8,["show","onClose"])]),_:1})}const Bo=Q(X,[["render",lo]]);export{Bo as default};
