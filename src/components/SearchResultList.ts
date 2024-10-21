import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Drink } from "../types";
import "./SearchResultItem";
import { SearchResultItem } from "./SearchResultItem";

@customElement("search-result-list")
export class SearchResultList extends LitElement {
	@property({ type: Array })
	drinks: Drink[] = [];

	@property({ type: Object })
	shoppingList: Set<string> = new Set();

	static styles = css`
		:host {
			display: block;
			font-family: var(--font-family);
		}
		.drink-list {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		.no-results {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 200px;
			background-color: var(--bg-color);
			border-radius: var(--border-radius);
			box-shadow: var(--card-shadow);
			color: var(--text-color);
			text-align: center;
		}
		.no-results svg {
			width: 64px;
			height: 64px;
			margin-bottom: 1rem;
			color: var(--primary-color);
		}
		.no-results h3 {
			margin: 0 0 0.5rem 0;
			color: var(--primary-color);
		}
		.no-results p {
			margin: 0;
		}
	`;

	private processDrinkWithShoppingList(drink: Drink): SearchResultItem["item"] {
		const ingredients = this.getIngredients(drink);
		const inShoppingList = ingredients.map((ingredient) =>
			this.shoppingList.has(ingredient)
		);

		return {
			name: drink.strDrink,
			imageUrl: drink.strDrinkThumb,
			description: drink.strInstructions,
			ingredients,
			inShoppingList,
		};
	}

	private getIngredients(drink: Drink): string[] {
		return Array.from({ length: 15 }, (_, i) => i + 1)
			.map((i) => drink[`strIngredient${i}` as keyof Drink])
			.filter(
				(ingredient): ingredient is string =>
					ingredient != null && ingredient !== ""
			);
	}

	render() {
		return html`
			<div class="drink-list">
				${this.drinks.length === 0
					? html`
							<div class="no-results">
								<svg viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
									/>
								</svg>
								<h3>No drinks found</h3>
								<p>Try something else.</p>
							</div>
					  `
					: this.drinks.map(
							(drink) => html`
								<search-result-item
									.item=${this.processDrinkWithShoppingList(drink)}
								></search-result-item>
							`
					  )}
			</div>
		`;
	}
}
