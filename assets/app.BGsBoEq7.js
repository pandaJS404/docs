import{R as s,am as p,an as i,ao as u,ap as c,aq as l,ar as f,as as d,at as m,au as h,av as g,d as A,u as v,v as w,s as y,aw as R,ax as C,ay as P,a8 as b}from"./chunks/framework.C8BiqvW5.js";import{R as E}from"./chunks/theme.DO3UQ5-t.js";function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const n=r(E),S=A({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=v();return w(()=>{y(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&R(),C(),P(),n.setup&&n.setup(),()=>b(n.Layout)}});async function T(){globalThis.__VITEPRESS__=!0;const e=D(),a=x();a.provide(i,e);const t=u(e.route);return a.provide(c,t),a.component("Content",l),a.component("ClientOnly",f),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:a,router:e,siteData:d}),{app:a,router:e,data:t}}function x(){return g(S)}function D(){let e=s;return m(a=>{let t=h(a),o=null;return t&&(e&&(t=t.replace(/\.js$/,".lean.js")),o=import(t)),s&&(e=!1),o},n.NotFound)}s&&T().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{T as createApp};
