import{R as o,af as i,ag as u,ah as l,ai as c,aj as f,ak as d,al as m,am as h,an as g,ao as A,d as v,u as P,v as R,s as w,ap as y,aq as C,ar as b,as as E}from"./chunks/framework.CqG4A4vZ.js";import{R as S}from"./chunks/theme.xvvM75nh.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(S),T=v({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=P();return R(()=>{w(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&y(),C(),b(),s.setup&&s.setup(),()=>E(s.Layout)}});async function j(){globalThis.__VITEPRESS__=!0;const e=_(),a=D();a.provide(u,e);const t=l(e.route);return a.provide(c,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function D(){return h(T)}function _(){let e=o,a;return g(t=>{let n=A(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&j().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{j as createApp};
