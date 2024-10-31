import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js'
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents-icons/dist/AllIcons.js'

@customElement('ui5-pagination')
export class Pagination extends LitElement {
    @property({ type: Number }) pageIndex: number = 0
    @property({ type: Number }) totalPage: number = 0
    @property({ type: Function }) onChange = (e: number) => {
        return e
    }
    @state({})
    private prevIsDisabled = this.totalPage == 0 || this.pageIndex == 0
    @state({})
    private nextIsDisabled =
        this.totalPage == 0 || this.pageIndex == this.totalPage - 1

    private onClick(e: Event) {
        if(e===null){
            return
        }
        const target = e.target as HTMLElement
        if (target.tagName === 'UI5-BUTTON') {
            target.parentElement?.dispatchEvent(new CustomEvent('pagination-click',{
                bubbles:true,
                composed:true,
                detail:parseInt(target.dataset.to!)+1
            }))
            this.onChange(parseInt(target.dataset.to!) + 1)
            this.pageIndex = parseInt(target.dataset.to!)
        }
    }
    protected render() {
        return html`
            <span @click=${this.onClick}>
                <ui5-button
                    design="Emphasized"
                    icon="navigation-left-arrow"
                    disabled=${this.prevIsDisabled}
                    data-to=${this.pageIndex - 1}
                ></ui5-button>
                ${map(Array(this.totalPage), (_, i) => {
                    if (i === this.pageIndex)
                        return html`
                            <ui5-button design="Emphasized" disabled>
                                ${i + 1}
                            </ui5-button>
                        `
                    if (
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
                        return html` <ui5-button design="Default" data-to=${i}>
                            ${i + 1}
                        </ui5-button>`

                    if (i === 0)
                        return html`
                            <ui5-button design="Default" data-to="0">
                                1
                            </ui5-button>
                        `
                    if (i === this.totalPage - 1)
                        return html`
                            <ui5-button design="Default" data-to=${i}>
                                ${this.totalPage}
                            </ui5-button>
                        `
                    if (i === 1)
                        return html`
                            <ui5-button design="Transparent" disabled>
                                ...
                            </ui5-button>
                        `
                    if (i === this.totalPage - 2)
                        return html`
                            <ui5-button design="Transparent" disabled>
                                ...
                            </ui5-button>
                        `
                })}
                <ui5-button
                    design="Emphasized"
                    icon="navigation-right-arrow"
                    disabled=${this.nextIsDisabled}
                    data-to=${this.pageIndex + 1}
                >
                </ui5-button>
            </span>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui5-pagination': Pagination
    }
}
