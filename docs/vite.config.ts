import { defineConfig } from 'vite';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  plugins: [
    //@ts-ignore
    Components({
      dirs: ['.vitepress/theme/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })]
    }),
  ],
  ssr: { noExternal: ['@arco-design/web-vue', 'naive-ui'] },
  resolve: {
    alias: {
      '@': pathResolve('docs') + '/',
      '@theme': pathResolve('docs/.vitepress/theme') + '/',
      'mermaid': 'mermaid/dist/mermaid.esm.mjs',
    },
  },
  server: {
    host: true,
    open: false,
    hmr: true,
    port: 8888,
    proxy: {
    },
  },
});
