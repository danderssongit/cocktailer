import { LitElement, html } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("search-bar")
export class SearchBar extends LitElement {
	@property()
	query = "";

	render() {
		return html`<input type="text" @input=${this.updateQuery} />`;
	}

	updateQuery(event: Event) {
		this.query = (event.target as HTMLInputElement).value;
	}
}
