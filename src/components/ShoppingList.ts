import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./PrintButton";

@customElement("shopping-list")
export class ShoppingList extends LitElement {
	@property({ type: Array })
	items: string[] = [];

	static styles = css`
		:host {
			display: block;
			width: 100%;
			max-width: 400px;
			padding: 1.5rem;
			background-color: var(--bg-color, #ffffff);
			box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
			border-radius: var(--border-radius, 1.5rem);
			border: 1px solid var(--border-color, #e0e0e0);
			font-family: "Helvetica Neue", Arial, sans-serif;
			position: sticky;
			max-height: calc(100vh - 2rem);
			overflow-y: auto;
		}

		h2 {
			margin: 0 0 1.5rem;
			font-size: 1.75rem;
			color: var(--primary-color, #333333);
			font-weight: 500;
		}

		ul {
			list-style-type: none;
			padding: 0;
			margin: 0;
		}

		li {
			padding: 0.75rem 0;
			border-bottom: 1px solid var(--border-color, #e0e0e0);
			color: var(--secondary-color, #555555);
			font-size: 1rem;
		}

		li:last-child {
			border-bottom: none;
		}

		.empty-list {
			font-style: italic;
			color: var(--secondary-color, #888888);
		}

		.print-content {
			margin-bottom: 1rem;
		}
	`;

	render() {
		return html`
			<div class="print-content">
				<h2>Shopping List</h2>
				${this.items.length === 0
					? html`<p class="empty-list">Your shopping list is empty.</p>`
					: html`
							<ul>
								${this.items.map((item) => html`<li>${item}</li>`)}
							</ul>
					  `}
			</div>
			<print-button
				selector=".print-content"
				.disabled="${this.items.length === 0}"
				>Print</print-button
			>
		`;
	}
}
