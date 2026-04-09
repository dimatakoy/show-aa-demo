export type ID = string | number;

export type ProductColorVariant = {
	productSku: ID;
	name: string;
	color: string; // css color
	imageUrl: string;
	price: number;
	discountPrice: number | null;
};

export type Product = {
	id: ID;
	name: string;
	description: string;
	colorVariants: ProductColorVariant[];
};
