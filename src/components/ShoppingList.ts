import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("shopping-list")
export class ShoppingList extends LitElement {
	@property({ type: Array })
	items: string[] = [];

	static styles = css`
		:host {
			display: block;
			width: 100%;
			margin: 0;
			padding: 1rem;
			background-color: var(--bg-color, #fff);
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
			border-radius: 0.5rem;
			font-family: "Futura", sans-serif;
			position: sticky;
			top: 1rem;
			max-height: calc(100vh - 2rem);
			overflow-y: auto;
		}

		h2 {
			margin: 0 0 1rem;
			font-size: 1.5rem;
			color: var(--primary-color, #333);
		}

		ul {
			list-style-type: none;
			padding: 0;
			margin: 0;
		}

		li {
			padding: 0.5rem 0;
			border-bottom: 1px solid var(--border-color, #eee);
			color: var(--secondary-color, #666);
			font-size: 1rem;
		}

		li:last-child {
			border-bottom: none;
		}

		.empty-list {
			font-style: italic;
			color: var(--secondary-color, #666);
		}
	`;

	render() {
		return html`
			<h2>Shopping List</h2>
			${this.items.length === 0
				? html`<p class="empty-list">Your shopping list is empty.</p>`
				: html`
						<ul>
							${this.items.map((item) => html`<li>${item}</li>`)}
						</ul>
				  `}
		`;
	}
}

export * from "./ShoppingList";
