import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Drink } from "../types";

@customElement("search-result-list")
export class SearchResultList extends LitElement {
	@property({ type: Array })
	drinks: Drink[] = [];

	static styles = css`
		:host {
			display: block;
			max-width: 60rem;
			margin: 0 auto;
			padding: 1rem;
		}
		.drink-item {
			display: flex;
			margin-bottom: 1.5rem;
			padding: 1.5rem;
			background-color: var(--bg-color, #fff);
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
			border-radius: 0.5rem;
			transition: transform 0.2s ease-in-out;
			font-family: "Futura", sans-serif;
		}
		.drink-item:hover {
			transform: translateY(-0.25rem);
		}
		.drink-item h3 {
			margin: 0 0 0.5rem;
			font-size: 1.25rem;
			color: var(--primary-color, #333);
		}
		.drink-item img {
			width: 8rem;
			height: 8rem;
			object-fit: cover;
			border-radius: 1rem;
			margin-right: 1.5rem;
		}
		.drink-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			font-size: 1rem;
		}
		.drink-item p {
			margin: 0;
			color: var(--secondary-color, #666);
			line-height: 1.4;
		}
		.ingredients {
			margin-top: 0.5rem;
		}
		.ingredients h4 {
			margin: 0 0 0.25rem;
			color: var(--primary-color, #333);
		}
		.ingredients ul {
			margin: 0;
			padding: 0;
			list-style-type: disc;
			list-style-position: inside;
			display: flex;
			flex-wrap: wrap;
			font-size: 1rem;
			color: var(--secondary-color, #666);
		}
		.ingredients li {
			width: 50%;
			padding: 0.25rem 0;
		}
		@media (max-width: 768px) {
			.drink-item {
				flex-direction: column;
				align-items: center;
				text-align: center;
			}
			.drink-item img {
				margin-right: 0;
				margin-bottom: 1rem;
			}
			.drink-info {
				width: 100%;
			}
			.ingredients li {
				width: 100%;
			}
		}
	`;

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("drinks")) {
			console.log("Drinks array updated:", this.drinks);
		}
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

	render() {
		return html`
			<div>
				${this.drinks.map(
					(drink) => html`
						<div class="drink-item">
							<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
							<div class="drink-info">
								<h3>${drink.strDrink}</h3>
								<p>${drink.strInstructions}</p>
								<div class="ingredients">
									<h4>Ingredients:</h4>
									<ul>
										${this.getIngredients(drink).map(
											(ingredient) => html`<li>${ingredient}</li>`
										)}
									</ul>
								</div>
							</div>
						</div>
					`
				)}
			</div>
		`;
	}
}
