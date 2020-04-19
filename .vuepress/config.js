module.exports = {
    base: '/source-files/',
    title: 'wums',
    description: 'wums note',
    markdown: {
        lineNumbers: true
    },
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
              ['shell/条件判断','条件判断']
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
            ]
          }
        ]
    }
 }