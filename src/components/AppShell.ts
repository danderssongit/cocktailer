import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Drink } from "../types";
import { drinks } from "../data";

import "./SearchBar";
import "./SearchResultList";
import "./ShoppingList";
import "./Toast";

@customElement("app-shell")
export class AppShell extends LitElement {
	@state()
	private drinks: Drink[] = drinks;

	@state()
	private shoppingList: Set<string> = new Set();

	@state()
	private isShoppingListVisible: boolean = false;

	@state()
	private toastMessages: string[] = [];

	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			height: 100vh;
			padding: 2rem;
		}

		.main-content {
			display: flex;
			flex: 1;
			overflow-y: auto;
			margin-top: 2rem;
			gap: 1rem;
		}

		search-result-list {
			flex: 1;
			overflow-y: auto;
		}

		.toggle-shopping-list {
			position: fixed;
			bottom: 20px;
			left: 20px;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background-color: var(--primary-color);
			color: var(--bg-color);
			border: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
			z-index: 999;

			svg {
				width: 30px;
				height: 30px;
			}
		}

		@media (min-width: 769px) {
			.main-content {
				display: flex;
				gap: 2rem;
			}

			search-result-list {
				flex: 3;
			}

			shopping-list {
				flex: 1;
				max-width: 300px;
			}

			.toggle-shopping-list {
				display: none;
			}
		}
	`;

	private showToast(message: string) {
		this.toastMessages = [...this.toastMessages, message];
	}

	async handleSearch(e: CustomEvent) {
		const query = e.detail;
		this.showToast("Searching...");
		try {
			const response = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
			);
			const data: { drinks: Drink[] } = await response.json();
			this.drinks = data.drinks || [];
			if (this.drinks.length > 0) {
				this.showToast(`Found ${this.drinks.length} results.`);
			} else {
				this.showToast("No results found.");
			}
		} catch (error) {
			console.error("Error fetching drinks:", error);
			this.drinks = [];
			this.showToast("An error occurred while searching.");
		}
	}

	addAllToShoppingList(ingredients: string[]) {
		ingredients.forEach((ingredient) => this.shoppingList.add(ingredient));
		this.shoppingList = new Set(this.shoppingList); // Create a new Set to trigger update
		this.requestUpdate("shoppingList");
		this.showToast("Ingredients added to shopping list.");
	}

	toggleShoppingList() {
		this.isShoppingListVisible = !this.isShoppingListVisible;
		this.requestUpdate();
	}

	private handleCloseShoppingList() {
		this.isShoppingListVisible = false;
	}

	render() {
		return html`
			<search-bar @search=${this.handleSearch}></search-bar>
			<div class="main-content">
				<search-result-list
					.drinks=${this.drinks}
					.shoppingList=${this.shoppingList}
					@add-all-to-shopping-list=${(e: CustomEvent) =>
						this.addAllToShoppingList(e.detail)}
				></search-result-list>
				<shopping-list
					.items=${Array.from(this.shoppingList)}
					?visible=${this.isShoppingListVisible}
					@close-shopping-list=${() => (this.isShoppingListVisible = false)}
				></shopping-list>
			</div>
			<button class="toggle-shopping-list" @click=${this.toggleShoppingList}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
					/>
				</svg>
			</button>
			${this.toastMessages.map(
				(message) => html`
					<toast-message
						.message=${message}
						@toast-dismissed=${() =>
							(this.toastMessages = this.toastMessages.filter(
								(m) => m !== message
							))}
					></toast-message>
				`
			)}
		`;
	}
}
