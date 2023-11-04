import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'antd enhancer',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '增强组件', link: '/components' },
      { title: '拓展组件', link: '/extends' },
    ],
    atomDirs: [
      { type: 'component', dir: 'src' },
      { type: 'extends', dir: 'src/extends' },
    ],
  },
});
