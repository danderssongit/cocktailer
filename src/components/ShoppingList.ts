import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./PrintButton";

@customElement("shopping-list")
export class ShoppingList extends LitElement {
	@property({ type: Array })
	items: string[] = [];

	@property({ type: Boolean, reflect: true })
	visible: boolean = false;

	static styles = css`
		:host {
			display: block;
			background-color: var(--bg-color, #ffffff);
			box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
			border-radius: var(--border-radius, 1.5rem);
			border: 1px solid var(--border-color, #e0e0e0);
			font-family: "Helvetica Neue", Arial, sans-serif;
			overflow-y: auto;
		}

		.content {
			padding: 1.5rem;
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

			li {
				padding: 0.75rem 0;
				border-bottom: 1px solid var(--border-color, #e0e0e0);
				color: var(--secondary-color, #555555);
				font-size: 1rem;

				&:last-child {
					border-bottom: none;
				}
			}
		}

		.empty-list {
			font-style: italic;
			color: var(--secondary-color, #888888);
		}

		.close-button {
			display: none;
		}

		.print-content {
			margin-bottom: 1rem;
		}

		@media (max-width: 768px) {
			:host {
				position: fixed;
				top: 0;
				right: -100%;
				width: 80%;
				max-width: 400px;
				height: 100%;
				border-radius: 0;
				transition: right 0.3s ease-in-out;
				z-index: 1000;
			}

			:host([visible]) {
				right: 0;
			}

			.close-button {
				display: block;
				position: absolute;
				top: 10px;
				right: 10px;
				background: none;
				border: none;
				font-size: 24px;
				cursor: pointer;
				color: var(--primary-color);
			}
		}
	`;

	private closeList() {
		this.dispatchEvent(
			new CustomEvent("close-shopping-list", {
				bubbles: true,
				composed: true,
			})
		);
	}

	render() {
		return html`
			<div class="content">
				<button class="close-button" @click=${this.closeList}>X</button>
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
			</div>
		`;
	}
}
