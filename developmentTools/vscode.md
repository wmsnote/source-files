## 1. settings

```json
{
    // https://github.com/chrisspen/django-python-code-field/blob/master/pylint.messages
    "python.linting.pylintArgs": [
        "--load-plugins=pylint_django",
        "--disable=C0111",
        "--disable=missing-docstring",
        "--disable=C0114",
        "--disable=C0115",
        "--disable=C0116",
        "--disable=C0303"
    ],
    "workbench.iconTheme": "vscode-icons",
    "files.autoSave": "afterDelay",
    "git.autofetch": true,
    "editor.minimap.enabled": false,
    "sync.gist": "1dabe39360cfa8e2c51a7e5b0cb0b6f8",
    "files.exclude": {
        "**/.classpath": true,
        "**/.factorypath": true,
        "**/.gradle": true,
        "**/.project": true,
        "**/.settings": true,
        "**/.vscode": true,
        "**/bin": false,
        "**/gradle": true,
        "**/.idea": true,
        "**/_v_images/": true,
        "**/_v_recycle_bin/": true
    },
    "workbench.activityBar.visible": true,
    "python.autoComplete.addBrackets": true,
    "editor.fontSize": 16,
    "powermode.enabled": true,
    "editor.snippetSuggestions": "bottom",
    "workbench.colorTheme": "Panda Syntax",
    "powermode.presets": "flames",
    "editor.quickSuggestions": {
        "other": true,
        "comments": true,
        "strings": true
    },
    "editor.acceptSuggestionOnEnter": "on",
    "editor.quickSuggestionsDelay": 10,
    "editor.suggestOnTriggerCharacters": true,
    "editor.tabCompletion": "on",
    "editor.suggest.localityBonus": true,
    "editor.suggestSelection": "recentlyUsed",
    "editor.wordBasedSuggestions": true,
    "editor.parameterHints.enabled": true,
    "go.autocompleteUnimportedPackages": true,
    "go.gotoSymbol.includeImports": true,
    "go.useCodeSnippetsOnFunctionSuggest": true,
    "go.useCodeSnippetsOnFunctionSuggestWithoutType": true,
    "go.goroot": "/usr/local/go",
    "go.gopath": "/Users/qingclass/go",
    "go.gocodeAutoBuild": true,
    "peacock.favoriteColors": [
        {
            "name": "Angular Red",
            "value": "#b52e31"
        },
        {
            "name": "Auth0 Orange",
            "value": "#eb5424"
        },
        {
            "name": "Azure Blue",
            "value": "#007fff"
        },
        {
            "name": "C# Purple",
            "value": "#68217A"
        },
        {
            "name": "Gatsby Purple",
            "value": "#639"
        },
        {
            "name": "Go Cyan",
            "value": "#5dc9e2"
        },
        {
            "name": "Java Blue-Gray",
            "value": "#557c9b"
        },
        {
            "name": "JavaScript Yellow",
            "value": "#f9e64f"
        },
        {
            "name": "Mandalorian Blue",
            "value": "#1857a4"
        },
        {
            "name": "Node Green",
            "value": "#215732"
        },
        {
            "name": "React Blue",
            "value": "#00b3e6"
        },
        {
            "name": "Something Different",
            "value": "#832561"
        },
        {
            "name": "Vue Green",
            "value": "#42b883"
        }
    ],
    "editor.renderIndentGuides": true,
    "workbench.startupEditor": "newUntitledFile",
    "files.eol": "\n",
    "[markdown]": {
        "editor.quickSuggestions": true
    },
    "evermonkey.noteStoreUrl": "https://www.evernote.com/shard/s576/notestore",
    "evermonkey.token": "S=s576:U=b852ca2:E=176033657cd:C=16eab8528c8:P=1cd:A=en-devtoken:V=2:H=24784e0fa5886617187cf57b69f089a2",
    "evermonkey.uploadFolder": "/Users/qingclass/Desktop/",
    "evermonkey.attachmentsFolder": "/Users/qingclass/Desktop/",
    "markdownlint.config": {
        "MD012": false,
        "MD025": false,
        "MD007": false,
        "MD004": false,
        "MD009": false,
        "MD047": false,
        "MD041": false,
        "MD045": false,
        "MD022": false,
        "MD031": false,
        "MD040": false,
        "MD036": false,
        "MD033": false,
        "MD010": false
    },
    "gitlens.hovers.currentLine.over": "line",
    "vsintellicode.modify.editor.suggestSelection": "disabled",
    "window.menuBarVisibility": "default",
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "background.enabled": true,
    "background.useDefault": true,
    "background.useFront": true,
    //"http.proxy": "http://127.0.0.1:1080",
    //"http.proxyStrictSSL": false
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/*/**": true
    },
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "files.trimTrailingWhitespace": true,
    "files.encoding": "utf8",
    //"editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": false,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false
    },
    "editor.codeActionsOnSave": {
        // For ESLint
        "source.fixAll.eslint": true,
        // For TSLint
        "source.fixAll.tslint": true,
        // For Stylelint
        "source.fixAll.stylelint": true
    },
    //npm i -g prettier htmlhint prettier-eslint prettier-stylelint
    //npm i -g @vue/eslint-config-prettier
    "vetur.validation.template": false,
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false,
            "singleQuote": false,
            "arrowParens": "always",
            "trailingComma": "all",
        }
    },
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "eslint.enable": true,
    "eslint.options": {
        "extensions": [
            ".js",
            ".jsx",
            ".vue"
        ]
    },
    "git.confirmSync": false,
    "explorer.confirmDelete": false,
    "terminal.integrated.rendererType": "dom",
    "window.zoomLevel": 0,
    "diffEditor.renderSideBySide": true,
    "zenMode.fullScreen": true,
    "python.jediEnabled": false,
    "todo-tree.tree.showScanModeButton": false,

}

```
## 2. plugins


01. Activitus Bar
02. Ansible
03. ansible-autocomplete
04. auto Close Tag
05. auto Comment Blocks
06. auto Import
07. auto Rename Tag
08. background
09. beautify
10. better Align
11. better Acomments
12. bookmarks
13. barcket Pair Colorizer
14. change-case
15. comment Anchors
16. debugger For Chrome
17. dotenv
18. element Ui Snippets
19. error gutters
20. error lens
21. eslint
22. evermonkey
23. file template
24. file utils
25. formatting toggle
26. git blame
27. git history
28. gitlens
29. horizon theme
30. html css support
31. htmlhint
32. javascript(es6)code snippets
33. json
34. jumpy
35. language-ansible
36. markdown all in one
37. markdown shortcuts
38. markdownlint
39. night owl
40. npm intellisense
41. panda theme
42. path intellisense
43. power mode
44. prettier-code formatter
45. prettify json
46. project manager
47. python
48. python postfix complition
49. rest client
50. settings sync
51. statusbar error
52. stylelint
53. todo highlight
54. todo tree
55. vagrantfile support
56. vetur
57. visual studio intellicode
58. vscode-element-helper
59. vscode-iconsvscode-python-docstring
60. vue
61. vue 2 snippets
62. vue vs vode extension pack
63. vue vscode snippets
64. vue-element-admin-snippet
65. vue-element-snippets
























