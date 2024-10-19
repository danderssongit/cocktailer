import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

import "./SearchBar";
import "./ItemList";

@customElement("app-shell")
export class AppShell extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			height: 100vh;
		}
		.main-content {
			display: flex;
			flex: 1;
		}
		.item-list {
			flex: 2;
			overflow-y: auto;
		}
		.shopping-list {
			flex: 1;
			border-left: 1px solid #ccc;
		}
	`;

	render() {
		return html`
			<search-bar></search-bar>
			<div class="main-content">
				<div class="item-list">
					<item-list></item-list>
				</div>
				<div class="shopping-list">
					<h2>Shopping List</h2>
					<shopping-list></shopping-list>
					<button>Print</button>
				</div>
			</div>
			<div id="search-status"></div>
		`;
	}
}
