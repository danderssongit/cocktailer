import { LitElement, html } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("cocktail-app")
export class CocktailApp extends LitElement {
	@property()
	name = "world";

	render() {
		return html`<h1>Hello ${this.name}</h1>`;
	}
}

@customElement("counter-button")
export class CounterButton extends LitElement {
	@property()
	count = 0;

	addOne() {
		this.count++;
	}

	render() {
		return html`<button @click=${this.addOne}>Click me ${this.count}</button>`;
	}
}
