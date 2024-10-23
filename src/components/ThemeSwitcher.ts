import { html } from "lit-html";
import { component, useState } from "haunted";
import { applyTheme, themes } from "../themes";

function ThemeSwitcher(element: HTMLElement) {
	const [currentTheme, setCurrentTheme] =
		useState<keyof typeof themes>("light");

	if (element.shadowRoot) {
		element.shadowRoot.adoptedStyleSheets = [sheet];
	}

	const themeOptions = [
		{ name: "light", emoji: "☀️" },
		{ name: "dark", emoji: "🌙" },
		{ name: "halloween", emoji: "🎃" },
	] as const;

	const handleThemeChange = (themeName: keyof typeof themes) => {
		setCurrentTheme(themeName);
		applyTheme(themeName);
	};

	return html`
		<div class="theme-switcher">
			<div class="slider-track">
				<div
					class="slider-thumb"
					style="--position: ${themeOptions.findIndex(
						(t) => t.name === currentTheme
					)}"
				></div>
			</div>
			<div class="theme-options">
				${themeOptions.map(
					({ name, emoji }) => html`
						<button
							class="theme-button ${currentTheme === name ? "active" : ""}"
							@click=${() => handleThemeChange(name)}
							aria-label="${name} theme"
						>
							<span class="emoji">${emoji}</span>
						</button>
					`
				)}
			</div>
		</div>
	`;
}

const styles = `
	:host {
		display: block;
	}

	.theme-switcher {
		position: relative;
		background: var(--bg-color);
		border-radius: 2rem;
		padding: 0.25rem;
		width: fit-content;
		box-shadow: var(--card-shadow);
		border: 1px solid var(--border-color);
	}

	.theme-options {
		position: relative;
		display: flex;

		z-index: 2;
	}

	.theme-button {
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 1.5rem;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: transform 0.2s ease;
	}

	.theme-button:hover {
		transform: scale(1.1);
	}

	.theme-button:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--focus-shadow-color);
	}

	.theme-button.active .emoji {
		transform: scale(1.1);
	}

	.emoji {
		font-size: 1.2rem;
		transition: transform 0.2s ease;
	}

	.slider-track {
		position: absolute;
		top: 0.25rem;
		left: 0.25rem;
		right: 0.25rem;
		height: 2.5rem;
		background: var(--border-color);
		border-radius: 1.5rem;
		z-index: 1;
	}

	.slider-thumb {
		position: absolute;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--primary-color);
		border-radius: 1.5rem;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateX(calc(var(--position) * 100%));
		opacity: 0.2;
	}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

customElements.define(
	"theme-switcher",
	component(ThemeSwitcher, { useShadowDOM: true })
);
