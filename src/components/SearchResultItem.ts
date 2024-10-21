import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { applyAverageColorToElement } from "../utils/imageUtils";

@customElement("search-result-item")
export class SearchResultItem extends LitElement {
	@property({ type: Object }) item?: {
		name: string;
		imageUrl: string;
		description: string;
		ingredients: string[];
		inShoppingList: boolean[];
	};

	static styles = css`
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

	firstUpdated() {
		this.applyBackgroundColor();
	}

	private applyBackgroundColor() {
		const image = this.shadowRoot?.querySelector("img") as HTMLImageElement;
		const content = this.shadowRoot?.querySelector(
			".item-content"
		) as HTMLElement;
		if (image && content) {
			image.crossOrigin = "anonymous";
			applyAverageColorToElement(image, content);
		}
	}

	private areAllIngredientsInShoppingList(): boolean {
		const inShoppingList = this.item?.inShoppingList as boolean[];
		return inShoppingList.every(Boolean);
	}

	private addAllIngredientsToShoppingList() {
		const ingredients = this.item?.ingredients as string[];
		if (Array.isArray(ingredients) && !this.areAllIngredientsInShoppingList()) {
			this.dispatchEvent(
				new CustomEvent("add-all-to-shopping-list", {
					detail: ingredients,
					bubbles: true,
					composed: true,
				})
			);
		}
	}

	render() {
		if (!this.item) {
			return html`<div>No item data available</div>`;
		}

		const name = this.item.name as string;
		const imageUrl = this.item.imageUrl as string;
		const description = this.item.description as string;
		const ingredients = this.item.ingredients as string[];
		const inShoppingList = this.item.inShoppingList as boolean[];

		return html`
			<div class="item-card">
				<img src="${imageUrl}" alt="${name}" crossorigin="anonymous" />
				<div class="item-content">
					<div class="item-header">
						<h2>${name}</h2>
						<div class="button-container">
							<button
								@click=${() => this.addAllIngredientsToShoppingList()}
								?disabled=${this.areAllIngredientsInShoppingList()}
							>
								${this.areAllIngredientsInShoppingList()
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
					<p class="description">${description}</p>
					<div class="ingredients">
						${ingredients.map(
							(ingredient, index) => html`
								<span
									class="ingredient ${inShoppingList[index]
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
		`;
	}
}
