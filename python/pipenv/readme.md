# PyCharm+Pipenv虚拟环境作开发和依赖管理

hello，小伙伴们大家好，今天给大家介绍的开源项目是Python虚拟环境管理工具，Pipenv是Python官方推荐的包管理工具。可以说，它集成了virtualenv, pip和pyenv三者的功能。其目的旨在集合了所有的包管理工具的长处，如: npm, yarn, composer等的优点。

**Pipenv试图解决的问题是多方面的：**

1. 我们不需要再手动创建虚拟环境，Pipenv会自动为我们创建，它会在某个特定的位置创建一个 virtualenv 环境，然后调用 pipenv shell 命令切换到虚拟环境。
2. 使用 requirements.txt 可能会导致一些问题，所以 Pipenv 使用 Pipfile 和 Pipfile.lock 来替代之，而且 Pipfile 如果不存在的话会自动创建，而且在安装、升级、移除依赖包的时候会自动更新 Pipfile 和 Pipfile.lock 文件。
3. 哈希值随处可见。安全。自动公开安全漏洞。
4. 让您深入了解依赖关系图（例如$ pipenv graph）。
5. 随时查看图形化的依赖关系。
6. 可通过自动加载 .env 读取环境变量，简化开发流程


## 安装Pipenv

    MacOS
    $ brew install pipenv
    Debian
    $ sudo apt install pipenv
    Fedora
    $ sudo dnf install pipenv
    假如你电脑上有多个Python版本，你可以指定Python版本安装
    $ python3 -m pip install pipenv
    也可以使用pip安装
    sudo pip3 install pipenv
    sudo pip3 install pyenv

## 常用命令

    $ pipenv
    Usage: pipenv [OPTIONS] COMMAND [ARGS]...
    Options:
      --where          显示项目文件所在路径
      --venv           显示虚拟环境实际文件所在路径
      --py             显示虚拟环境Python解释器所在路径
      --envs           显示虚拟环境的选项变量
      --rm             删除虚拟环境
      --bare           最小化输出
      --completion     完整输出
      --man            显示帮助页面
      --three / --two  使用Python 3/2创建虚拟环境（注意本机已安装的Python版本）
      --python TEXT    指定某个Python版本作为虚拟环境的安装源
      --site-packages  附带安装原Python解释器中的第三方库
      --jumbotron      An easter egg, effectively.
      --version        版本信息
      -h, --help       帮助信息

**命令参数**

    Commands:
      check      检查安全漏洞
      graph      显示当前依赖关系图信息
      install    安装虚拟环境或者第三方库
      lock       锁定并生成Pipfile.lock文件
      open       在编辑器中查看一个库
      run        在虚拟环境中运行命令
      shell      进入虚拟环境
      uninstall  卸载一个库
      update     卸载当前所有的包，并安装它们的最新版本

## 基本使用

我们可以创建一个项目，名称 PipenvTest，然后新建一个 Python 脚本，例如叫 tst_env.py，内容为：

```python
import django
print(django.get_version())
```

结果如下：

    1.12

我们可以看到系统安装的 Django 版本是 1.12。但是我们想要本项目基于 Django 2.x 开发，当然我们可以选择将系统的 Django 版本升级，但这样又可能会影响其他的项目的运行，所以这并不是一个好的选择。为了不影响系统环境的 Django 版本，所以我们可以用 Pipenv 来创建一个虚拟环境。

在该目录下，输入 pipenv 命令即可查看命令的完整用法：


创建虚拟环境
第一步首先验证一下当前的项目是没有创建虚拟环境的，调用如下命令：

    pipenv --venv

结果如下

    No virtualenv has been created for this project yet!
    Aborted!

这说明当前的项目尚未创建虚拟环境，接下来我们利用 Pipenv 来创建一个虚拟环境：

    $ pipenv --three

或者

    $ pipenv install --python 3.6

