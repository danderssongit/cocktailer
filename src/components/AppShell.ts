import { html } from "lit-html";
import { Drink } from "../types";
import { preFetchedDrinks } from "../data";

import { component, useState, useEffect } from "haunted";

import "./SearchBar";
import "./SearchResultList";
import "./ShoppingList";
import "./Toast";
import "./ThemeSwitcher";

function AppShell(element: HTMLElement) {
	const [drinks, setDrinks] = useState<Drink[]>(preFetchedDrinks);
	const [shoppingList, setShoppingList] = useState<Set<string>>(new Set());
	const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);
	const [toastMessages, setToastMessages] = useState<string[]>([]);

	useEffect(() => {
		if (isShoppingListVisible) {
			element.setAttribute("data-shopping-list-visible", "true");
		} else {
			element.removeAttribute("data-shopping-list-visible");
		}
	}, [isShoppingListVisible]);

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	const showToast = (message: string) => {
		setToastMessages([...toastMessages, message]);
	};

	const handleSearch = async (e: CustomEvent) => {
		const query = e.detail;
		try {
			const response = await fetch(
				`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
			);
			const data: { drinks: Drink[] } = await response.json();
			const results = data.drinks || [];
			setDrinks(results);
			if (results.length > 0) {
				showToast(`Found ${results.length} results.`);
			} else {
				showToast("No results found.");
			}
		} catch (error) {
			console.error("Error fetching drinks:", error);
			setDrinks([]);
			showToast("An error occurred while searching.");
		}
	};

	const addAllToShoppingList = (ingredients: string[]) => {
		ingredients.forEach((ingredient) => shoppingList.add(ingredient));
		setShoppingList(new Set(shoppingList));
		showToast("Ingredients added to shopping list.");
	};

	const toggleShoppingList = () => {
		setIsShoppingListVisible(!isShoppingListVisible);
	};

	const handleCloseShoppingList = () => {
		setIsShoppingListVisible(false);
	};

	return html`
		<div class="top-bar">
			<search-bar @search=${handleSearch}></search-bar>
			<theme-switcher></theme-switcher>
		</div>
		<div class="main-content">
			<search-result-list
				.drinks=${drinks}
				.shoppingList=${shoppingList}
				@add-all-to-shopping-list=${(e: CustomEvent) =>
					addAllToShoppingList(e.detail)}
			></search-result-list>
			<shopping-list
				.items=${Array.from(shoppingList)}
				?visible=${isShoppingListVisible}
				@close-shopping-list=${handleCloseShoppingList}
			></shopping-list>
		</div>
		<button class="toggle-shopping-list" @click=${toggleShoppingList}>
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
		${toastMessages.map(
			(message) => html`
				<toast-message
					.message=${message}
					@toast-dismissed=${() =>
						setToastMessages(toastMessages.filter((m) => m !== message))}
				></toast-message>
			`
		)}
	`;
}

const styles = `
	:host {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 2rem;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	@media (max-width: 768px) {
		:host::before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s ease-in-out;
			z-index: 999;
		}

		:host([data-shopping-list-visible="true"])::before {
			opacity: 1;
			pointer-events: auto;
		}
	}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define("app-shell", component(AppShell, { useShadowDOM: true }));
