(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{384:function(s,a,n){"use strict";n.r(a);var e=n(9),t=Object(e.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都视为字符串。因此，字符串相关的引号和转义，对 Bash 来说就非常重要。")]),s._v(" "),n("h2",{attrs:{id:"_1-转义"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-转义"}},[s._v("#")]),s._v(" 1. 转义")]),s._v(" "),n("p",[s._v("某些字符在 Bash 里面有特殊含义（比如"),n("code",[s._v("$")]),s._v("、"),n("code",[s._v("&")]),s._v("、"),n("code",[s._v("*")]),s._v("）。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$date")]),s._v("\n\n$\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面例子中，输出$date不会有任何结果，因为$是一个特殊字符。")]),s._v(" "),n("p",[s._v("如果想要原样输出这些特殊字符，就必须在它们前面加上反斜杠，使其变成普通字符。这就叫做“转义”（escape）。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$date")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$date")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("上面命令中，只有在特殊字符$前面加反斜杠，才能原样输出。")]),s._v(" "),n("p",[s._v("反斜杠本身也是特殊字符，如果想要原样输出反斜杠，就需要对它自身转义，连续使用两个反斜线（\\）。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("上面例子输出了反斜杠本身。")]),s._v(" "),n("p",[s._v("反斜杠除了用于转义，还可以表示一些不可打印的字符。")]),s._v(" "),n("p",[n("code",[s._v("\\a")]),s._v("：响铃\n"),n("code",[s._v("\\b")]),s._v("：退格\n"),n("code",[s._v("\\n")]),s._v("：换行\n"),n("code",[s._v("\\r")]),s._v("：回车\n"),n("code",[s._v("\\t")]),s._v("：制表符")]),s._v(" "),n("p",[s._v("如果想要在命令行使用这些不可打印的字符，可以把它们放在引号里面，然后使用echo命令的-e参数。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("tb\natb\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" -e "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"a'),n("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v('b"')]),s._v("\na        b\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("上面例子中，命令行直接输出不可打印字符，Bash 不能正确解释。必须把它们放在引号之中，然后使用echo命令的-e参数。")]),s._v(" "),n("p",[s._v("由于反斜杠可以对换行符转义，使得 Bash 认为换行符是一个普通字符，从而可以将一行命令写成多行。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n/path/to/foo "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n/path/to/bar\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[n("code",[s._v("$ mv /path/to/foo /path/to/bar")])]),s._v(" "),n("p",[s._v("上面例子中，如果一条命令过长，就可以在行尾使用反斜杠，将其改写成多行。这是常见的多行命令的写法。")]),s._v(" "),n("h2",{attrs:{id:"_2-单引号"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-单引号"}},[s._v("#")]),s._v(" 2. 单引号")]),s._v(" "),n("p",[s._v("Bash 允许字符串放在单引号或双引号之中，加以引用。")]),s._v(" "),n("p",[s._v("单引号用于保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符，比如星号（"),n("code",[s._v("*")]),s._v("）、美元符号（"),n("code",[s._v("$")]),s._v("）、反斜杠（"),n("code",[s._v("\\")]),s._v("）等。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'*'")]),s._v("\n*\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'"),n("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$USER")]),s._v("'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$USER")]),s._v("\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'"),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$((")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("))")])]),s._v("'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$((")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("))")])]),s._v("\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'"),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" foo"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" foo"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])]),n("p",[s._v("上面命令中，单引号使得 Bash 扩展、变量引用、算术运算和子命令，都失效了。如果不使用单引号，它们都会被 Bash 自动扩展。")]),s._v(" "),n("p",[s._v("由于反斜杠在单引号里面变成了普通字符，所以如果单引号之中，还要使用单引号，不能使用转义，需要在外层的单引号前面加上一个美元符号（$），然后再对里层的单引号转义。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" it"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s\n\n# 不正确\n$ echo '")]),s._v("it"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("'s"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'\n\n\n$ echo $'")]),s._v("it"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("'s'\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("不过，更合理的方法是改在双引号之中使用单引号。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"it\'s"')]),s._v("\nit's\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h2",{attrs:{id:"_3-双引号"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-双引号"}},[s._v("#")]),s._v(" 3. 双引号")]),s._v(" "),n("p",[s._v("双引号比单引号宽松，可以保留大部分特殊字符的本来含义，但是三个字符除外：美元符号（$）、反引号（`）和反斜杠（\\）。也就是说，这三个字符在双引号之中，会被 Bash 自动扩展。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*"')]),s._v("\n*\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("上面例子中，通配符"),n("code",[s._v("*")]),s._v("放在双引号之中，就变成了普通字符，会原样输出。这一点需要特别留意，双引号里面不会进行文件名扩展。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$SHELL")]),s._v('"')]),s._v("\n/bin/bash\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("date")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v('"')]),s._v("\nMon Jan "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("27")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),s._v(":33:18 CST "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2020")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("上面例子中，美元符号和反引号在双引号中，都保持特殊含义。美元符号用来引用变量，反引号则是执行子命令。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("\"I'd say: "),n("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),s._v("hello!"),n("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[s._v('\\"')]),s._v('"')]),s._v("\nI'd say: "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello!"')]),s._v("\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[s._v("\\\\")]),s._v('"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("上面例子中，反斜杠在双引号之中保持特殊含义，用来转义。所以，可以使用反斜杠，在双引号之中插入双引号，或者插入反斜杠本身。")]),s._v(" "),n("p",[s._v("由于双引号将换行符解释为普通字符，所以可以利用双引号，在命令行输入多行文本。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello\nworld"')]),s._v("\nhello\nworld\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("上面命令中，Bash 正常情况下会将换行符解释为命令结束，但是换行符在双引号之中就是普通字符，所以可以输入多行。\necho命令会将换行符原样输出，显示的时候正常解释为换行。")]),s._v(" "),n("p",[s._v("双引号的另一个常见的使用场合是，文件名包含空格。这时就必须使用双引号，将文件名放在里面。")]),s._v(" "),n("p",[n("code",[s._v('$ ls "two words.txt"')]),s._v("\n上面命令中，two words.txt是一个包含空格的文件名，否则就会被 Bash 当作两个文件。")]),s._v(" "),n("p",[s._v("双引号会原样保存多余的空格。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"this is a     test"')]),s._v("\nthis is a     "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("双引号还有一个作用，就是保存原始命令的输出格式。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cal")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n一月 "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2020")]),s._v(" 日 一 二 三 四 五 六 "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(". "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("31")]),s._v("\n\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cal")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v('"')]),s._v("\n      一月 "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2020")]),s._v("\n日 一 二 三 四 五 六\n          "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\n "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("15")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("23")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("26")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("27")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("28")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("29")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("31")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("p",[s._v("上面例子中，如果$(cal)不放在双引号之中，echo就会将所有结果以单行输出，丢弃了所有原始的格式。")]),s._v(" "),n("h2",{attrs:{id:"_4-here-文档"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-here-文档"}},[s._v("#")]),s._v(" 4. Here 文档")]),s._v(" "),n("p",[s._v("Here 文档（here document）是一种输入多行字符串的方法，格式如下。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("token\ntext\ntoken")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("它的格式分成开始标记（"),n("code",[s._v("<< token")]),s._v("）和结束标记（"),n("code",[s._v("token")]),s._v("）。开始标记是两个小于号 + Here 文档的名称，名称可以随意取，后面必须是一个换行符；结束标记是单独一行顶格写的 Here 文档名称，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。")]),s._v(" "),n("p",[s._v("下面是一个通过 Here 文档输出 HTML 代码的例子。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("_EOF_\n<html>\n<head>\n    <title>\n    The title of your page\n    </title>\n</head>\n\n<body>\n    Your page content goes here.\n</body>\n</html>\n_EOF_")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("p",[s._v("Here 文档内部会发生变量替换和通配符扩展，但是双引号和单引号都失去语法作用，变成了普通字符。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("foo")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'hello world'")]),s._v("\n$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("_example_\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v('\n"'),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v("\"\n'"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v("'\n_example_")]),s._v("\n\nhello world\n"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello world"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'hello world'")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("上面例子中，变量$foo发生了替换，但是双引号和单引号都原样输出了，表明它们已经失去了引用的功能。")]),s._v(" "),n("p",[s._v("如果不希望发生变量替换和通配符扩展，可以把 Here 文档的开始标记放在单引号之中。")]),s._v(" "),n("div",{staticClass:"language-Bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("foo")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'hello world'")]),s._v("\n$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'_example_'\n$foo\n\"$foo\"\n'$foo'\n_example_")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v('"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v("'")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("上面例子中，Here 文档的开始标记（"),n("em",[s._v("example")]),s._v("）放在单引号之中，导致变量替换失效了。")]),s._v(" "),n("p",[s._v("Here 文档的本质是重定向，它将字符串重定向输出给某个命令，相当于包含了echo命令。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("token\n  string\ntoken")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("上面代码中，Here 文档相当于echo命令的重定向。")]),s._v(" "),n("p",[s._v("所以，Here 字符串只适合那些可以接受标准输入作为参数的命令，对于其他命令无效，比如echo命令就不能用 Here 文档作为参数。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("_example_\nhello\n_example_")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面例子不会有任何输出，因为 Here 文档对于echo命令无效。")]),s._v(" "),n("p",[s._v("此外，Here 文档也不能作为变量的值，只能用于命令的参数。")]),s._v(" "),n("h2",{attrs:{id:"_5-here-字符串"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5-here-字符串"}},[s._v("#")]),s._v(" 5. Here 字符串")]),s._v(" "),n("p",[s._v("Here 文档还有一个变体，叫做 Here 字符串（Here string），使用三个小于号（<<<）表示。")]),s._v(" "),n("p",[n("code",[s._v("<<< string")]),s._v(" 它的作用是将字符串通过标准输入，传递给命令。")]),s._v(" "),n("p",[s._v("有些命令直接接受给定的参数，与通过标准输入接受参数，结果是不一样的。所以才有了这个语法，使得将字符串通过标准输入传递给命令更方便，比如cat命令只接受标准输入传入的字符串。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'hi there'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#相当于")]),s._v("\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'hi there'")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面的第一种语法使用了 Here 字符串，要比第二种语法看上去语义更好，也更简洁。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ md5sum "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<<")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ddd'")]),s._v("\n\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ddd'")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" md5sum\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面例子中，md5sum命令只能接受标准输入作为参数，不能直接将字符串放在命令后面，会被当作文件名，即md5sum ddd里面的ddd会被解释成文件名。这时就可以用 Here 字符串，将字符串传给md5sum命令。")])])}),[],!1,null,null,null);a.default=t.exports}}]);