创建一个 Python3 的虚拟环境，–-three 代表创建一个 Python3 版本的虚拟环境，–-python 则可以指定特定的 Python 版本，当然如果指定了 --two 或者 --three 选项参数，则会使用 python2 或者 python3 的版本安装，否则将使用默认的 python 版本来安装。但前提你的系统必须装有该版本的 Python 才可以。

当然也可以指定准确的版本信息：

    $ pipenv install --python 3
    $ pipenv install --python 3.6
    $ pipenv install --python 2.7.14

pipenv 会自动扫描系统寻找合适的版本信息，如果找不到的话，同时又安装了 pyenv 的话，则会自动调用 pyenv 下载对应版本的 python， 否则会报错。

这时候在当前 new_env 环境下生成 Pipfile 和 Pipfile.lock 两个环境初始化文件。

接下来我们可以切换到该虚拟环境下执行命令，执行如下命令即可：

    pipenv shell

使用Pipenv来安装第三方包

此时，Pipfile 里有最新安装的包文件的信息，如名称、版本等。用来在重新安装项目依赖或与他人共享项目时，你可以用 Pipfile 来跟踪项目依赖。

Pipfile 是用来替代原来的 requirements.txt 的，内容类似下面这样。source 部分用来设置仓库地址，packages 部分用来指定项目依赖的包，dev-packages 部分用来指定开发环境需要的包，这样分开便于管理。

```
    $ cat Pipfile

    [[source]]
    url = "https://pypi.org/simple"
    verify_ssl = true
    name = "pypi"

    [packages]
    "urllib3" = "*"

    [dev-packages]

    [requires]
    python_version = "3.6"
```

Pipfile.lock 则包含你的系统信息，所有已安装包的依赖包及其版本信息，以及所有安装包及其依赖包的 Hash 校验信息。

    $ Pipfile.lock
    {
        "_meta": {
            "hash": {
                "sha256": "af58f3510cb613d4d9241128f9a0ceb9bb936ad907543e23ad8317011dcb6715"
            },
            "pipfile-spec": 6,
            "requires": {
                "python_version": "3.6"
            },
            "sources": [
                {
                    "name": "pypi",
                    "url": "https://pypi.org/simple",
                    "verify_ssl": true
                }
            ]
        },
        "default": {
             "urllib3": {
                "hashes": [
                    "sha256:a68ac5e15e76e7e5dd2b8f94007233e01effe3e50e8daddf69acfd81cb686baf",
                    "sha256:b5725a0bd4ba422ab0e66e89e030c806576753ea3ee08554382c14e685d117b5"
                ],
                "index": "pypi",
                "version": "==1.23"
            }
        },
        "develop": {}
    }
那么到这里有小伙伴可能就会问了， Pipfile 和 Pipfile.lock 有什么用呢？

Pipfile 其实一个 TOML 格式的文件，标识了该项目依赖包的基本信息，还区分了生产环境和开发环境的包标识，作用上类似 requirements.txt 文件，但是功能更为强大。Pipfile.lock 详细标识了该项目的安装的包的精确版本信息、最新可用版本信息和当前库文件的 hash 值，顾明思义，它起了版本锁的作用，可以注意到当前 Pipfile.lock 文件中的 Django 版本标识为 ==2.0.2，意思是当前我们开发时使用的就是 2.0.2 版本，它可以起到版本锁定的功能。

举个例子，刚才我们安装了 Django 2.0.2 的版本，即目前（2018.2.27）的最新版本。但可能 Django 以后还会有更新，比如某一天 Django 更新到了 2.1 版本，这时如果我们想要重新部署本项目到另一台机器上，假如此时不存在 Pipfile.lock 文件，只存在 Pipfile文件，由于 Pipfile 文件中标识的 Django 依赖为 django = “*”，即没有版本限制，它会默认安装最新版本的 Django，即 2.1，但由于 Pipfile.lock 文件的存在，它会根据 Pipfile.lock 来安装，还是会安装 Django 2.0.2，这样就会避免一些库版本更新导致不兼容的问题。

