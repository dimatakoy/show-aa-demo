import { computed, ref, watch, watchEffect } from 'vue';
import { PRODUCTS } from './constants';
import type { ProductColorVariant } from './types';

export type ID = string | number;

export type CartItem = {
	variantId: ProductColorVariant['productSku'];
	quantity: number;
};

export type GetVariant = (variantId: ID) => ProductColorVariant | undefined;

const cartMap = ref(new Map<ID, number>());

const getVariantById = (id: ID): ProductColorVariant | undefined => {
	for (const product of PRODUCTS) {
		const variant = product.colorVariants.find((v) => v.productSku === id);
		if (variant) return variant;
	}

	return undefined;
};

export function useCart(getVariant = getVariantById) {
	const addItem = (variantId: ID, quantity: number = 1) => {
		const currentQty = cartMap.value.get(variantId) || 0;
		cartMap.value.set(variantId, currentQty + quantity);
	};

	const removeItem = (variantId: ID) => {
		cartMap.value.delete(variantId);
	};

	const updateQuantity = (variantId: ID, quantity: number) => {
		if (quantity <= 0) {
			removeItem(variantId);
		} else {
			cartMap.value.set(variantId, quantity);
		}
	};

	const clearCart = () => {
		cartMap.value.clear();
	};

	const items = computed<CartItem[]>(() =>
		Array.from(cartMap.value.entries()).map(([variantId, quantity]) => ({
			variantId,
			quantity,
		})),
	);

	const totalItems = computed(() => {
		let sum = 0;
		for (const qty of cartMap.value.values()) sum += qty;
		return sum;
	});

	const totalCost = computed(() => {
		let cost = 0;
		for (const [variantId, quantity] of cartMap.value.entries()) {
			const variant = getVariant(variantId);
			if (variant) {
				const actualPrice =
					variant.discountPrice !== null ? variant.discountPrice : variant.price;
				cost += actualPrice * quantity;
			}
		}
		return cost;
	});

	watchEffect(() => {
		console.log(cartMap.value);
		console.log(totalCost.value);
	});

	const isEmpty = computed(() => cartMap.value.size === 0);

	const hasItem = (variantId: ID): boolean => {
		return cartMap.value.has(variantId);
	};

	return {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		hasItem,
		totalItems,
		totalCost,
		isEmpty,
	};
}
