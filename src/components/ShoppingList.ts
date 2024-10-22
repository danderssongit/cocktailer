import { html } from "lit-html";
import { component, useEffect } from "haunted";

import "./PrintButton";

interface ShoppingListElement extends HTMLElement {
	items: string[];
	visible?: boolean;
}

function ShoppingList(element: ShoppingListElement) {
	const items = element.items || [];
	const visible = element.visible || false;

	useEffect(() => {
		if (visible) {
			element.setAttribute("visible", "");
		} else {
			element.removeAttribute("visible");
		}
	}, [visible]);

	const closeList = () => {
		element.dispatchEvent(
			new CustomEvent("close-shopping-list", {
				bubbles: true,
				composed: true,
			})
		);
	};

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	return html`
		<div class="content">
			<button class="close-button" @click=${closeList}>X</button>
			<div class="print-content">
				<h2>Shopping List</h2>
				${items.length === 0
					? html`<p class="empty-list">Your shopping list is empty.</p>`
					: html`
							<ul>
								${items.map((item) => html` <li>${item}</li> `)}
							</ul>
					  `}
			</div>
			<print-button selector=".print-content" .disabled="${items.length === 0}">
				Print
			</print-button>
		</div>
	`;
}

const styles = `
  :host {
    display: block;
    width: 100%;
    color: var(--text-color, #333);
    font-family: var(--font-family, "Futura", Arial, sans-serif);
  }

  .content {
    background-color: var(--bg-color, #fff);
    padding: 1.5rem;
    border-radius: var(--border-radius, 0.5rem);
    box-shadow: var(--card-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
    position: relative;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary-color, #250524);
    font-size: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
  }

  li {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color, #ddd);
  }

  li:last-child {
    border-bottom: none;
  }

  .empty-list {
    color: var(--secondary-color, #666);
    font-style: italic;
    margin: 1rem 0;
  }

  .close-button {
    display: none;
  }

  @media (max-width: 768px) {
    :host {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 400px;
      height: fit-content;
      background-color: var(--bg-color, #fff);
      transition: right 0.3s ease-in-out;
      z-index: 1000;
      padding: 1rem;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    }

    :host([visible]) {
      right: 0;
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: none;
      padding: 0;
    }

    .print-content {
      flex: 1;
      overflow-y: auto;
    }

    .close-button {
      display: block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-color);
      font-size: 1.2rem;
      padding: 0.5rem;
      line-height: 1;
      z-index: 1;
    }

    .close-button:hover {
      color: var(--primary-color);
    }
  }

  print-button {
    display: block;
    width: 100%;
  }
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define(
	"shopping-list",
	component(ShoppingList, { useShadowDOM: true })
);

declare global {
	interface HTMLElementTagNameMap {
		"shopping-list": ShoppingListElement;
	}
}

export { ShoppingList };
