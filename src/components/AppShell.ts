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
			flex: 3;
			overflow-y: auto;
		}

		shopping-list {
			flex: 1;
			min-width: 25%;
			position: sticky;
			height: fit-content;
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
				<shopping-list .items=${Array.from(this.shoppingList)}></shopping-list>
			</div>
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
