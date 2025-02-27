import{A as B}from"./ApplicationLogo-DPQU6IFn.js";import{x as D,y as M,h as m,l as S,o as d,f as v,b as e,r as c,i as k,z as $,a as n,w as r,n as u,A as N,c as w,u as b,j as y,d as i,t as x,g as j}from"./app-6oqPdZ6u.js";const z={class:"relative"},E={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:String,default:"py-1 bg-white"}},setup(a){const o=a,t=h=>{l.value&&h.key==="Escape"&&(l.value=!1)};D(()=>document.addEventListener("keydown",t)),M(()=>document.removeEventListener("keydown",t));const s=m(()=>({48:"w-48"})[o.width.toString()]),p=m(()=>o.align==="left"?"ltr:origin-top-left rtl:origin-top-right start-0":o.align==="right"?"ltr:origin-top-right rtl:origin-top-left end-0":"origin-top"),l=S(!1);return(h,f)=>(d(),v("div",z,[e("div",{onClick:f[0]||(f[0]=_=>l.value=!l.value)},[c(h.$slots,"trigger")]),k(e("div",{class:"fixed inset-0 z-40",onClick:f[1]||(f[1]=_=>l.value=!1)},null,512),[[$,l.value]]),n(N,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:r(()=>[k(e("div",{class:u(["absolute z-50 mt-2 rounded-md shadow-lg",[s.value,p.value]]),style:{display:"none"},onClick:f[2]||(f[2]=_=>l.value=!1)},[e("div",{class:u(["rounded-md ring-1 ring-black ring-opacity-5",a.contentClasses])},[c(h.$slots,"content")],2)],2),[[$,l.value]])]),_:3})]))}},C={__name:"DropdownLink",props:{href:{type:String,required:!0}},setup(a){return(o,t)=>(d(),w(b(y),{href:a.href,class:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"},{default:r(()=>[c(o.$slots,"default")]),_:3},8,["href"]))}},L={__name:"NavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(a){const o=a,t=m(()=>o.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");return(s,p)=>(d(),w(b(y),{href:a.href,class:u(t.value)},{default:r(()=>[c(s.$slots,"default")]),_:3},8,["href","class"]))}},g={__name:"ResponsiveNavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(a){const o=a,t=m(()=>o.active?"block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out":"block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(s,p)=>(d(),w(b(y),{href:a.href,class:u(t.value)},{default:r(()=>[c(s.$slots,"default")]),_:3},8,["href","class"]))}},A={class:"min-h-screen bg-gray-100"},V={class:"border-b border-gray-100 bg-white"},q={class:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"},O={class:"flex h-16 justify-between"},P={class:"flex"},T={class:"flex shrink-0 items-center"},R={class:"hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"},U={class:"hidden sm:ms-6 sm:flex sm:items-center"},F={class:"relative ms-3"},G={class:"inline-flex rounded-md"},H={type:"button",class:"inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"},I={class:"-me-2 flex items-center sm:hidden"},J={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},K={class:"space-y-1 pb-3 pt-2"},Q={class:"border-t border-gray-200 pb-1 pt-4"},W={class:"px-4"},X={class:"text-base font-medium text-gray-800"},Y={class:"text-sm font-medium text-gray-500"},Z={class:"mt-3 space-y-1"},ee={key:0,class:"bg-white shadow"},te={class:"mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"},re={__name:"AuthenticatedLayout",setup(a){const o=S(!1);return(t,s)=>(d(),v("div",null,[e("div",A,[e("nav",V,[e("div",q,[e("div",O,[e("div",P,[e("div",T,[n(b(y),{href:t.route("dashboard")},{default:r(()=>[n(B,{class:"block h-9 w-auto fill-current text-gray-800"})]),_:1},8,["href"])]),e("div",R,[n(L,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>s[1]||(s[1]=[i(" Dashboard ")])),_:1},8,["href","active"]),n(L,{href:t.route("chirps.index"),active:t.route().current("chirps.index")},{default:r(()=>s[2]||(s[2]=[i(" Chirps ")])),_:1},8,["href","active"])])]),e("div",U,[e("div",F,[n(E,{align:"right",width:"48"},{trigger:r(()=>[e("span",G,[e("button",H,[i(x(t.$page.props.auth.user.name)+" ",1),s[3]||(s[3]=e("svg",{class:"-me-0.5 ms-2 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])])]),content:r(()=>[n(C,{href:t.route("profile.edit")},{default:r(()=>s[4]||(s[4]=[i(" Profile ")])),_:1},8,["href"]),n(C,{href:t.route("logout"),method:"post",as:"button"},{default:r(()=>s[5]||(s[5]=[i(" Log Out ")])),_:1},8,["href"])]),_:1})])]),e("div",I,[e("button",{onClick:s[0]||(s[0]=p=>o.value=!o.value),class:"inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"},[(d(),v("svg",J,[e("path",{class:u({hidden:o.value,"inline-flex":!o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),e("path",{class:u({hidden:!o.value,"inline-flex":o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),e("div",{class:u([{block:o.value,hidden:!o.value},"sm:hidden"])},[e("div",K,[n(g,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>s[6]||(s[6]=[i(" Dashboard ")])),_:1},8,["href","active"]),n(g,{href:t.route("chirps.index"),active:t.route().current("chirps.index")},{default:r(()=>s[7]||(s[7]=[i(" Chirps ")])),_:1},8,["href","active"])]),e("div",Q,[e("div",W,[e("div",X,x(t.$page.props.auth.user.name),1),e("div",Y,x(t.$page.props.auth.user.email),1)]),e("div",Z,[n(g,{href:t.route("profile.edit")},{default:r(()=>s[8]||(s[8]=[i(" Profile ")])),_:1},8,["href"]),n(g,{href:t.route("logout"),method:"post",as:"button"},{default:r(()=>s[9]||(s[9]=[i(" Log Out ")])),_:1},8,["href"])])])],2)]),t.$slots.header?(d(),v("header",ee,[e("div",te,[c(t.$slots,"header")])])):j("",!0),e("main",null,[c(t.$slots,"default")])])]))}};export{C as _,E as a,re as b};
