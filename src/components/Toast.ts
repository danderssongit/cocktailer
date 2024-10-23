import { html } from "lit-html";
import { component } from "haunted";

interface ToastElement extends HTMLElement, ToastMessage {}

export enum ToastType {
	SUCCESS = "success",
	ERROR = "error",
	INFO = "info",
}

export type ToastMessage = {
	message: string;
	type: ToastType;
};

function Toast(element: ToastElement) {
	const message = element.message || "";
	const type = element.type || ToastType.INFO;

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	element.setAttribute("visible", "");
	element.setAttribute("type", type);
	setTimeout(() => dismiss(element), 5000);

	const dismiss = (el: HTMLElement) => {
		el.setAttribute("exiting", "");
		setTimeout(() => {
			el.dispatchEvent(
				new CustomEvent("toast-dismissed", { bubbles: true, composed: true })
			);
		}, 300);
	};

	return html`<div class="toast-content">${message}</div>`;
}

const styles = `
	:host {
		position: fixed;
		bottom: 20px;
		right: 2rem;
		transform: translateY(0);
		padding: 10px 20px;
		border-radius: var(--border-radius);
		opacity: 0;
		transition: opacity 0.3s ease, transform 0.3s ease;
		z-index: 1000;
		pointer-events: none;
		background-color: var(--primary-color-light);
		color: var(--bg-color);
	}

	:host([type="success"]) {
		background-color: var(--success-color);
		color: var(--success-text-color);
	}

	:host([type="error"]) {
		background-color: var(--error-color);
		color: var(--error-text-color);
	}

	:host([type="info"]) {
		background-color: var(--info-color);
		color: var(--info-text-color);
	}

	:host([visible]) {
		opacity: 1;
	}

	:host([exiting]) {
		opacity: 0;
		transform: translateY(100%);
	}

	:host(:nth-last-of-type(2)) {
		transform: translateY(-60px);
	}

	:host(:nth-last-of-type(3)) {
		transform: translateY(-120px);
	}

	:host(:nth-last-of-type(n + 4)) {
		transform: translateY(-180px);
	}

	.toast-content {
		display: inline-block;
	}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define(
	"toast-message",
	component(Toast, {
		useShadowDOM: true,
		observedAttributes: ["message"],
	})
);

declare global {
	interface HTMLElementTagNameMap {
		"toast-message": ToastElement;
	}
}

export { Toast };
