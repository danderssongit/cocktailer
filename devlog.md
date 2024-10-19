# DevLog

## #001 Initial Setup - 19 Oct, 2024. 14~

### Project Initialization

- Set up a new Vite project with TypeScript support
- Configured the project to use Haunted and lit-html as required
- Established the basic project structure

### Current State

- Basic Vite + TypeScript + Haunted setup is complete
- The application can now be started locally using `npm start`

### Challenges Encountered

1. **Vite Configuration**: Initially had issues with the `index.html` location. Resolved by moving it to the root directory as per Vite's conventions.

2. **Build Process**: Encountered and resolved an error related to module resolution during the build process.

3. **TypeScript Configuration**: Adjusted `tsconfig.json` to properly include all source files.

### Reflections

Initial project setup. Haven't worked with Web Components before, but of course heard some noise on the topic. Thankful for this opportunity to get some hands on experience with the concept.

Went for a walk and started listening to a Syntax.fm episode with the creator of the Lit framework. Cool stuff. Looking forward to dig into it more. I'm thinking I will first wrap my mind around Lit and then move on to Haunted.

## #002 Getting my hands on Lit

### Reflections

Starting out by making most basic components.

Figuring out where to put css variables... I guess in the `styles.css` will do for now?

Don't really like how css styling is done, mainly due to missing syntax highlighting.

### Notes

@customElement("cocktail-app") is a decorator shorthand for

```typescript
window.customElements.define("cocktail-app", CocktailApp);
```

@query('#newitem')
input!: HTMLInputElement;
^isCool.

#### Resources used

tsconfig settings
https://www.totaltypescript.com/tsconfig-cheat-sheet

Lit tutorial
https://www.youtube.com/watch?v=GlPa1wM41fQ

Lit Official Tutorial
https://lit.dev/tutorials/intro-to-lit/#3
