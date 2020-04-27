(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{371:function(_,t,v){"use strict";v.r(t);var a=v(18),r=Object(a.a)({},(function(){var _=this,t=_.$createElement,v=_._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h2",{attrs:{id:"_1-传播属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-传播属性"}},[_._v("#")]),_._v(" 1. 传播属性")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",[_._v("传播性")]),_._v(" "),v("th",[_._v("值")]),_._v(" "),v("th",[_._v("描述")])])]),_._v(" "),v("tbody",[v("tr",[v("td",[_._v("REQUIRED")]),_._v(" "),v("td",[_._v("0")]),_._v(" "),v("td",[_._v("支持当前事物，如果没有就新建事物")])]),_._v(" "),v("tr",[v("td",[_._v("SUPPORTS")]),_._v(" "),v("td",[_._v("1")]),_._v(" "),v("td",[_._v("支持当前事物，如果没有就不以事物的方式运行")])]),_._v(" "),v("tr",[v("td",[_._v("MANDATORY")]),_._v(" "),v("td",[_._v("2")]),_._v(" "),v("td",[_._v("支持当前事物，如果当前没有事物就抛异常")])]),_._v(" "),v("tr",[v("td",[_._v("REQUIRES_NEW")]),_._v(" "),v("td",[_._v("3")]),_._v(" "),v("td",[_._v("无论调用者是否有事务，被调用者都会新建一个事务")])]),_._v(" "),v("tr",[v("td",[_._v("NOT_SUPPORTED")]),_._v(" "),v("td",[_._v("4")]),_._v(" "),v("td",[_._v("不支持事物，如果当前有事物，将当前事物挂起，不以事物的方式运行")])]),_._v(" "),v("tr",[v("td",[_._v("NEVER")]),_._v(" "),v("td",[_._v("5")]),_._v(" "),v("td",[_._v("不支持事物，如果有事物就抛异常")])]),_._v(" "),v("tr",[v("td",[_._v("NESTED")]),_._v(" "),v("td",[_._v("6")]),_._v(" "),v("td",[_._v("如果当前存在事物，就在当前事物中再新起一个事物")])])])]),_._v(" "),v("h3",{attrs:{id:"propagation-required"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-required"}},[_._v("#")]),_._v(" 1️⃣ PROPAGATION_REQUIRED")]),_._v(" "),v("ul",[v("li",[_._v("支持当前事物，如果没有就新建事物")]),_._v(" "),v("li",[_._v("上游如果有事物，上游和下游就共处一个事物里面")]),_._v(" "),v("li",[_._v("上游如果没有事物，下游就新建一个事物（上游无事物，下游有事物）")])]),_._v(" "),v("h3",{attrs:{id:"propagation-supports"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-supports"}},[_._v("#")]),_._v(" 🇨🇳 PROPAGATION_SUPPORTS")]),_._v(" "),v("ul",[v("li",[_._v("被调用者是否有事务，完全依赖于调用者，调用者有事务则有事务，调用者没事务则没事务。")]),_._v(" "),v("li",[_._v("上游没有事物，下游也没有事物")]),_._v(" "),v("li",[_._v("上游有事物，下游和上游共处一个事物里面")])]),_._v(" "),v("h3",{attrs:{id:"propagation-mandatory"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-mandatory"}},[_._v("#")]),_._v(" ✌️ PROPAGATION_MANDATORY")]),_._v(" "),v("ul",[v("li",[_._v("支持当前事务，如果当前没事务就抛异常")]),_._v(" "),v("li",[_._v("上游有事物，上游和下游都在一个事物里")]),_._v(" "),v("li",[_._v("上游没有事物，下游直接抛出异常了")])]),_._v(" "),v("h3",{attrs:{id:"propagation-requires-new"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-requires-new"}},[_._v("#")]),_._v(" 🔥 PROPAGATION_REQUIRES_NEW")]),_._v(" "),v("ul",[v("li",[_._v("此传播属性下，无论调用者是否有事务，被调用者都会新建一个事务")]),_._v(" "),v("li",[_._v("上游无事物，下游新建一个事物，上游无事物，下游有事物")]),_._v(" "),v("li",[_._v("上游有事物，下游新建一个事物，上游一个事物，下游一个事物，两个事物无关，谁异常谁回滚，互不影响")])]),_._v(" "),v("h3",{attrs:{id:"propagation-not-supported"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-not-supported"}},[_._v("#")]),_._v(" 😄 PROPAGATION_NOT_SUPPORTED")]),_._v(" "),v("ul",[v("li",[_._v("无论调用者是否有事务，被调用者都不以事务的方法运行")]),_._v(" "),v("li",[_._v("上游无事物，下游无事物")]),_._v(" "),v("li",[_._v("上游有事物，下游仍然无事物，上游抛出异常，上游自己回滚，下游不会回滚，不受管辖")])]),_._v(" "),v("h3",{attrs:{id:"propagation-never"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-never"}},[_._v("#")]),_._v(" ❤️ PROPAGATION_NEVER")]),_._v(" "),v("ul",[v("li",[_._v("调用者有事务，被调用者就会抛出异常")]),_._v(" "),v("li",[_._v("上游无事物，下游无事物")]),_._v(" "),v("li",[_._v("上游有事物，上游抛异常（上游再调用下游之前，代码运行正常，执行到调用下游的代码时，抛出异常，下游压根不会执行，上游因为有事物，也会回滚）")])]),_._v(" "),v("h3",{attrs:{id:"propagation-nested"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#propagation-nested"}},[_._v("#")]),_._v(" ⭕️ PROPAGATION_NESTED")]),_._v(" "),v("ul",[v("li",[_._v("此传播属性下，被调用者的事务是调用者的事务的子集。")]),_._v(" "),v("li",[_._v("上游无事物，下游新起自己的独立事物，上游无事物，下游有自己的事物")]),_._v(" "),v("li",[_._v("上游有事物，对上游来说，上游和下游共处一个事物里，上游有异常，下游也会回滚；")]),_._v(" "),v("li",[_._v("对下游来说，下游有异常，上游不会回滚，")])]),_._v(" "),v("p",[_._v("可以看出来嵌套事务的本质就是外层会影响内层，内层不影响外层。而REQUIRES_NEW则是互不影响。")])])}),[],!1,null,null,null);t.default=r.exports}}]);