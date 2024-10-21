import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Drink } from "../types";
import { drinks } from "../data";

import "./SearchBar";
import "./SearchResultList";
import "./ShoppingList";

@customElement("app-shell")
export class AppShell extends LitElement {
	@state()
	private drinks: Drink[] = drinks;

	@state()
	private shoppingList: Set<string> = new Set();

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
			top: 2rem;
			max-height: calc(100vh - 4rem);
			overflow-y: auto;
		}
	`;

	async handleSearch(e: CustomEvent) {
		const query = e.detail;
		try {
			const response = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
			);
			const data: { drinks: Drink[] } = await response.json();
			this.drinks = data.drinks || [];
		} catch (error) {
			console.error("Error fetching drinks:", error);
			this.drinks = [];
		}
	}

	addAllToShoppingList(ingredients: string[]) {
		ingredients.forEach((ingredient) => this.shoppingList.add(ingredient));
		this.requestUpdate("shoppingList");
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
		`;
	}
}
