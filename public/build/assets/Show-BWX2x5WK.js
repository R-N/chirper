var B=Object.defineProperty;var U=(o,t,e)=>t in o?B(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var d=(o,t,e)=>U(o,typeof t!="symbol"?t+"":t,e);import{A as S}from"./AppLayout-Bu2fc0q-.js";import $ from"./DeleteUserForm-CkbA7Ntk.js";import x from"./LogoutOtherBrowserSessionsForm-DpmOQ90n.js";import{S as O}from"./SectionBorder-B7Ho5nNV.js";import T from"./TwoFactorAuthenticationForm-DLJicXMr.js";import j from"./UpdatePasswordForm-DCCaFtoT.js";import C from"./UpdateProfileInformationForm-D0UWiXVS.js";import{t as D,d as w,C as L,V,_ as b}from"./_plugin-vue_export-helper-BkxQ5w1y.js";import{x as a,c as I,w as h,o as i,a as _,f,b as r,l as u,F as N}from"./app-55nQHNrK.js";import"./auth-BpATu7zd.js";import"./VAvatar-DmRN7j2J.js";import"./index-qS4-Yaju.js";import"./VMenu-B0yEDWNa.js";import"./VOverlay-Dck7tMSy.js";import"./forwardRefs-B931MWyl.js";import"./VContainer-G3jeVjVC.js";/* empty css              */import"./VRow-Du34Hmus.js";import"./VSpacer-vCbJeM_T.js";import"./ActionSection-DnR7S2V-.js";import"./SectionTitle-BvMKXVsc.js";import"./VCard-OJ0p7aro.js";import"./InputError-BX8IdEyR.js";import"./VDialog-BDRwFbH1.js";import"./VTextField-HiXiHTac.js";import"./VField-3MKmkEWW.js";import"./ActionMessage-Bct9ZT2_.js";import"./FormSection-Bm8ZNWce.js";var k=Object.defineProperty,q=Object.getOwnPropertyDescriptor,F=(o,t,e,n)=>{for(var s=n>1?void 0:n?q(t,e):t,c=o.length-1,m;c>=0;c--)(m=o[c])&&(s=(n?m(t,e,s):m(s))||s);return n&&s&&k(t,e,s),s};let p=class extends V{constructor(){super(...arguments);d(this,"confirmsTwoFactorAuthentication");d(this,"sessions")}};F([w(Boolean)],p.prototype,"confirmsTwoFactorAuthentication",2);F([w(Array)],p.prototype,"sessions",2);p=F([L({components:{AppLayout:S,DeleteUserForm:$,LogoutOtherBrowserSessionsForm:x,SectionBorder:O,TwoFactorAuthenticationForm:T,UpdatePasswordForm:j,UpdateProfileInformationForm:C}})],p);const E=D(p),M={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},z={key:0},G={key:1},H={key:2};function J(o,t,e,n,s,c){const m=a("UpdateProfileInformationForm"),l=a("SectionBorder"),g=a("UpdatePasswordForm"),P=a("TwoFactorAuthenticationForm"),v=a("LogoutOtherBrowserSessionsForm"),y=a("DeleteUserForm"),A=a("AppLayout");return i(),I(A,{title:"Profile"},{header:h(()=>t[0]||(t[0]=[_("h2",{class:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"}," Profile ",-1)])),default:h(()=>[_("div",null,[_("div",M,[o.$page.props.jetstream.canUpdateProfileInformation?(i(),f("div",z,[r(m,{user:o.$page.props.auth.user},null,8,["user"]),r(l)])):u("",!0),o.$page.props.jetstream.canUpdatePassword?(i(),f("div",G,[r(g,{class:"mt-10 sm:mt-0"}),r(l)])):u("",!0),o.$page.props.jetstream.canManageTwoFactorAuthentication?(i(),f("div",H,[r(P,{"requires-confirmation":o.confirmsTwoFactorAuthentication,class:"mt-10 sm:mt-0"},null,8,["requires-confirmation"]),r(l)])):u("",!0),r(v,{sessions:o.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),o.$page.props.jetstream.hasAccountDeletionFeatures?(i(),f(N,{key:3},[r(l),r(y,{class:"mt-10 sm:mt-0"})],64)):u("",!0)])])]),_:1})}const Ao=b(E,[["render",J]]);export{Ao as default};