Rember：任何情况下都不要手动修改 Pipfile.lock 文件！

常用命令
我们可以使用 –-venv 参数来获得虚拟环境路径：

$ pipenv --venv
/Users/kennethreitz/.local/share/virtualenvs/test-Skyy4vre
项目路径

$ pipenv --where
/Users/kennethreitz/Library/Mobile Documents/com~apple~CloudDocs/repos/kr/pipenv/test
找到Python解释器：

$ pipenv --py
/Users/kennethreitz/.local/share/virtualenvs/test-Skyy4vre/bin/python
安装指定软件包：

$ pipenv install urllib3==1.22
安装开发环境下的包：
通常有一些Python包只在你的开发环境中需要，而不是在生产环境中，例如单元测试包。 Pipenv使用--dev标志区分两个环境。
加 --dev 表示包括 Pipfile 的 dev-packages 中的依赖。

$ pipenv install django --dev
Installing pytest...
...
Adding pytest to Pipfile's [dev-packages]...
django库现在将只在开发虚拟环境中使用。如果你要在你的生产环境中安装你的项目：

这不会安装django包。

但是，如果有一个开发人员将你的项目克隆到自己的开发环境中，他们可以使用--dev标志，将django也安装：

也就是说一个--dev参数，帮你在同一个虚拟环境中又区分出了开发和非开发环境。

显示依赖关系图：

$ pipenv graph
requests==2.18.4
  - certifi [required: >=2017.4.17, installed: 2017.7.27.1]
  - chardet [required: >=3.0.2,<3.1.0, installed: 3.0.4]
  - idna [required: >=2.5,<2.7, installed: 2.6]
  - urllib3 [required: <1.23,>=1.21.1, installed: 1.22]
生成一个锁文件：

$ pipenv lock
Assuring all dependencies from Pipfile are installed...
Locking [dev-packages] dependencies...
Locking [packages] dependencies...
Note: your project now has only default [packages] installed.
To install [dev-packages], run: $ pipenv install --dev
卸载第三方包：

$ pipenv uninstall urllib3
或者
$ pipenv uninstall --all
更新安装包

$ pipenv update urllib3

$ pipenv update  # 更新所有安装包
检查软件包的完整性
你是否担心已安装的软件包有没有安全漏洞？没关系，pipenv 可以帮你检查，运行下面的命令：

$  pipenv check
Checking PEP 508 requirements…
Passed!
Checking installed package safety…
All good!
产生 Pipfile.lock
有时候可能 Pipfile.lock 文件不存在或被删除了，这时候我们可以使用如下命令生成：

以上便是一些常用的 Pipenv 命令，如果要查看更多用法可以参考其官方文档：https://docs.pipenv.org/#pipenv-usage。

修改下载源Pipenv
如果你觉得在使用pipenv install安装的过程中下载比较慢可以指下载源：

[[source]]
name = "pypi"
url = "https://pypi.tuna.tsinghua.edu.cn/simple/"
verify_ssl = true

[dev-packages]

[packages]
requests = "*"
paho-mqtt = "*"
pymongo = "*"
can = "*"
crypto = "*"
gvent = "*"
gevent = "*"

[requires]
python_version = "3.7"
只需要修改Pipfile即可。

Pip下载源

阿里: http://mirrors.aliyun.com/pypi/simple/
豆瓣: http://pypi.douban.com/simple/
清华: https://pypi.tuna.tsinghua.edu.cn/simple

PyCharm配置Pipenv

选择Pipenv 虚拟环境
Base interpreter为本机系统中的python解释器路径
Pipenv executable表示pipenv，命令的环境变量路径


refence:

https://zhuanlan.zhihu.com/p/129371044


pipenv --python 3.8.3

Warning: Python 3.8.3 was not found on your system…
Neither 'pyenv' nor 'asdf' could be found to install Python.
You can specify specific versions of Python with:
$ pipenv --python path/to/python

curl -L https://raw.github.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash









