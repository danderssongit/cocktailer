import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("toast-message")
export class Toast extends LitElement {
	@property({ type: String }) message = "";

	static styles = css`
		:host {
			position: fixed;
			bottom: 20px;
			right: 2rem;
			transform: translateY(0);
			background-color: var(--primary-color);
			color: var(--bg-color);
			padding: 10px 20px;
			border-radius: var(--border-radius);
			opacity: 0;
			transition: opacity 0.3s ease, transform 0.3s ease;
			z-index: 1000;
			pointer-events: none;
		}

		:host([visible]) {
			opacity: 1;
		}

		:host([exiting]) {
			opacity: 0;
			transform: translateY(100%);
		}

		/* Add these styles for stacking toasts */
		:host(:nth-last-of-type(2)) {
			transform: translateY(-60px);
		}

		:host(:nth-last-of-type(3)) {
			transform: translateY(-120px);
		}

		:host(:nth-last-of-type(n + 4)) {
			transform: translateY(-180px);
		}
	`;

	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("visible", "");
		setTimeout(() => this.dismiss(), 3000);
	}

	dismiss() {
		this.setAttribute("exiting", "");
		setTimeout(() => {
			this.dispatchEvent(
				new CustomEvent("toast-dismissed", { bubbles: true, composed: true })
			);
		}, 300);
	}

	render() {
		return html`<div>${this.message}</div>`;
	}
}
