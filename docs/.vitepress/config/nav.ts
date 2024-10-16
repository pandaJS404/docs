import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '我的分类',
    items: [
      { text: '测试分类1', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
      { text: '测试分类2', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
      { text: '测试分类3', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
      { text: '测试分类4', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
      { text: '测试分类5', link: '/categories/issues/index', activeMatch: '/categories/issues/' },
    ],
    activeMatch: '/categories/'
  },
  {
    text: '我的标签',
    link: '/tags',
    activeMatch: '/tags'
  },
  {
    text: '我的归档',
    link: '/archives',
    activeMatch: '/archives'
  },
  {
    text: '关于',
    items: [
      { text: '关于知识库', link: '/about/index', activeMatch: '/about/index' },
      { text: '关于我', link: '/about/me', activeMatch: '/about/me' }
    ],
    activeMatch: '/about/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  },
];