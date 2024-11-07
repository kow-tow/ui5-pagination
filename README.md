# ui5-pagination

適用於目前任意 ![UI5 Web Components](./public/favicon.svg) [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) 版本（1.8+ 定 2.3+）的分頁組件

[![lit](https://img.shields.io/badge/lit-4c64ff.svg?style=for-the-badge&logo=lit)](https://lit.dev/)
[![pnpm v9](https://img.shields.io/badge/maintained%20with-pnpm%209.0-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![nodejs v20](https://img.shields.io/badge/Node.js-v20.17.0-026e00.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

## 安裝

### lit

作爲對等依賴，也可以不安裝，按下面的操作來提升 `@ui5/webcomponents>lit`

先指認版本

```json5
// package.json
"pnpm": {
    "overrides": {
        "lit": "$@ui5/webcomponents"
    }
}
```

然後提升依賴

```ini
# .npmrc
hoist-pattern[] = *lit*
public-hoist-pattern[] = *lit*
```

以上操作再利用其他基於`lit`的框架時，或同`@ui5`的`lit`版本不一致時非常有用

## ui5

ui5當然要一起安裝

```shell
pnpm i @ui5/webcomponents
pnpm i @ui5/webcomponents-icons
pnpm i ui5-pagination
```

## CDN 支援

雖然 ui5官網不推薦 但你依然可以透過 [`JSPM`](https://generator.jspm.io/) 來生成`importmap`

使用`JSPM`會同`pnpm`一樣將`lit@*`取到最新導致同`@ui5`依賴的`lit`版本不一致，

所以你應該手動添加以下`importmap`字段（`@ui5` 目前依賴 `lit@2.8.0`）：

```diff
<script type="importmap">
    {
        "imports": {
            "@ui5/webcomponents-icons/AllIcons.js": "https://ga.jspm.io/npm:@ui5/webcomponents-icons@2.3.0/dist/AllIcons.js",
            "@ui5/webcomponents/dist/Button.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Button.js",
            "@ui5/webcomponents/dist/Dialog.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Dialog.js",
            "@ui5/webcomponents/dist/Input.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Input.js",
            "@ui5/webcomponents/dist/Label.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Label.js",
            "@ui5/webcomponents/dist/Option.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Option.js",
            "@ui5/webcomponents/dist/Select.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Select.js",
            "@ui5/webcomponents-compat/Table.js": "https://ga.jspm.io/npm:@ui5/webcomponents-compat@2.3.0/dist/Table.js",
            "@ui5/webcomponents-compat/TableCell.js": "https://ga.jspm.io/npm:@ui5/webcomponents-compat@2.3.0/dist/TableCell.js",
            "@ui5/webcomponents-compat/TableColumn.js": "https://ga.jspm.io/npm:@ui5/webcomponents-compat@2.3.0/dist/TableColumn.js",
            "@ui5/webcomponents-compat/TableRow.js": "https://ga.jspm.io/npm:@ui5/webcomponents-compat@2.3.0/dist/TableRow.js",
            "@ui5/webcomponents/dist/Toast.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Toast.js",
+           "ui5-pagination": "https://ga.jspm.io/npm:ui5-pagination@0.2.1/dist/index.js"
        },
        "scopes": {
            "https://ga.jspm.io/": {
                "@ui5/webcomponents-base/dist/": "https://ga.jspm.io/npm:@ui5/webcomponents-base@2.3.0/dist/",
                "@ui5/webcomponents-icons/dist/": "https://ga.jspm.io/npm:@ui5/webcomponents-icons@2.3.0/dist/",
                "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js": "https://ga.jspm.io/npm:@ui5/webcomponents-theming@2.3.0/dist/generated/themes/sap_horizon/parameters-bundle.css.js",
                "@ui5/webcomponents/dist/": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/",
                "lit-html": "https://ga.jspm.io/npm:lit-html@2.8.0/development/lit-html.js",
                "lit-html/": "https://ga.jspm.io/npm:lit-html@2.8.0/development/",
+               "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.3.3/development/lit-element.js",
+               "lit": "https://ga.jspm.io/npm:lit@2.8.0/index.js",
+               "lit/": "https://ga.jspm.io/npm:lit@2.8.0/",
+               "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.3/development/reactive-element.js",
+               "@lit/reactive-element/decorators/": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.3/development/decorators/"
            }
        }
    }
</script>
```

雖然 `@ui5` 很長一段時間一直是依賴 `lit@2.8.0`，寫成 `lit@*` 可以不必頻繁跟隨維護

## 基本

即使不使用也要引入按鈕和圖標

```html
<script type="module">
    import '@ui5/webcomponents/dist/Button.js'
    // 若全部引入圖標： import '@ui5/webcomponents-icons/AllIcons.js'
    // 只引入最基本的兩隻箭頭圖標：
    import '@ui5/webcomponents-icons/dist/navigation-left-arrow.js'
    import '@ui5/webcomponents-icons/dist/navigation-right-arrow.js'
    // 以上是對等套件
    import 'ui5-pagination'
</script>
<!-- current 從1開始 ；index 從0開始 -->
<ui5-pagination total="10" current="4"></ui5-pagination>
<ui5-pagination total="10" index="3"></ui5-pagination>
<script type="module">
    const pagination = document.querySelector('ui5-pagination')
    /**
     * 事件獲取的都是 pageNumber；
     * `this.current = e.detail` 是這個事件的默認行爲
     */
    pagination.addEventListener('page-to', (e) =>
        console.log(`number: ${e.detail}`),
    )
    pagination.onChange = (n) => console.log(n)
</script>
```

## 開發

如果你想貢獻代碼或者二次開發

```shell
# 安裝
pnpm i
# 倘若lit版本同@ui5/webcomponents所依賴的不一致 可以强制指定
pnpm i lit@2.8.0  --save-peer

# 調試
pnpm dev

# 構建
pnpm build
```
