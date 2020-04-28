(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{364:function(s,a,n){"use strict";n.r(a);var t=n(9),e=Object(t.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"_1-简介"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[s._v("#")]),s._v(" 1. 简介")]),s._v(" "),n("p",[s._v("函数（function）是可以重复使用的代码片段，有利于代码的复用。它与别名（alias）的区别是，别名只适合封装简单的单个命令，函数则可以封装复杂的多行命令。")]),s._v(" "),n("p",[s._v("函数总是在当前 Shell 执行，这是跟脚本的一个重大区别，Bash 会新建一个子 Shell 执行脚本。\n如果函数与脚本同名，函数会优先执行。但是，函数的优先级不如别名，即如果函数与别名同名，那么别名优先执行。")]),s._v(" "),n("p",[s._v("Bash 函数定义的语法有两种。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("fn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("fn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])]),n("p",[s._v("上面代码中，fn是自定义的函数名，函数代码就写在大括号之中。这两种写法是等价的。")]),s._v(" "),n("p",[s._v("下面是一个简单函数的例子。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("hello")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v('"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面代码中，函数体里面的$1表示函数调用时的第一个参数。")]),s._v(" "),n("p",[s._v("调用时，就直接写函数名，参数跟在函数名后面。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ hello world\nhello world\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("下面是一个多行函数的例子，显示当前日期时间。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("today")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" -n "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Today\'s date is: "')]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("date")]),s._v(" +"),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%A, %B %-d, %Y"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("删除一个函数，可以使用unset命令。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("unset")]),s._v(" -f functionName\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("查看当前 Shell 已经定义的所有函数，可以使用declare命令。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("declare")]),s._v(" -f\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("上面的declare命令不仅会输出函数名，还会输出所有定义。输出顺序是按照函数名的字母表顺序。由于会输出很多内容，最好通过管道命令配合more或less使用。")]),s._v(" "),n("p",[s._v("declare命令还支持查看单个函数的定义。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("declare")]),s._v(" -f functionName\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("declare -F可以输出所有已经定义的函数名，不含函数体。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("declare")]),s._v(" -F\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h2",{attrs:{id:"_2-参数变量"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-参数变量"}},[s._v("#")]),s._v(" 2. 参数变量")]),s._v(" "),n("p",[s._v("函数体内可以使用参数变量，获取函数参数。函数的参数变量，与脚本参数变量是一致的。")]),s._v(" "),n("ul",[n("li",[n("code",[s._v("$1~$9")]),s._v("：函数的第一个到第9个的参数。")]),s._v(" "),n("li",[n("code",[s._v("$0")]),s._v("：函数所在的脚本名。")]),s._v(" "),n("li",[n("code",[s._v("$#")]),s._v("：函数的参数总数。")]),s._v(" "),n("li",[n("code",[s._v("$@")]),s._v("：函数的全部参数，参数之间使用空格分隔。")]),s._v(" "),n("li",[n("code",[s._v("$*")]),s._v("：函数的全部参数，参数之间使用变量$IFS值的第一个字符分隔，默认为空格，但是可以自定义。")])]),s._v(" "),n("p",[s._v("如果函数的参数多于9个，那么第10个参数可以用${10}的形式引用，以此类推。")]),s._v(" "),n("p",[s._v("下面是一个示例脚本test.sh。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("alice")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"alice: '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$@")]),s._v('"')]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$0")]),s._v(": "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$2")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$3")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$4")]),s._v('"')]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$#")]),s._v(' arguments"')]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nalice "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" wonderland\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])]),n("p",[s._v("运行该脚本，结果如下。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v(" test.sh\nalice: "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" wonderland\ntest.sh: "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" wonderland\n"),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" arguments\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("上面例子中，由于函数alice只有第一个和第二个参数，所以第三个和第四个参数为空。")]),s._v(" "),n("p",[s._v("下面是一个日志函数的例子。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("log_msg")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"['),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("date")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'+ %F %T'")]),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v(" ]: "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$@")]),s._v('"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("使用方法如下。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ log_msg "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"This is sample log message"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2018")]),s._v("-08-16 "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),s._v(":56:34 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(": This is sample log message\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h2",{attrs:{id:"_3-return-命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-return-命令"}},[s._v("#")]),s._v(" 3. return 命令")]),s._v(" "),n("p",[s._v("return命令用于从函数返回一个值。函数执行到这条命令，就不再往下执行了，直接返回了。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("func_return_value")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("return")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("函数将返回值返回给调用者。如果命令行直接执行函数，下一个命令可以用$?拿到返回值。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ func_return_value\n$ "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Value returned by function is: '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$?")]),s._v('"')]),s._v("\nValue returned by "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" is: "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("return后面不跟参数，只用于返回也是可以的。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("name")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  commands\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("return")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("h2",{attrs:{id:"_4-全局变量和局部变量，local-命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-全局变量和局部变量，local-命令"}},[s._v("#")]),s._v(" 4. 全局变量和局部变量，local 命令")]),s._v(" "),n("p",[n("strong",[s._v("Bash 函数体内直接声明的变量，属于全局变量，整个脚本都可以读取。这一点需要特别小心。")])]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("foo")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"fn: foo = '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v('"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nfn\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"global: foo = '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v('"')]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("上面脚本的运行结果如下。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v(" test.sh\nfn: foo "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nglobal: foo "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面例子中，变量$foo是在函数fn内部声明的，函数体外也可以读取。")]),s._v(" "),n("p",[s._v("函数体内不仅可以声明全局变量，还可以修改全局变量。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("foo")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("foo")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("上面代码执行后，输出的变量$foo值为2。")]),s._v(" "),n("p",[s._v("函数里面可以用local命令声明局部变量。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function-name function"}},[s._v("fn")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("local")]),s._v(" foo\n  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("foo")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"fn: foo = '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v('"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nfn\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"global: foo = '),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v('"')]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])]),n("p",[s._v("上面脚本的运行结果如下。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v(" test.sh\nfn: foo "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nglobal: foo "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("上面例子中，local命令声明的$foo变量，只在函数体内有效，函数体外没有定义。")])])}),[],!1,null,null,null);a.default=e.exports}}]);