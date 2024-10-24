import { html } from "lit-html";
import { component, useState } from "haunted";

function SearchBar(element: HTMLElement) {
	const [query, setQuery] = useState("");

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	const handleSearch = () => {
		element.dispatchEvent(
			new CustomEvent("search", {
				detail: query,
				bubbles: true,
				composed: true,
			})
		);
	};

	const handleInput = (event: InputEvent) => {
		setQuery((event.target as HTMLInputElement).value);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSearch();
		} else if (event.key === "Escape") {
			setQuery("");
		}
	};

	return html`
		<style>
			${styles}
		</style>
		<div class="search-container">
			<input
				type="search"
				@input=${handleInput}
				@keydown=${handleKeyDown}
				.value=${query}
				placeholder="Search..."
			/>
			<button @click=${handleSearch}>
				<svg class="search-icon" viewBox="0 0 24 24">
					<path
						d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
					/>
				</svg>
			</button>
		</div>
	`;
}

const styles = `
	:host {
		display: inline-flex;
		align-items: center;
	}
	.search-container {
		display: flex;
		align-items: center;
		border: 1px solid var(--border-color, #ccc);
		border-radius: calc(var(--border-radius, 0.25rem) * 3);
		overflow: hidden;
		transition: all 0.3s ease;
	}
	.search-container:focus-within {
		border-color: var(--focus-color, #007bff);
		box-shadow: 0 0 0 2px var(--focus-shadow-color, rgba(0, 123, 255, 0.25));
	}
	input {
		font-family: var(--font-family, Arial, sans-serif);
		font-size: var(--font-size, 1rem);
		color: var(--text-color, #333);
		background-color: var(--bg-color, #fff);
		border: none;
		padding: 0 0.75rem;
		width: var(--width, 16rem);
		outline: none;
	}
	button {
		background-color: var(--focus-color, #007bff);
		border: none;
		color: white;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button:hover {
		background-color: var(--focus-shadow-color, rgba(0, 123, 255, 0.8));
	}
	.search-icon {
		width: 1rem;
		height: 1rem;
		fill: currentColor;
	}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define("search-bar", component(SearchBar));

declare global {
	interface HTMLElementTagNameMap {
		"search-bar": HTMLElement;
	}
}

export { SearchBar };
