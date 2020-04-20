module.exports = {
    base: '/source-files/',
    title: 'wums',
    description: 'wums note',
    markdown: {
        lineNumbers: true
    },
    plugins: [
      ['vuepress-plugin-code-copy', true],
      [
        '@vuepress/search',
        {
          searchMaxSuggestions: 10
        }
      ]
    ],
    themeConfig: {
        sidebarDepth: 5,
        lastUpdated: 'Last Updated',
        repo: 'https://gitee.com/wmsnote/source-files',
        repoLabel: 'GitEE',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'WiKi', link: 'https://gitee.com/wmsnote/dashboard/wikis' }
        ],
        sidebar: [
          {
            title: 'shell',
            path: '/shell/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['shell/条件判断','条件判断'],
              ['shell/循环','循环'],
              ['shell/函数','函数']
            ]
          },
          {
            title: '设计模式',
            path: '/设计模式/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['设计模式/ChainOfResponsibilityDesignPattern','责任链模式'],
              ['设计模式/IteratorDesignPattern','迭代器模式'],
              ['设计模式/StatePattern','状态机模式'],
              ['设计模式/StrategyDesignPattern','策略模式'],
              ['设计模式/VisitorDesignPattern','访问者模式'],
            ]
          },
          {
            title: 'prometheus',
            path: '/prometheus/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              ['prometheus/prometheus监控springboot','监控springboot']
            ]
          },
          {
            title: 'travis-ci教程',
            path: '/travis-ci/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['travis-ci/travis.yml','配置文件详解']
            ]
          }
        ]
    }
 }