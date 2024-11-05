import { LitElement, PropertyValues, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js'

@customElement('ui5-pagination')
export class Pagination extends LitElement {
    @property({ type: Number }) pageIndex: number = 0
    @property({ type: Number }) totalPage: number = 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @property({ type: Function }) onChange = (_i: number) => {}
    @state({})
    pages: Array<number> = []
    @state({})
    current = 1
    private onClick(e: PointerEvent | MouseEvent) {
        const target = e.target as HTMLElement | null
        if (target?.tagName === 'UI5-BUTTON') {
            const to = parseInt(target.dataset.to!) || 0
            if (
                this.renderRoot.dispatchEvent(
                    new CustomEvent('pagination-click', {
                        bubbles: true,
                        composed: true,
                        detail: to,
                        cancelable: true,
                    }),
                )
            )
                this.onChange?.((this.current = to))
        }
    }

    protected firstUpdated(changed: PropertyValues): void {
        if (changed.has('totalPage')) {
            this.pages = Array.from({ length: this.totalPage }, (_, i) => i + 1)
        }
        if (changed.has('pageIndex')) {
            if (this.pageIndex !== 0) this.current = this.pageIndex
        }
    }
    protected updated(changed: PropertyValues): void {
        if (changed.has('current')) {
            this.pageIndex = this.current - 1
        }
    }

    protected render() {
        return html`<span
            style=" display: inline-flex;
            gap: 4px;"
            @click=${this.onClick}
        >
            <ui5-button
                design="Emphasized"
                icon="navigation-left-arrow"
                ?disabled="${this.totalPage == 0 || this.pageIndex == 0}"
                data-to=${this.current - 1}
            ></ui5-button>
            ${map(this.pages, (p) => {
                if (p === this.current)
                    return html`<ui5-button design="Emphasized" disabled>
                        ${p}
                    </ui5-button>`
                if (
                    this.totalPage < 8 ||
                    Math.abs(p - this.current) <
                        Math.max(
                            this.pages.at(5)! - this.current,
                            this.current - this.pages.at(-6)!,
                            2,
                        ) ||
                    (p == this.pages.at(1) &&
                        this.current == this.pages.at(3)) ||
                    (p == this.pages.at(-2) &&
                        this.current == this.pages.at(-4))
                )
                    return html` <ui5-button design="Default" data-to="${p}">
                        ${p}
                    </ui5-button>`

                if (p === this.pages.at(0))
                    return html`<ui5-button design="Default" data-to="1">
                        1
                    </ui5-button>`
                if (p === this.pages.at(-1))
                    return html`<ui5-button design="Default" data-to="${p}">
                        ${p}
                    </ui5-button>`
                if (p === this.pages.at(1))
                    return html`<ui5-button design="Transparent" disabled>
                        ...
                    </ui5-button>`
                if (p === this.pages.at(-2))
                    return html`<ui5-button design="Transparent" disabled>
                        ...
                    </ui5-button>`
            })}
            <ui5-button
                design="Emphasized"
                icon="navigation-right-arrow"
                ?disabled="${this.totalPage == 0 ||
                this.current == this.totalPage}"
                data-to=${this.current + 1}
            ></ui5-button>
        </span>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui5-pagination': Pagination
    }
}
