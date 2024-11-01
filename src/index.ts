import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js'

@customElement('ui5-pagination')
export class Pagination extends LitElement {
    @property({ type: Number }) pageIndex: number = 0
    @property({ type: Number }) totalPage: number = 0
    @property({ type: Function }) onChange = (_i: number) => { }
    private onClick(e: PointerEvent | MouseEvent) {
        const target = e.target as HTMLElement | null
        if (target?.tagName === 'UI5-BUTTON') {
            const to = parseInt(target.dataset.to!) || 0
            if (
                this.renderRoot.dispatchEvent(new CustomEvent('pagination-click', {
                    bubbles: true,
                    composed: true,
                    detail: to,
                    cancelable: true
                }))
            )
                this.onChange?.(this.pageIndex = to)
        }
    }
    protected render() {
        return html`<span style="display:inline-flex;gap:4px" @click=${this.onClick}>
            <ui5-button
                design="Emphasized"
                icon="navigation-left-arrow"
                ?disabled="${this.totalPage == 0 || this.pageIndex == 0}"
                data-to=${this.pageIndex - 1}
            ></ui5-button>
        ${map(Array(this.totalPage), (_, i) => {
            if (i === this.pageIndex)
                return html`<ui5-button design="Emphasized" disabled>${i + 1}</ui5-button>`
            if (
                this.totalPage < 8 ||
                Math.abs(i - this.pageIndex) <
                Math.max(
                    5 - this.pageIndex,
                    6 - this.totalPage + this.pageIndex,
                    2,
                ) ||
                (i == 1 && this.pageIndex == 3) ||
                (i == this.totalPage - 2 &&
                    this.pageIndex == this.totalPage - 4)
            )
                return html`<ui5-button design="Default" data-to=${i}>${i + 1}</ui5-button>`

            if (i === 0)
                return html`<ui5-button design="Default" data-to="0">1</ui5-button>`
            if (i === this.totalPage - 1)
                return html`<ui5-button design="Default" data-to=${i}>${this.totalPage}</ui5-button>`
            if (i === 1)
                return html`<ui5-button design="Transparent" disabled>...</ui5-button>`
            if (i === this.totalPage - 2)
                return html`<ui5-button design="Transparent" disabled>...</ui5-button>`
        })}
            <ui5-button
                design="Emphasized"
                icon="navigation-right-arrow"
                ?disabled="${this.totalPage == 0 || this.pageIndex == this.totalPage - 1}"
                data-to=${this.pageIndex + 1}
            ></ui5-button>
        </span>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui5-pagination': Pagination
    }
}
