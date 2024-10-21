import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("print-button")
export class PrintButton extends LitElement {
	@property({ type: String }) selector = "";
	@property({ type: Boolean }) disabled = false;

	static styles = css`
		button {
			background-color: var(--primary-color, #333333);
			color: var(--bg-color, #ffffff);
			border: none;
			padding: 0.5rem 1rem;
			border-radius: 0.25rem;
			cursor: pointer;
			font-size: 1rem;
			transition: background-color 0.3s ease;
		}

		button:disabled {
			cursor: not-allowed;
			background-color: var(--primary-color-light, #444444);
		}

		button:hover:not(:disabled) {
			background-color: var(--primary-color-dark, #222222);
		}

		@media print {
			:host {
				display: none;
			}
		}
	`;

	handlePrint() {
		const parentElement = this.getRootNode() as ShadowRoot;
		const elementToPrint = parentElement.querySelector(this.selector);

		if (elementToPrint) {
			const printContent = elementToPrint.innerHTML;
			const printWindow = window.open("", "_blank");

			if (printWindow) {
				printWindow.document.write(`
				<html>
					<head>
					    <title>Print</title>
					</head>
					<body>${printContent}</body>
				</html>
				`);
				printWindow.document.close();
				printWindow.focus();
				printWindow.print();
				printWindow.close();
			} else {
				console.error("Unable to open print window");
			}
		}
	}

	render() {
		return html`
			<button @click=${this.handlePrint} ?disabled=${this.disabled}>
				<slot>Print</slot>
			</button>
		`;
	}
}
