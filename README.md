# ui5-pagination

適用於目前任意 ![UI5 Web Components](./public/favicon.svg) [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) 版本的分頁組件

[![lit](https://img.shields.io/badge/lit-4c64ff.svg?style=for-the-badge&logo=lit)](https://lit.dev/)
[![pnpm v9](https://img.shields.io/badge/maintained%20with-pnpm%209.0-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![nodejs v20](https://img.shields.io/badge/Node.js-v20.17.0-026e00.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

## 安裝

```shell
pnpm i @ui5/webcomponents
pnpm i @ui5/webcomponents-icons
pnpm i ui5-pagination
```

或者利用 [JSPM](https://generator.jspm.io/)

```html
<script type="importmap">
    {
        "imports": {
            "@ui5/webcomponents-icons/AllIcons.js": "https://ga.jspm.io/npm:@ui5/webcomponents-icons@2.3.0/dist/AllIcons.js",
            "@ui5/webcomponents/dist/Button.js": "https://ga.jspm.io/npm:@ui5/webcomponents@2.3.0/dist/Button.js",
            "ui5-pagination": "https://ga.jspm.io/npm:ui5-pagination@0.2.1/dist/index.js"
        },
        "scopes": {
            "https://ga.jspm.io/": {
                "@ui5/webcomponents-base/dist/": "https://ga.jspm.io/npm:@ui5/webcomponents-base@2.3.0/dist/",
                "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js": "https://ga.jspm.io/npm:@ui5/webcomponents-theming@2.3.0/dist/generated/themes/sap_horizon/parameters-bundle.css.js",
                "lit-html": "https://ga.jspm.io/npm:lit-html@2.8.0/development/lit-html.js",
                "lit-html/": "https://ga.jspm.io/npm:lit-html@2.8.0/development/"
            }
        }
    }
</script>
```

## 基本

需要引入按鈕和圖標

```html
<script type="module">
    import '@ui5/webcomponents-icons/AllIcons.js'
    import '@ui5/webcomponents/dist/Button.js'
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
# 調試
pnpm dev
# 構建
pnpm build
```
