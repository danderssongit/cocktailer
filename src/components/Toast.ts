import { html } from "lit-html";
import { component } from "haunted";

interface ToastElement extends HTMLElement {
	message?: string;
}

function Toast(element: ToastElement) {
	const message = element.message || "";

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	element.setAttribute("visible", "");
	setTimeout(() => dismiss(element), 3000);

	const dismiss = (el: HTMLElement) => {
		el.setAttribute("exiting", "");
		setTimeout(() => {
			el.dispatchEvent(
				new CustomEvent("toast-dismissed", { bubbles: true, composed: true })
			);
		}, 300);
	};

	return html`<div>${message}</div>`;
}

const styles = `
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
