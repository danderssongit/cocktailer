import { html } from "lit-html";
import { component, useEffect } from "haunted";
import { applyAverageColorToElement } from "../utils/imageUtils";
import { ProcessedDrinkItem, ProcessedIngredient } from "../types";

interface SearchResultElement extends HTMLElement {
	item: ProcessedDrinkItem;
}

function SearchResultItem(element: SearchResultElement) {
	const item = element.item;

	useEffect(() => {
		const image = element.shadowRoot?.querySelector("img") as HTMLImageElement;
		const content = element.shadowRoot?.querySelector(
			".item-content"
		) as HTMLElement;
		if (image && content) {
			image.crossOrigin = "anonymous";
			applyAverageColorToElement(image, content);
		}

		if (element.shadowRoot) {
			element.shadowRoot.adoptedStyleSheets = [sheet];
		}
	}, []);

	const areAllIngredientsInShoppingList = (): boolean => {
		const inShoppingList = item?.inShoppingList as boolean[];
		return inShoppingList.every(Boolean);
	};

	const addAllIngredientsToShoppingList = () => {
		const ingredients = item?.ingredients as ProcessedIngredient[];
		if (Array.isArray(ingredients) && !areAllIngredientsInShoppingList()) {
			element.dispatchEvent(
				new CustomEvent("add-all-to-shopping-list", {
					detail: ingredients.map(
						(ingredient) =>
							`${ingredient.measure ? ingredient.measure + " " : ""}${
								ingredient.name
							}`
					),
					bubbles: true,
					composed: true,
				})
			);
		}
	};

	if (!item) {
		return html`<div>No item data available</div>`;
	}

	return html`
		<div class="item-card">
			<img src="${item.imageUrl}" alt="${item.name}" crossorigin="anonymous" />
			<div class="item-content">
				<div class="item-header">
					<h2>${item.name}</h2>
					<div class="button-container">
						<button
							@click=${addAllIngredientsToShoppingList}
							?disabled=${areAllIngredientsInShoppingList()}
						>
							${
								areAllIngredientsInShoppingList()
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
									  </svg>`
							}
						</button>
					</div>
				</div>
				<p class="description">${item.description}</p>
				<div class="ingredients">
					${item.ingredients.map(
						(ingredient: ProcessedIngredient, index: number) => html`
							<span
								class="ingredient ${item.inShoppingList[index]
									? "in-shopping-list"
									: ""}"
							>
								${ingredient.measure
									? `${ingredient.measure} `
									: ""}${ingredient.name}
							</span>
						`
					)}
					</div>
				</div>
			</div>
		</div>
	`;
}

const styles = `
	:host {
		display: block;
	}
	.item-card {
		display: flex;
		background-color: var(--bg-color);
		border-radius: var(--border-radius);
		box-shadow: var(--card-shadow);
		overflow: hidden;
		transition: transform 0.3s ease;
	}
	.item-card img {
		width: 200px;
		object-fit: cover;
	}
	.item-content {
		flex: 1;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: background-color 0.3s ease;
	}
	.item-header {
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
	.description {
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

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define(
	"search-result-item",
	component(SearchResultItem, {
		useShadowDOM: true,
		observedAttributes: [],
	})
);

declare global {
	interface HTMLElementTagNameMap {
		"search-result-item": SearchResultElement;
	}
}

export { SearchResultItem };
