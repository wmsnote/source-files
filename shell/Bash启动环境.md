## 1. Session

用户每次使用 Shell，都会开启一个与 Shell 的 Session（对话）。

Session 有两种类型：登录 Session 和非登录 Session，也可以叫做 login shell 和 non-login shell。

## 2. 登录 Session

登录 Session 是用户登录系统以后，系统为用户开启的原始 Session，通常需要用户输入用户名和密码进行登录。

登录 Session 一般进行整个系统环境的初始化，启动的初始化脚本依次如下。

| 脚本 | 含义 |
| ------------- | ------------- |
| /etc/profile | 所有用户的全局配置脚本。 |
| /etc/profile.d | 目录里面所有.sh文件 |
| ~/.bash_profile | 用户的个人配置脚本。如果该脚本存在，则执行完就不再往下执行。|
| ~/.bash_login | 如果~/.bash_profile没找到，则尝试执行这个脚本（C shell 的初始化脚本）。如果该脚本存在，则执行完就不再往下执行。|
| ~/.profile | 如果~/.bash_profile和~/.bash_login都没找到，则尝试读取这个脚本（Bourne shell 和 Korn shell 的初始化脚本）。|

> Linux 发行版更新的时候，会更新/etc里面的文件，比如/etc/profile，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在/etc/profile.d目录里面新建.sh脚本。

如果想修改你个人的登录环境，一般是写在`~/.bash_profile`里面。下面是一个典型的.bash_profile文件。

```bash
PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
PATH=$PATH:$HOME/bin

SHELL=/bin/bash
MANPATH=/usr/man:/usr/X11/man
EDITOR=/usr/bin/vi
PS1='\h:\w\$ '
PS2='> '

if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi

export PATH
export EDITOR
```

可以看到，这个脚本定义了一些最基本的环境变量，然后执行了`~/.bashrc`。

bash命令的--login参数，会强制执行登录 Session 会执行的脚本。`$ bash --login`

bash命令的--noprofile参数，会跳过上面这些 Profile 脚本。 `$ bash --noprofile`

## 3. 非登录 Session

非登录 Session 是用户进入系统以后，手动新建的 Session，这时不会进行环境初始化。比如，在命令行执行bash命令，就会新建一个非登录 Session。

非登录 Session 的初始化脚本依次如下。

- `/etc/bash.bashrc`：对全体用户有效。
- `~/.bashrc`：仅对当前用户有效。

> 对用户来说，`~/.bashrc`通常是最重要的脚本。非登录 Session 默认会执行它，而登陆 Session 一般也会通过调用执行它。由于每次执行 Bash 脚本，都会新建一个非登录 Session，所以`~/.bashrc`也是每次执行脚本都会执行的。

bash命令的--norc参数，可以禁止在非登录 Session 执行`~/.bashrc`脚本。`$ bash --norc`
bash命令的--rcfile参数，指定另一个脚本代替.bashrc。`$ bash --rcfile testrc`

## 4. .bash_logout

`~/.bash_logout`脚本在每次退出 Session 时执行，通常用来做一些清理工作和记录工作，比如删除临时文件，记录用户在本次 Session 花费的时间。

如果没有退出时要执行的命令，这个文件也可以不存在。

## 5. 启动选项

为了方便 Debug，有时在启动 Bash 的时候，可以加上启动参数。

-n：不运行脚本，只检查是否有语法错误。
-v：输出每一行语句运行结果前，会先输出该行语句。
-x：每一个命令处理完以后，先输出该命令，再进行下一个命令的处理。
$ bash -n scriptname
$ bash -v scriptname
$ bash -x scriptname

## 6. 键盘绑定

Bash 允许用户定义自己的快捷键。全局的键盘绑定文件默认为/etc/inputrc，你可以在主目录创建自己的键盘绑定文件.inputrc文件。如果定义了这个文件，需要在其中加入下面这行，保证全局绑定不会被遗漏。

`$include /etc/inputrc`
`.inputrc`文件里面的快捷键，可以像这样定义，"\C-t":"pwd\n"表示将Ctrl + t绑定为运行pwd命令。



