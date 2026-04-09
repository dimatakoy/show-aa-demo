<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { formatPrice } from '../shared/formatters';
import type { Product } from '../shared/types';

const props = defineProps<{
	product: Product;
	isAdded: boolean;
}>();

const emit = defineEmits<{
	(e: 'add-to-cart', variantId: string | number): void;
}>();

const id = useId();
const titleId = `${id}-title`;
const priceId = `${id}-price`;
const descriptionId = `${id}-description`;

const currentVariantId = ref<string | number>(props.product.colorVariants[0]!.productSku);

const currentVariant = computed(() => {
	const variant = props.product.colorVariants.find(
		(v) => v.productSku === currentVariantId.value,
	)!;
	return variant;
});

const isAdded = computed(() => props.isAdded === true);

const buttonText = computed(() => {
	if (props.isAdded) return 'Already in Cart';
	return 'Add to Cart';
});
</script>

<template>
	<article
		class="product-card"
		:aria-labelledby="`${titleId} ${priceId}`"
		:aria-describedby="descriptionId"
		tabindex="0">
		<form class="product-card__form" @submit.prevent="$emit('add-to-cart', currentVariantId)">
			<img
				class="product-card__image"
				:src="currentVariant.imageUrl"
				:alt="`Product image: ${props.product.name}, color: ${currentVariant.name}`"
				height="400"
				width="323" />

			<div class="product-card__details">
				<h2 :id="titleId" class="product-card__title">{{ props.product.name }}</h2>
				<p :id="descriptionId" class="product-card__description">
					{{ props.product.description }}
				</p>
			</div>

			<div
				:id="priceId"
				class="product-card__price-block"
				aria-live="polite"
				aria-atomic="true">
				<div class="product-card__price">
					<span class="sr-only">Current price: </span>
					{{ formatPrice(currentVariant.discountPrice || currentVariant.price) }}
				</div>
				<div
					v-show="currentVariant.discountPrice"
					class="product-card__price product-card__price--discount">
					<span class="sr-only">Original price: </span>
					<s>{{ formatPrice(currentVariant.price) }}</s>
				</div>
			</div>

			<fieldset class="variant-selector product-card__selector">
				<legend class="sr-only">Choose color for {{ props.product.name }}</legend>
				<div v-for="variant in props.product.colorVariants" :key="variant.productSku">
					<input
						class="variant-selector__input"
						type="radio"
						:name="`color-variant-${id}`"
						:id="`${id}-${variant.productSku}`"
						:value="variant.productSku"
						:style="{ backgroundColor: variant.color }"
						v-model="currentVariantId" />
					<label class="sr-only" :for="`${id}-${variant.productSku}`">
						{{ variant.name }}
					</label>
				</div>
			</fieldset>

			<button
				class="product-card__button"
				type="submit"
				:aria-disabled="isAdded"
				:aria-label="`${buttonText} ${props.product.name}`">
				{{ buttonText }}
			</button>
		</form>
	</article>
</template>

<style lang="css">
.product-card {
	container-name: product-card;
	container-type: inline-size;

	.product-card__image {
		display: block;
		width: 100%;
		max-width: 100%;
		height: auto;
	}

	.product-card__details {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--spacing-1);
		margin-top: var(--spacing-4);
	}

	.product-card__title {
		margin: var(--spacing-0);
		line-height: 28px;
		font-weight: 500;
		font-size: 18px;
	}

	.product-card__description {
		margin: var(--spacing-0);
		color: #161616;
		text-wrap: pretty;
		line-height: 28px;
		font-weight: normal;
		font-size: 16px;
	}

	.product-card__price-block {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--spacing-2);
	}

	.product-card__price {
		margin-top: var(--spacing-2);
		line-height: 24px;
		font-weight: 500;
		font-size: 16px;

		&.product-card__price--discount {
			color: #888;
		}
	}

	.product-card__selector {
		margin-top: var(--spacing-4);
	}

	.product-card__button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;

		margin-top: var(--spacing-6);
		padding: var(--spacing-0);

		width: 100%;
		height: 56px;
		border-radius: 8px;
		background-color: #161616;
		color: #fff;
		font-weight: 500;
		font-size: 18px;
		font-family: inherit;
		transition:
			opacity 0.2s,
			transform 0.1s;
		cursor: pointer;

		@media (min-width: 768px) {
			margin-top: var(--spacing-6);
		}

		&:not(:disabled):active {
			transform: scale(99.5%);
		}

		&:not(:disabled):hover {
			opacity: 0.95;
		}

		&:focus-visible {
			outline: 3px solid #005fcc;
			outline-offset: 2px;
		}

		&:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}
	}
}

.variant-selector {
	all: unset;
	display: flex;
	flex-flow: row nowrap;
	gap: var(--spacing-3);

	.variant-selector__input {
		display: block;
		width: 24px;
		height: 24px;
		appearance: none;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
		outline: 2px solid #dedede;
		outline-offset: 4px;
		border-radius: 50%;
		transition: outline-color 0.2s;
		cursor: pointer;

		&:checked {
			outline-color: #161616;
		}

		&:focus-visible {
			outline: 3px solid #005fcc;
			outline-offset: 4px;
		}
	}
}

@container product-card (min-width: 640px) {
	.product-card {
		.product-card__form {
			display: grid;
			grid-template-rows: auto 1fr auto;
			grid-template-columns: 220px 1fr auto;
			align-items: start;
			row-gap: var(--spacing-4);
			column-gap: var(--spacing-6);
		}

		.product-card__image {
			grid-row: 1 / 4;
			grid-column: 1 / 2;
			object-fit: cover;
			height: 100%;
		}

		.product-card__details {
			grid-row: 1 / 2;
			grid-column: 2 / 3;
			margin-top: var(--spacing-0);
		}

		.product-card__title {
			font-size: 24px;
		}

		.product-card__description {
			text-wrap: balance;
		}

		.product-card__price-block {
			grid-row: 1 / 2;
			grid-column: 3 / 4;
			flex-flow: column nowrap;
			align-items: flex-end;
			gap: var(--spacing-1);
		}

		.product-card__price {
			margin-top: var(--spacing-0);

			&:not(.product-card__price--discount) {
				color: #161616;
				line-height: 1;
				font-weight: 500;
				font-size: 28px;
			}

			&.product-card__price--discount {
				line-height: 1;
				font-size: 20px;
			}
		}

		.product-card__selector {
			grid-row: 3 / 4;
			grid-column: 2 / 3;
			align-self: center;
			margin-top: var(--spacing-0);
		}

		.product-card__button {
			grid-row: 3 / 4;
			grid-column: 3 / 4;
			align-self: center;
			margin-top: var(--spacing-0);
			padding: var(--spacing-0) var(--spacing-7);
			width: max-content;
		}
	}
}
</style>
