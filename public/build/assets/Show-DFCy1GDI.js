var B=Object.defineProperty;var U=(o,t,e)=>t in o?B(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var d=(o,t,e)=>U(o,typeof t!="symbol"?t+"":t,e);import{A as S}from"./AppLayout-DpxFCitz.js";import $ from"./DeleteUserForm-AgmDFC7G.js";import j from"./LogoutOtherBrowserSessionsForm-BeF6oVU8.js";import{S as x}from"./SectionBorder-DQCuNal9.js";import O from"./TwoFactorAuthenticationForm-CLMc0klG.js";import T from"./UpdatePasswordForm-DnkMwcO5.js";import C from"./UpdateProfileInformationForm-BU-XHXX6.js";import{t as D,d as w,C as L,V}from"./index-CSEC8W1N.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{j as a,c as I,w as h,o as i,a as _,e as f,b as r,f as u,F as N}from"./app-DCXzMWXa.js";import"./DropdownLink-B1xel3Kp.js";import"./ResponsiveNavLink-D0WceWwM.js";import"./auth-CjQrrOKe.js";import"./DialogModal-CJzMldpY.js";import"./SectionTitle-Da4cl8iM.js";import"./DangerButton-DmA2sjPQ.js";import"./InputError-BJCQ_2OS.js";import"./SecondaryButton-ATj6J-qY.js";import"./TextInput-CoUy5fzm.js";import"./ActionMessage-BdQ6Ope5.js";import"./PrimaryButton-CoZ8PQbO.js";import"./InputLabel-rm7JmSlO.js";import"./FormSection-CN1tMcTt.js";var k=Object.defineProperty,q=Object.getOwnPropertyDescriptor,F=(o,t,e,n)=>{for(var s=n>1?void 0:n?q(t,e):t,c=o.length-1,m;c>=0;c--)(m=o[c])&&(s=(n?m(t,e,s):m(s))||s);return n&&s&&k(t,e,s),s};let p=class extends V{constructor(){super(...arguments);d(this,"confirmsTwoFactorAuthentication");d(this,"sessions")}};F([w(Boolean)],p.prototype,"confirmsTwoFactorAuthentication",2);F([w(Array)],p.prototype,"sessions",2);p=F([L({components:{AppLayout:S,DeleteUserForm:$,LogoutOtherBrowserSessionsForm:j,SectionBorder:x,TwoFactorAuthenticationForm:O,UpdatePasswordForm:T,UpdateProfileInformationForm:C}})],p);const E=D(p),M={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},z={key:0},G={key:1},H={key:2};function J(o,t,e,n,s,c){const m=a("UpdateProfileInformationForm"),l=a("SectionBorder"),g=a("UpdatePasswordForm"),P=a("TwoFactorAuthenticationForm"),v=a("LogoutOtherBrowserSessionsForm"),y=a("DeleteUserForm"),A=a("AppLayout");return i(),I(A,{title:"Profile"},{header:h(()=>t[0]||(t[0]=[_("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"}," Profile ",-1)])),default:h(()=>[_("div",null,[_("div",M,[o.$page.props.jetstream.canUpdateProfileInformation?(i(),f("div",z,[r(m,{user:o.$page.props.auth.user},null,8,["user"]),r(l)])):u("",!0),o.$page.props.jetstream.canUpdatePassword?(i(),f("div",G,[r(g,{class:"mt-10 sm:mt-0"}),r(l)])):u("",!0),o.$page.props.jetstream.canManageTwoFactorAuthentication?(i(),f("div",H,[r(P,{"requires-confirmation":o.confirmsTwoFactorAuthentication,class:"mt-10 sm:mt-0"},null,8,["requires-confirmation"]),r(l)])):u("",!0),r(v,{sessions:o.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),o.$page.props.jetstream.hasAccountDeletionFeatures?(i(),f(N,{key:3},[r(l),r(y,{class:"mt-10 sm:mt-0"})],64)):u("",!0)])])]),_:1})}const wo=b(E,[["render",J]]);export{wo as default};
