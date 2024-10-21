import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Drink } from "../types";
import { applyAverageColorToElement } from "../utils/imageUtils.ts";

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
		.drink-card {
			display: flex;
			background-color: var(--bg-color);
			border-radius: var(--border-radius);
			box-shadow: var(--card-shadow);
			overflow: hidden;
			transition: transform 0.3s ease;
		}
		.drink-card img {
			width: 200px;

			object-fit: cover;
		}
		.drink-content {
			flex: 1;
			padding: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			transition: background-color 0.3s ease;
		}
		.drink-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		h2 {
			color: var(--primary-color);
			margin: 0;
		}
		p {
			color: var(--text-color);
		}
		.ingredients {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-top: 1rem;
		}
		.ingredient {
			background-color: var(--secondary-color);
			color: var(--bg-color);
			padding: 0.25rem 0.5rem;
			border-radius: var(--border-radius);
			font-size: 0.875rem;
		}
		.ingredient.in-shopping-list {
			background-color: var(--success-color);
			color: var(--bg-color);
		}
		.button-container {
			margin-left: 1rem;
		}
		.instructions {
			margin-top: 1rem;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		button {
			background-color: var(--primary-color);
			color: var(--bg-color);
			border: none;
			padding: 0.5rem;
			border-radius: 50%;
			cursor: pointer;
			transition: background-color 0.3s ease;
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		button:hover {
			background-color: var(--primary-color-dark);
		}
		button:disabled {
			background-color: var(--success-color);
			cursor: default;
		}
		button svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	`;

	firstUpdated() {
		this.applyBackgroundColors();
	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("drinks")) {
			this.applyBackgroundColors();
		}
	}

	private applyBackgroundColors() {
		setTimeout(() => {
			const drinkCards = this.shadowRoot?.querySelectorAll(".drink-card");
			drinkCards?.forEach((card) => {
				const image = card.querySelector("img") as HTMLImageElement;
				const content = card.querySelector(".drink-content") as HTMLElement;
				if (image && content) {
					image.crossOrigin = "anonymous";
					applyAverageColorToElement(image, content);
				}
			});
		}, 0);
	}

	getIngredients(drink: Drink): string[] {
		const ingredients: string[] = [];
		for (let i = 1; i <= 15; i++) {
			const ingredient = drink[`strIngredient${i}` as keyof Drink];
			const measure = drink[`strMeasure${i}` as keyof Drink];
			if (ingredient) {
				ingredients.push(`${measure || ""} ${ingredient}`.trim());
			}
		}
		return ingredients;
	}

	isInShoppingList(ingredient: string): boolean {
		return this.shoppingList.has(ingredient);
	}

	areAllIngredientsInShoppingList(drink: Drink): boolean {
		const ingredients = this.getIngredients(drink);
		return ingredients.every((ingredient) => this.isInShoppingList(ingredient));
	}

	addAllIngredientsToShoppingList(drink: Drink) {
		const ingredients = this.getIngredients(drink);
		const event = new CustomEvent("add-all-to-shopping-list", {
			detail: ingredients,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
		this.requestUpdate();
	}

	render() {
		return html`
			<div class="drink-list">
				${this.drinks.map(
					(drink) => html`
						<div class="drink-card">
							<img
								src="${drink.strDrinkThumb}"
								alt="${drink.strDrink}"
								crossorigin="anonymous"
							/>
							<div class="drink-content">
								<div class="drink-header">
									<h2>${drink.strDrink}</h2>
									<div class="button-container">
										<button
											@click=${() =>
												this.addAllIngredientsToShoppingList(drink)}
											?disabled=${this.areAllIngredientsInShoppingList(drink)}
										>
											${this.areAllIngredientsInShoppingList(drink)
												? html`<svg viewBox="0 0 24 24">
														<path
															fill="currentColor"
															d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
														/>
												  </svg>`
												: html`<svg viewBox="0 0 24 24">
														<path
															fill="currentColor"
															d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
														/>
												  </svg>`}
										</button>
									</div>
								</div>
								<p class="instructions">${drink.strInstructions}</p>
								<div class="ingredients">
									${this.getIngredients(drink).map(
										(ingredient) => html`
											<span
												class="ingredient ${this.isInShoppingList(ingredient)
													? "in-shopping-list"
													: ""}"
											>
												${ingredient}
											</span>
										`
									)}
								</div>
							</div>
						</div>
					`
				)}
			</div>
		`;
	}
}
