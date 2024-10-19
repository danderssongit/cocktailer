import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("item-list")
export class ItemList extends LitElement {
	@property({ type: Array })
	items: string[] = [];

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has("items")) {
			console.log("Items updated:", this.items);
		}
	}

	render() {
		console.log(this.items);
		return html` <h2>Items</h2>
			<ul>
				${this.items.map((item) => html`<li>${item}</li>`)}
			</ul>`;
	}
}
