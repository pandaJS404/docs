import{g as H,_ as A,a as B,i as K,S as Y,s as Q,b as X,c as Z,d as ee,e as D,f as F,h as te,P as ne}from"./chunks/index.fDLn5rMx.js";import{p as G,v as U,z as oe,d as O,h as m,o as a,c as r,n as p,N,j as y,L as ie,r as S,e as w,F as q,a as z,t as C,a7 as le,a2 as se,a3 as x,X as ae,G as g,k as T,w as k,C as re,b as V,_ as E,B as ce}from"./chunks/framework.CZtOA9_k.js";import"./chunks/theme.C4WVtbfH.js";const de=e=>{const t={},n=G([]),l=()=>{if(t.value){const s=H(t.value,e);(s.length!==n.value.length||s.toString()!==n.value.toString())&&(n.value=s)}};return U(()=>l()),oe(()=>l()),{children:t,components:n}},ue=O({name:"IconClockCircle",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=B("icon"),l=m(()=>[n,`${n}-clock-circle`,{[`${n}-spin`]:e.spin}]),s=m(()=>{const o={};return e.size&&(o.fontSize=K(e.size)?`${e.size}px`:e.size),e.rotate&&(o.transform=`rotate(${e.rotate}deg)`),o});return{cls:l,innerStyle:s,onClick:o=>{t("click",o)}}}}),me=["stroke-width","stroke-linecap","stroke-linejoin"],ye=y("path",{d:"M24 14v10h9.5m8.5 0c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"},null,-1),pe=[ye];function fe(e,t,n,l,s,d){return a(),r("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:p(e.cls),style:N(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...o)=>e.onClick&&e.onClick(...o))},pe,14,me)}var I=A(ue,[["render",fe]]);const ve=Object.assign(I,{install:(e,t)=>{var n;const l=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(l+I.name,I)}}),J=Symbol("ArcoTimeline");var ge=Object.defineProperty,M=Object.getOwnPropertySymbols,_e=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,R=(e,t,n)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,he=(e,t)=>{for(var n in t||(t={}))_e.call(t,n)&&R(e,n,t[n]);if(M)for(var n of M(t))Ce.call(t,n)&&R(e,n,t[n]);return e};const $e=(e,t,n,l)=>{let s=["left","right"];n==="horizontal"&&(s=["top","bottom"]);const d=t==="alternate"?l||s[e%2]:t;return s.indexOf(d)>-1?d:s[0]},be=O({name:"TimelineItem",props:{dotColor:{type:String},dotType:{type:String,default:"solid"},lineType:{type:String,default:"solid"},lineColor:{type:String},label:{type:String},position:{type:String}},setup(e){const t=B("timeline-item"),n=le(),l=ie(J,{}),s=m(()=>{var i,v,_;return(_=(v=l.items)==null?void 0:v.indexOf((i=n==null?void 0:n.uid)!=null?i:-1))!=null?_:-1}),d=m(()=>{var i;return(i=l==null?void 0:l.direction)!=null?i:"vertical"}),o=m(()=>{var i;return(i=l==null?void 0:l.labelPosition)!=null?i:"same"}),c=m(()=>{const{items:i=[],reverse:v,labelPosition:_,mode:P="left"}=l,j=d.value,W=$e(s.value,P,j,e.position);return[t,{[`${t}-${j}-${W}`]:j,[`${t}-label-${_}`]:_,[`${t}-last`]:s.value===(v===!0?0:i.length-1)}]}),h=m(()=>[`${t}-dot-line`,`${t}-dot-line-is-${d.value}`]),u=m(()=>{const{direction:i}=l||{};return he({[i==="horizontal"?"borderTopStyle":"borderLeftStyle"]:e.lineType},e.lineColor?{borderColor:e.lineColor}:{})}),f=m(()=>[`${t}-dot`,`${t}-dot-${e.dotType}`]),b=m(()=>({[e.dotType==="solid"?"backgroundColor":"borderColor"]:e.dotColor}));return{cls:c,dotLineCls:h,dotTypeCls:f,prefixCls:t,computedDotLineStyle:u,computedDotStyle:b,labelPosition:o}}});function ke(e,t,n,l,s,d){return a(),r("div",{role:"listitem",class:p(e.cls)},[y("div",{class:p(`${e.prefixCls}-dot-wrapper`)},[y("div",{class:p(e.dotLineCls),style:N(e.computedDotLineStyle)},null,6),y("div",{class:p(`${e.prefixCls}-dot-content`)},[e.$slots.dot?(a(),r("div",{key:0,class:p(`${e.prefixCls}-dot-custom`)},[S(e.$slots,"dot")],2)):(a(),r("div",{key:1,class:p(e.dotTypeCls),style:N(e.computedDotStyle)},null,6))],2)],2),y("div",{class:p(`${e.prefixCls}-content-wrapper`)},[e.$slots.default?(a(),r("div",{key:0,class:p(`${e.prefixCls}-content`)},[S(e.$slots,"default")],2)):w("v-if",!0),e.labelPosition!=="relative"?(a(),r("div",{key:1,class:p(`${e.prefixCls}-label`)},[e.$slots.label?S(e.$slots,"label",{key:0}):(a(),r(q,{key:1},[z(C(e.label),1)],2112))],2)):w("v-if",!0)],2),e.labelPosition==="relative"?(a(),r("div",{key:0,class:p(`${e.prefixCls}-label`)},[e.$slots.label?S(e.$slots,"label",{key:0}):(a(),r(q,{key:1},[z(C(e.label),1)],2112))],2)):w("v-if",!0)],2)}var $=A(be,[["render",ke]]),L=O({name:"Timeline",components:{Item:$,Spin:Y},props:{reverse:{type:Boolean},direction:{type:String,default:"vertical"},mode:{type:String,default:"left"},pending:{type:[Boolean,String]},labelPosition:{type:String,default:"same"}},setup(e,{slots:t}){const n=B("timeline"),l=m(()=>e.pending||t.pending),{children:s,components:d}=de("TimelineItem"),{reverse:o,direction:c,labelPosition:h,mode:u}=se(e),f=x({items:d,direction:c,reverse:o,labelPosition:h,mode:u});ae(J,f);const b=m(()=>[n,`${n}-${e.mode}`,`${n}-direction-${e.direction}`,{[`${n}-is-reverse`]:e.reverse}]);return()=>{var i,v;return l.value?s.value=(i=t.default)==null?void 0:i.call(t).concat(g($,{lineType:"dashed"},{default:()=>[e.pending!==!0&&g("div",null,[e.pending])],dot:()=>{var _,P;return(P=(_=t.dot)==null?void 0:_.call(t))!=null?P:g(Y,{size:12},null)}})):s.value=(v=t.default)==null?void 0:v.call(t),g("div",{role:"list",class:b.value},[s.value])}}});const Pe=Object.assign(L,{Item:$,install:(e,t)=>{Q(e,t);const n=X(t);e.component(n+L.name,L),e.component(n+$.name,$)}}),Se=JSON.parse('[{"classify":"fragments","year":"2024","month":"11","day":"08","title":"数组去重"},{"classify":"issues","year":"2024","month":"03","day":"31","title":"npm更新报错"},{"classify":"issues","year":"2024","month":"04","day":"13","title":"echarts偏移"},{"classify":"issues","year":"2024","month":"04","day":"25","title":"VScode离线包"},{"classify":"issues","year":"2024","month":"07","day":"04","title":"uview-plus视图不更新"},{"classify":"issues","year":"2024","month":"10","day":"23","title":"autofit"},{"classify":"solutions","year":"2024","month":"06","day":"25","title":"Copilot改Ctrl"},{"classify":"tools","year":"2024","month":"10","day":"26","title":"引入组件库"},{"classify":"tools","year":"2024","month":"10","day":"31","title":"自动引入图片"}]'),Te={class:"timeline-wrap"},we={key:0},qe={key:1},Oe={key:2},je={class:"time"},De={key:0,class:"timeline-icon iconfont icon-bug"},Ie={key:1,class:"timeline-icon iconfont icon-auther"},Le={key:2,class:"timeline-icon iconfont icon-daima"},Ne={class:"timeline-content"},ze=["href"],Be=O({__name:"Archive",setup(e){let t;G({});const n=x({queryCategory:"",queryTag:"",queryYear:""}),l=()=>{t=[],n.queryCategory=D("category")??"",n.queryTag=D("tag")??"",n.queryYear=D("year")??"",t=F.filter(o=>o.categories.includes(n.queryCategory)||o.tags.includes(n.queryTag)||new Date(o.date).getFullYear()==n.queryYear),!n.queryCategory&&!n.queryTag&&!n.queryYear&&(t=[...F]),t.sort((o,c)=>c.date.localeCompare(o.date))},s=o=>{new ne("pie",{appendPadding:10,data:o,angleField:"value",colorField:"type",radius:.75,label:{type:"spider",labelHeight:28,content:`{name}
{value} 篇`},interactions:[{type:"element-active"},{type:"tooltip",enable:!1}]}).render()},d=()=>{let o=Se.reduce((u,f)=>(f.classify in u?u[f.classify]++:u[f.classify]=1,u),{});const c={fragments:"随笔记录",issues:"BUG 踩坑集",solutions:"方案春秋志",tools:"工具四海谈"},h=Object.keys(o).map(u=>({type:c[u],value:o[u]}));s(h)};return l(),U(()=>{d()}),(o,c)=>{const h=ve,u=te,f=$,b=Pe;return a(),r(q,null,[c[2]||(c[2]=y("main",{class:"pie",id:"pie"},null,-1)),y("div",Te,[y("h2",{class:"timeline-header",onClick:c[0]||(c[0]=i=>T(Z)("/docs/archives"))},[c[1]||(c[1]=y("i",{class:"iconfont iconfont22 icon-guidang"},null,-1)),n.queryCategory?(a(),r("span",we,C(n.queryCategory),1)):n.queryTag?(a(),r("span",qe,C(n.queryTag),1)):n.queryYear?(a(),r("span",Oe,C(n.queryYear),1)):w("",!0),z(" 共 "+C(T(t).length)+" 篇，未完待续······ ",1)]),g(b,{labelPosition:"relative"},{default:k(()=>[(a(!0),r(q,null,re(T(t),(i,v)=>(a(),V(f,{key:v,lineColor:"#0eb0c9"},{label:k(()=>[y("h4",je,C(T(ee)(i.date).format("YYYY-MM-DD")),1)]),dot:k(()=>[i.categories.includes("BUG踩坑集")?(a(),r("i",De)):i.categories.includes("随笔记录")?(a(),r("i",Ie)):i.categories.includes("方案春秋志")?(a(),r("i",Le)):(a(),V(h,{key:3,class:"timeline-icon"}))]),default:k(()=>[y("main",Ne,[y("a",{href:i.path,class:"title",target:"_blank"},C(i.title),9,ze),g(u,{article:i},null,8,["article"])])]),_:2},1024))),128)),g(f,{dotColor:"#0eb0c9",lineColor:"#0eb0c9"})]),_:1})])],64)}}}),Ye=E(Be,[["__scopeId","data-v-3a719bcf"]]),Ge=JSON.parse('{"title":"我的归档","description":"","frontmatter":{"layout":"doc","title":"我的归档","aside":false,"editLink":false,"lastUpdated":false,"showComment":false},"headers":[],"relativePath":"archives.md","filePath":"archives.md"}'),Fe={name:"archives.md"};function Ve(e,t,n,l,s,d){const o=Ye,c=ce("ClientOnly");return a(),r("div",null,[g(c,null,{default:k(()=>[g(o)]),_:1})])}const Ue=E(Fe,[["render",Ve]]);export{Ge as __pageData,Ue as default};
