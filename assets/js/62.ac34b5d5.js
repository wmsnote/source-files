(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{388:function(n,e,p){"use strict";p.r(e);var a=p(9),s=Object(a.a)({},(function(){var n=this,e=n.$createElement,p=n._self._c||e;return p("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[p("h1",{attrs:{id:"pycharm-pipenv虚拟环境作开发和依赖管理"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#pycharm-pipenv虚拟环境作开发和依赖管理"}},[n._v("#")]),n._v(" PyCharm+Pipenv虚拟环境作开发和依赖管理")]),n._v(" "),p("p",[n._v("hello，小伙伴们大家好，今天给大家介绍的开源项目是Python虚拟环境管理工具，Pipenv是Python官方推荐的包管理工具。可以说，它集成了virtualenv, pip和pyenv三者的功能。其目的旨在集合了所有的包管理工具的长处，如: npm, yarn, composer等的优点。")]),n._v(" "),p("p",[p("strong",[n._v("Pipenv试图解决的问题是多方面的：")])]),n._v(" "),p("ol",[p("li",[n._v("我们不需要再手动创建虚拟环境，Pipenv会自动为我们创建，它会在某个特定的位置创建一个 virtualenv 环境，然后调用 pipenv shell 命令切换到虚拟环境。")]),n._v(" "),p("li",[n._v("使用 requirements.txt 可能会导致一些问题，所以 Pipenv 使用 Pipfile 和 Pipfile.lock 来替代之，而且 Pipfile 如果不存在的话会自动创建，而且在安装、升级、移除依赖包的时候会自动更新 Pipfile 和 Pipfile.lock 文件。")]),n._v(" "),p("li",[n._v("哈希值随处可见。安全。自动公开安全漏洞。")]),n._v(" "),p("li",[n._v("让您深入了解依赖关系图（例如$ pipenv graph）。")]),n._v(" "),p("li",[n._v("随时查看图形化的依赖关系。")]),n._v(" "),p("li",[n._v("可通过自动加载 .env 读取环境变量，简化开发流程")])]),n._v(" "),p("h2",{attrs:{id:"安装pipenv"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#安装pipenv"}},[n._v("#")]),n._v(" 安装Pipenv")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("MacOS\n$ brew install pipenv\nDebian\n$ sudo apt install pipenv\nFedora\n$ sudo dnf install pipenv\n假如你电脑上有多个Python版本，你可以指定Python版本安装\n$ python3 -m pip install pipenv\n也可以使用pip安装\nsudo pip3 install pipenv\nsudo pip3 install pyenv\n")])])]),p("h2",{attrs:{id:"常用命令"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[n._v("#")]),n._v(" 常用命令")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("$ pipenv\nUsage: pipenv [OPTIONS] COMMAND [ARGS]...\nOptions:\n  --where          显示项目文件所在路径\n  --venv           显示虚拟环境实际文件所在路径\n  --py             显示虚拟环境Python解释器所在路径\n  --envs           显示虚拟环境的选项变量\n  --rm             删除虚拟环境\n  --bare           最小化输出\n  --completion     完整输出\n  --man            显示帮助页面\n  --three / --two  使用Python 3/2创建虚拟环境（注意本机已安装的Python版本）\n  --python TEXT    指定某个Python版本作为虚拟环境的安装源\n  --site-packages  附带安装原Python解释器中的第三方库\n  --jumbotron      An easter egg, effectively.\n  --version        版本信息\n  -h, --help       帮助信息\n")])])]),p("p",[p("strong",[n._v("命令参数")])]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("Commands:\n  check      检查安全漏洞\n  graph      显示当前依赖关系图信息\n  install    安装虚拟环境或者第三方库\n  lock       锁定并生成Pipfile.lock文件\n  open       在编辑器中查看一个库\n  run        在虚拟环境中运行命令\n  shell      进入虚拟环境\n  uninstall  卸载一个库\n  update     卸载当前所有的包，并安装它们的最新版本\n")])])]),p("h2",{attrs:{id:"基本使用"}},[p("a",{staticClass:"header-anchor",attrs:{href:"#基本使用"}},[n._v("#")]),n._v(" 基本使用")]),n._v(" "),p("p",[n._v("我们可以创建一个项目，名称 PipenvTest，然后新建一个 Python 脚本，例如叫 tst_env.py，内容为：")]),n._v(" "),p("div",{staticClass:"language-python line-numbers-mode"},[p("pre",{pre:!0,attrs:{class:"language-python"}},[p("code",[p("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("import")]),n._v(" django\n"),p("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("print")]),p("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),n._v("django"),p("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(".")]),n._v("get_version"),p("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),p("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),p("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n")])]),n._v(" "),p("div",{staticClass:"line-numbers-wrapper"},[p("span",{staticClass:"line-number"},[n._v("1")]),p("br"),p("span",{staticClass:"line-number"},[n._v("2")]),p("br")])]),p("p",[n._v("结果如下：")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("1.12\n")])])]),p("p",[n._v("我们可以看到系统安装的 Django 版本是 1.12。但是我们想要本项目基于 Django 2.x 开发，当然我们可以选择将系统的 Django 版本升级，但这样又可能会影响其他的项目的运行，所以这并不是一个好的选择。为了不影响系统环境的 Django 版本，所以我们可以用 Pipenv 来创建一个虚拟环境。")]),n._v(" "),p("p",[n._v("在该目录下，输入 pipenv 命令即可查看命令的完整用法：")]),n._v(" "),p("p",[n._v("创建虚拟环境\n第一步首先验证一下当前的项目是没有创建虚拟环境的，调用如下命令：")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("pipenv --venv\n")])])]),p("p",[n._v("结果如下")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("No virtualenv has been created for this project yet!\nAborted!\n")])])]),p("p",[n._v("这说明当前的项目尚未创建虚拟环境，接下来我们利用 Pipenv 来创建一个虚拟环境：")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("$ pipenv --three\n")])])]),p("p",[n._v("或者")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("$ pipenv install --python 3.6\n")])])]),p("p",[n._v("创建一个 Python3 的虚拟环境，–-three 代表创建一个 Python3 版本的虚拟环境，–-python 则可以指定特定的 Python 版本，当然如果指定了 --two 或者 --three 选项参数，则会使用 python2 或者 python3 的版本安装，否则将使用默认的 python 版本来安装。但前提你的系统必须装有该版本的 Python 才可以。")]),n._v(" "),p("p",[n._v("当然也可以指定准确的版本信息：")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("$ pipenv install --python 3\n$ pipenv install --python 3.6\n$ pipenv install --python 2.7.14\n")])])]),p("p",[n._v("pipenv 会自动扫描系统寻找合适的版本信息，如果找不到的话，同时又安装了 pyenv 的话，则会自动调用 pyenv 下载对应版本的 python， 否则会报错。")]),n._v(" "),p("p",[n._v("这时候在当前 new_env 环境下生成 Pipfile 和 Pipfile.lock 两个环境初始化文件。")]),n._v(" "),p("p",[n._v("接下来我们可以切换到该虚拟环境下执行命令，执行如下命令即可：")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v("pipenv shell\n")])])]),p("p",[n._v("使用Pipenv来安装第三方包")]),n._v(" "),p("p",[n._v("此时，Pipfile 里有最新安装的包文件的信息，如名称、版本等。用来在重新安装项目依赖或与他人共享项目时，你可以用 Pipfile 来跟踪项目依赖。")]),n._v(" "),p("p",[n._v("Pipfile 是用来替代原来的 requirements.txt 的，内容类似下面这样。source 部分用来设置仓库地址，packages 部分用来指定项目依赖的包，dev-packages 部分用来指定开发环境需要的包，这样分开便于管理。")]),n._v(" "),p("div",{staticClass:"language- line-numbers-mode"},[p("pre",{pre:!0,attrs:{class:"language-text"}},[p("code",[n._v('    $ cat Pipfile\n\n    [[source]]\n    url = "https://pypi.org/simple"\n    verify_ssl = true\n    name = "pypi"\n\n    [packages]\n    "urllib3" = "*"\n\n    [dev-packages]\n\n    [requires]\n    python_version = "3.6"\n')])]),n._v(" "),p("div",{staticClass:"line-numbers-wrapper"},[p("span",{staticClass:"line-number"},[n._v("1")]),p("br"),p("span",{staticClass:"line-number"},[n._v("2")]),p("br"),p("span",{staticClass:"line-number"},[n._v("3")]),p("br"),p("span",{staticClass:"line-number"},[n._v("4")]),p("br"),p("span",{staticClass:"line-number"},[n._v("5")]),p("br"),p("span",{staticClass:"line-number"},[n._v("6")]),p("br"),p("span",{staticClass:"line-number"},[n._v("7")]),p("br"),p("span",{staticClass:"line-number"},[n._v("8")]),p("br"),p("span",{staticClass:"line-number"},[n._v("9")]),p("br"),p("span",{staticClass:"line-number"},[n._v("10")]),p("br"),p("span",{staticClass:"line-number"},[n._v("11")]),p("br"),p("span",{staticClass:"line-number"},[n._v("12")]),p("br"),p("span",{staticClass:"line-number"},[n._v("13")]),p("br"),p("span",{staticClass:"line-number"},[n._v("14")]),p("br")])]),p("p",[n._v("Pipfile.lock 则包含你的系统信息，所有已安装包的依赖包及其版本信息，以及所有安装包及其依赖包的 Hash 校验信息。")]),n._v(" "),p("div",{staticClass:"language- extra-class"},[p("pre",[p("code",[n._v('$ Pipfile.lock\n{\n    "_meta": {\n        "hash": {\n            "sha256": "af58f3510cb613d4d9241128f9a0ceb9bb936ad907543e23ad8317011dcb6715"\n        },\n        "pipfile-spec": 6,\n        "requires": {\n            "python_version": "3.6"\n        },\n        "sources": [\n            {\n                "name": "pypi",\n                "url": "https://pypi.org/simple",\n                "verify_ssl": true\n            }\n        ]\n    },\n    "default": {\n         "urllib3": {\n            "hashes": [\n                "sha256:a68ac5e15e76e7e5dd2b8f94007233e01effe3e50e8daddf69acfd81cb686baf",\n                "sha256:b5725a0bd4ba422ab0e66e89e030c806576753ea3ee08554382c14e685d117b5"\n            ],\n            "index": "pypi",\n            "version": "==1.23"\n        }\n    },\n    "develop": {}\n}\n')])])]),p("p",[n._v("那么到这里有小伙伴可能就会问了， Pipfile 和 Pipfile.lock 有什么用呢？")]),n._v(" "),p("p",[n._v("Pipfile 其实一个 TOML 格式的文件，标识了该项目依赖包的基本信息，还区分了生产环境和开发环境的包标识，作用上类似 requirements.txt 文件，但是功能更为强大。Pipfile.lock 详细标识了该项目的安装的包的精确版本信息、最新可用版本信息和当前库文件的 hash 值，顾明思义，它起了版本锁的作用，可以注意到当前 Pipfile.lock 文件中的 Django 版本标识为 ==2.0.2，意思是当前我们开发时使用的就是 2.0.2 版本，它可以起到版本锁定的功能。")]),n._v(" "),p("p",[n._v("举个例子，刚才我们安装了 Django 2.0.2 的版本，即目前（2018.2.27）的最新版本。但可能 Django 以后还会有更新，比如某一天 Django 更新到了 2.1 版本，这时如果我们想要重新部署本项目到另一台机器上，假如此时不存在 Pipfile.lock 文件，只存在 Pipfile文件，由于 Pipfile 文件中标识的 Django 依赖为 django = “*”，即没有版本限制，它会默认安装最新版本的 Django，即 2.1，但由于 Pipfile.lock 文件的存在，它会根据 Pipfile.lock 来安装，还是会安装 Django 2.0.2，这样就会避免一些库版本更新导致不兼容的问题。")]),n._v(" "),p("p",[n._v("Rember：任何情况下都不要手动修改 Pipfile.lock 文件！")]),n._v(" "),p("p",[n._v("常用命令\n我们可以使用 –-venv 参数来获得虚拟环境路径：")]),n._v(" "),p("p",[n._v("$ pipenv --venv\n/Users/kennethreitz/.local/share/virtualenvs/test-Skyy4vre\n项目路径")]),n._v(" "),p("p",[n._v("$ pipenv --where\n/Users/kennethreitz/Library/Mobile Documents/com~apple~CloudDocs/repos/kr/pipenv/test\n找到Python解释器：")]),n._v(" "),p("p",[n._v("$ pipenv --py\n/Users/kennethreitz/.local/share/virtualenvs/test-Skyy4vre/bin/python\n安装指定软件包：")]),n._v(" "),p("p",[n._v("$ pipenv install urllib3==1.22\n安装开发环境下的包：\n通常有一些Python包只在你的开发环境中需要，而不是在生产环境中，例如单元测试包。 Pipenv使用--dev标志区分两个环境。\n加 --dev 表示包括 Pipfile 的 dev-packages 中的依赖。")]),n._v(" "),p("p",[n._v("$ pipenv install django --dev\nInstalling pytest...\n...\nAdding pytest to Pipfile's [dev-packages]...\ndjango库现在将只在开发虚拟环境中使用。如果你要在你的生产环境中安装你的项目：")]),n._v(" "),p("p",[n._v("这不会安装django包。")]),n._v(" "),p("p",[n._v("但是，如果有一个开发人员将你的项目克隆到自己的开发环境中，他们可以使用--dev标志，将django也安装：")]),n._v(" "),p("p",[n._v("也就是说一个--dev参数，帮你在同一个虚拟环境中又区分出了开发和非开发环境。")]),n._v(" "),p("p",[n._v("显示依赖关系图：")]),n._v(" "),p("p",[n._v("$ pipenv graph\nrequests==2.18.4")]),n._v(" "),p("ul",[p("li",[n._v("certifi [required: >=2017.4.17, installed: 2017.7.27.1]")]),n._v(" "),p("li",[n._v("chardet [required: >=3.0.2,❤️.1.0, installed: 3.0.4]")]),n._v(" "),p("li",[n._v("idna [required: >=2.5,<2.7, installed: 2.6]")]),n._v(" "),p("li",[n._v("urllib3 [required: <1.23,>=1.21.1, installed: 1.22]\n生成一个锁文件：")])]),n._v(" "),p("p",[n._v("$ pipenv lock\nAssuring all dependencies from Pipfile are installed...\nLocking [dev-packages] dependencies...\nLocking [packages] dependencies...\nNote: your project now has only default [packages] installed.\nTo install [dev-packages], run: $ pipenv install --dev\n卸载第三方包：")]),n._v(" "),p("p",[n._v("$ pipenv uninstall urllib3\n或者\n$ pipenv uninstall --all\n更新安装包")]),n._v(" "),p("p",[n._v("$ pipenv update urllib3")]),n._v(" "),p("p",[n._v("$ pipenv update  # 更新所有安装包\n检查软件包的完整性\n你是否担心已安装的软件包有没有安全漏洞？没关系，pipenv 可以帮你检查，运行下面的命令：")]),n._v(" "),p("p",[n._v("$  pipenv check\nChecking PEP 508 requirements…\nPassed!\nChecking installed package safety…\nAll good!\n产生 Pipfile.lock\n有时候可能 Pipfile.lock 文件不存在或被删除了，这时候我们可以使用如下命令生成：")]),n._v(" "),p("p",[n._v("以上便是一些常用的 Pipenv 命令，如果要查看更多用法可以参考其官方文档：https://docs.pipenv.org/#pipenv-usage。")]),n._v(" "),p("p",[n._v("修改下载源Pipenv\n如果你觉得在使用pipenv install安装的过程中下载比较慢可以指下载源：")]),n._v(" "),p("p",[n._v('[[source]]\nname = "pypi"\nurl = "https://pypi.tuna.tsinghua.edu.cn/simple/"\nverify_ssl = true')]),n._v(" "),p("p",[n._v("[dev-packages]")]),n._v(" "),p("p",[n._v('[packages]\nrequests = "'),p("em",[n._v('"\npaho-mqtt = "')]),n._v('"\npymongo = "'),p("em",[n._v('"\ncan = "')]),n._v('"\ncrypto = "'),p("em",[n._v('"\ngvent = "')]),n._v('"\ngevent = "*"')]),n._v(" "),p("p",[n._v('[requires]\npython_version = "3.7"\n只需要修改Pipfile即可。')]),n._v(" "),p("p",[n._v("Pip下载源")]),n._v(" "),p("p",[n._v("阿里: http://mirrors.aliyun.com/pypi/simple/\n豆瓣: http://pypi.douban.com/simple/\n清华: https://pypi.tuna.tsinghua.edu.cn/simple")]),n._v(" "),p("p",[n._v("PyCharm配置Pipenv")]),n._v(" "),p("p",[n._v("选择Pipenv 虚拟环境\nBase interpreter为本机系统中的python解释器路径\nPipenv executable表示pipenv，命令的环境变量路径")]),n._v(" "),p("p",[n._v("refence:")]),n._v(" "),p("p",[n._v("https://zhuanlan.zhihu.com/p/129371044")]),n._v(" "),p("p",[n._v("pipenv --python 3.8.3")]),n._v(" "),p("p",[n._v("Warning: Python 3.8.3 was not found on your system…\nNeither 'pyenv' nor 'asdf' could be found to install Python.\nYou can specify specific versions of Python with:\n$ pipenv --python path/to/python")]),n._v(" "),p("p",[n._v("curl -L https://raw.github.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash")])])}),[],!1,null,null,null);e.default=s.exports}}]);