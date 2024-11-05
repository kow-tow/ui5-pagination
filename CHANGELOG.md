# Changelog

由於版本控制混亂，只列出可以使用的版本以及其用法變化

## v0.2.0

```html
<script type="module">
    import "@ui5/webcomponents-icons/AllIcons.js"
    import "@ui5/webcomponents/dist/Button.js"
    import "ui5-pagination"
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
    pagination.addEventListener("page-to", e => console.log(`number: ${e.detail}`))
    pagination.onChange = n => console.log(n)
</script>
```

## v0.0.6

```html
<script type="module">
    import "@ui5/webcomponents-icons/AllIcons.js"
    import "@ui5/webcomponents/dist/Button.js"
    import "ui5-pagination"
</script>
<!-- pageIndex 從0開始 -->
<ui5-pagination totalPage="10" pageIndex="3"></ui5-pagination>
<script type="module">
    const pagination = document.querySelector('ui5-pagination')
    /**
     * 事件獲取的都是 pageIndex
     * `this.pageIndex = e.detail` 是這個事件的默認行爲
     */
    pagination.addEventListener("pagination-click", e => console.log(`index: ${e.detail}`))
    pagination.onChange = i => console.log(i)
</script>
```
