import { html } from "lit-html";
import { component } from "haunted";
import { Drink, ProcessedIngredient } from "../types";
import "./SearchResultItem";

interface SearchResultListElement extends HTMLElement {
	drinks?: Drink[];
	shoppingList?: Set<string>;
}

function SearchResultList(element: SearchResultListElement) {
	const drinks = element.drinks || [];
	const shoppingList = element.shoppingList || new Set();

	const processDrinkWithShoppingList = (drink: Drink) => {
		const ingredients = getIngredientsWithMeasures(drink);
		const inShoppingList = ingredients.map((ingredient) =>
			shoppingList.has(
				`${ingredient.measure ? ingredient.measure + " " : ""}${
					ingredient.name
				}`
			)
		);

		return {
			name: drink.strDrink,
			imageUrl: drink.strDrinkThumb,
			description: drink.strInstructions,
			ingredients,
			inShoppingList,
		};
	};

	const getIngredientsWithMeasures = (drink: Drink): ProcessedIngredient[] => {
		return Array.from({ length: 15 }, (_, i) => i + 1)
			.map((i) => ({
				name: drink[`strIngredient${i}` as keyof Drink],
				measure: drink[`strMeasure${i}` as keyof Drink],
			}))
			.filter(
				(ingredient): ingredient is ProcessedIngredient =>
					ingredient.name != null && ingredient.name !== ""
			);
	};

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	return html`
		<div class="drink-list">
			${drinks.length === 0
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
				: drinks.map(
						(drink) => html`
							<search-result-item
								.item=${processDrinkWithShoppingList(drink)}
							></search-result-item>
						`
				  )}
		</div>
	`;
}

const styles = `
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

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define(
	"search-result-list",
	component(SearchResultList, {
		useShadowDOM: true,
		observedAttributes: [],
	})
);

declare global {
	interface HTMLElementTagNameMap {
		"search-result-list": SearchResultListElement;
	}
}

export { SearchResultList };
