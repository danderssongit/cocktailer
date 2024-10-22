type Range<N extends number> = number extends N ? number : _Range<N, []>;
type _Range<N extends number, T extends unknown[]> = T["length"] extends N
	? T[number]
	: _Range<N, [T["length"], ...T]>;

type IngredientMeasure = `str${"Ingredient" | "Measure"}${Range<15>}`;
type Instructions = `strInstructions${
	| ""
	| "ES"
	| "DE"
	| "FR"
	| "IT"
	| "ZH-HANS"
	| "ZH-HANT"}`;

export type Drink = {
	idDrink: string;
	strDrink: string;
	strDrinkThumb: string;
	strInstructions: string;
	strCategory: string;
	strAlcoholic: string;
	strGlass: string;
	dateModified: string;
	strCreativeCommonsConfirmed: string;
} & {
	[K in IngredientMeasure]: string | null;
} & {
	[K in Instructions]: string | null;
} & {
	strDrinkAlternate: string | null;
	strTags: string | null;
	strVideo: string | null;
	strIBA: string | null;
	strImageSource: string | null;
	strImageAttribution: string | null;
};

export interface ProcessedIngredient {
	name: string;
	measure: string | null;
}

export interface ProcessedDrinkItem {
	name: string;
	imageUrl: string;
	description: string;
	ingredients: ProcessedIngredient[];
	inShoppingList: boolean[];
}
