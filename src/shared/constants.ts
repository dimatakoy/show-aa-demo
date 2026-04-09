import ProductImage from '../assets/images/product-images/product-image-1.png';

import type { Product } from './types';

export const PRODUCTS: Product[] = Array.from({ length: 7 }, (_, id) => {
	return {
		id,
		name: `Poinsettia-${id}`,
		description:
			'Poinsettias are a festive and well-known plant for the winter holiday season. Learn how to grow and take care',
		colorVariants: [
			{
				productSku: `${id}-1`,
				name: 'Green',
				color: '#86A967',
				imageUrl: ProductImage.src,
				price: 280,
				discountPrice: 240,
			},
			{
				productSku: `${id}-2`,
				name: 'Blue',
				color: '#BACFA8',
				imageUrl: ProductImage.src,
				price: 320,
				discountPrice: null,
			},
		],
	};
});
