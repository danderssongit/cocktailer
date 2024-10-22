# Cocktail Shopping List

A web component-based application for searching cocktails and managing shopping lists for their ingredients.

## Tech Stack

- **Web Components** with Haunted (React-like hooks for web components)
- **lit-html** for templating
- **TypeScript** for type safety
- **Vite** for build tooling

## Features

### 🔍 Search

- Real-time cocktail search using TheCocktailDB API
- Pre-loaded popular cocktails on initial load
- Toast notifications for search status and shopping list updates

### 🛒 Shopping List

- Add ingredients to shopping list
- Mobile-responsive sliding shopping list panel
- Background overlay effect on mobile
- Print functionality for shopping list

### 🎨 UI/UX

- Responsive design with mobile-first approach
- Dynamic card backgrounds based on drink images
- Visual indicators for ingredients already in shopping list
- Smooth transitions and animations
- CSS custom properties for theming

### 💡 Smart Features

- Ingredient deduplication in shopping list
- Automatic color extraction from drink images
- Keyboard shortcuts (Enter to search, Esc to clear)

## Getting Started

### Install dependencies

`npm install`

### Start development server

`npm start`

## Project Structure

The application is built using Web Components, each responsible for a specific functionality:

- `AppShell`: Main application container
- `SearchBar`: Search input and controls
- `SearchResultList`: Displays search results
- `SearchResultItem`: Individual cocktail card
- `ShoppingList`: Shopping list management
- `Toast`: Notification system
- `PrintButton`: Print functionality
