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

Went for a walk and started listening to a Syntax.fm episode with the creator of the Lit framework. Cool stuff. Looking forward to dig into it more. I'm thinking I will first wrap my mind around Lit and then move on to Haunted. My thought process is that instead of trying to apply two libraries that I haven't used before at once, I'll start with just using one of them, and then once I am somewhat satsified with the implementation I'll add the other library to better understand what problem it solves and how it approaches the solution.

## #002 Getting my hands on Lit - 20 Oct, 2024 14~

### Reflections

Starting out by making most basic components.

Figuring out where to put css variables... I guess in the `styles.css` will do for now?

Don't really like how css styling is done, mainly due to missing syntax highlighting. - Okay, fixed with Lit Extension, cool.

Got infected by scope creep #1 and added an extra feature which highlights ingredients which are already present in the cart, in all search result items.

Scope creep #2, added a feature to change the color of the card info section background to an average color from the drink image.

Now I have the printing part left, as well as adding Haunted hooks.

I think as a last feature I want to investigate for some more smartness for the shopping cart regarding the deduplication. I want to make a function that can add multiple amounts of the same item together, like "1/2 oz tequila" and "2 oz tequila" and then display the total amount. Would be a cool feature but I'll leave it for last for now.

Now, I have used AI tools during the development of some components here and features for faster iteration speed and due to time constraints. I also have the tendency to get a little scope creepy, and I like the option to quickly translate a rough idea to code to get a fast prototype. Like the `getAverageColor` function in the `imageUtils` class was prompted for, and while not a complicated function at a high level, It'd take me a quite some more time to do the thing "by hand". I'm thinking that you can and should ask me about any particular function or line and I will answer what is going on or why I went for a certain implementation.

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
