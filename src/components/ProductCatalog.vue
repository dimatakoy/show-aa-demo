<script setup lang="ts">
import { useCart } from '../shared/cart';
import { PRODUCTS } from '../shared/constants';
import ProductCard from './ProductCard.vue';

const cart = useCart();
</script>

<template>
	<section aria-labelledby="products-heading" class="product-section">
		<h1 id="products-heading" class="product-section__title sr-only">Our products</h1>

		<ul class="product-section__grid" aria-label="Product list">
			<li v-for="product in PRODUCTS" :key="product.id">
				<ProductCard
					:product="product"
					@add-to-cart="cart.addItem($event, 1)"
					:is-added="false" />
			</li>
		</ul>

		<div class="product-section__extra">
			<ProductCard
				:product="PRODUCTS[0]!"
				@added-to-cart="cart.addItem($event, 1)"
				:is-added="false" />
		</div>
	</section>
</template>

<style lang="css">
.product-section {
	margin: 0 auto;
	padding-inline: var(--page-container-padding-inline);
	padding-block: var(--spacing-5);

	.product-section__title {
		margin-bottom: 24px;
		font-size: 32px;
		font-family: 'Gordita', sans-serif;
	}

	.product-section__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 32px;
		margin: 0;
		padding: 0;
		list-style: none;

		@media (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
			gap: 16px;
		}
	}

	.product-section__extra {
		margin-top: var(--spacing-10);
	}
}
</style>
