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
              ['shell/Bash简介','Bash简介'],
              ['shell/基本语法','基本语法'],
              ['shell/Bash的模式扩展','Bash的模式扩展'],
              ['shell/引号和转义','引号和转义'],
              ['shell/变量','变量'],
              ['shell/字符串操作','字符串操作'],
              ['shell/算数运算','算数运算'],
              ['shell/Bash行操作','Bash行操作'],
              ['shell/目录堆栈','目录堆栈'],
              ['shell/Bash脚本入门','Bash脚本入门'],
              ['shell/read命令','read命令'],
              ['shell/条件判断','条件判断'],
              ['shell/循环','循环'],
              ['shell/函数','函数'],
              ['shell/数组','数组'],
              ['shell/set','set命令'],
              ['shell/脚本除错','脚本除错'],
              ['shell/mktemp_and_trap','mktemp命令和trap命令'],
              ['shell/Bash启动环境','Bash启动环境'],
              ['shell/命令提示符','命令提示符']
            ]
          },
          {
            title: '设计模式',
            path: '/设计模式/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['设计模式/FactoryDesignPattern','工厂模式'],
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
          },
          {
            title: 'Dockerfile',
            path: '/Dockerfile/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['Dockerfile/springboot','SpringBoot'],
              ['Dockerfile/vue','Vue']
            ]
          },
          {
            title: 'Java教程',
            path: '/java/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['java/jdbc','jdbc'],
              ['java/apacheCommons','apache-commons'],
              ['java/optional','java-8-Optional'],
              ['java/泛型详解','Java泛型详解'],
              ['java/stream','JavaStreamAPI'],
              ['java/8新特性分析','JAVA8新特性分析'],
              ['java/多线程实现的三种方式','Java多线程实现的三种方式'],
              ['java/map遍历','map遍历'],
              ['java/spring扫描自定义注解并进行操作','spring扫描自定义注解并进行操作'],
              ['java/反射提高扩展性','反射-提高扩展性'],
              ['java/注解的定义和反射','注解的定义和反射'],
              ['java/获取指定包下所有自定义注解并提取注解信息','获取指定包下所有自定义注解并提取注解信息'],
            ]
          },
          {
            title: 'SpringBoot2.x',
            path: '/springboot2/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
              ['springboot2/springboot调优','springboot2调优'],
              ['springboot2/事物的传播行为','事物的传播行为'],
              ['springboot2/正确关闭springboot应用','正确关闭springboot应用'],
              ['springboot2/获取当前激活的profile','获取当前激活的profile'],
            ]
          }
        ]
    }
 }