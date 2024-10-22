import { html } from "lit-html";
import { component, useEffect } from "haunted";

interface PrintButtonElement extends HTMLElement {
	selector: string;
	disabled: boolean;
}

function PrintButton(element: PrintButtonElement) {
	const selector = element.selector || "";
	const disabled = element.disabled || false;

	useEffect(() => {
		if (element.shadowRoot) {
			element.shadowRoot.adoptedStyleSheets = [sheet];
		} else {
			console.warn("PrintButton: No shadowRoot found");
		}
	}, []);

	const handlePrint = () => {
		const parentElement = element.getRootNode() as ShadowRoot;
		const elementToPrint = parentElement.querySelector(selector);

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
	};

	return html`
		<button @click=${handlePrint} ?disabled=${disabled}>
			<slot>Printing</slot>
		</button>
	`;
}

const styles = `
  :host {
    display: block;
    width: 100%;
  }

  button {
    background-color: var(--primary-color, #250524) ;
    color: var(--bg-color, #fff);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius, 0.5rem);
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.35;
    background-color: var(--primary-color-light, #4a0a48);
  }

  button:hover:not(:disabled) {
    background-color: var(--primary-color-dark, #120212);
  }

  @media print {
    :host {
      display: none;
    }
  }
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define(
	"print-button",
	component(PrintButton, {
		useShadowDOM: true,
		observedAttributes: ["selector", "disabled"],
	})
);

declare global {
	interface HTMLElementTagNameMap {
		"print-button": PrintButtonElement;
	}
}

export { PrintButton };
