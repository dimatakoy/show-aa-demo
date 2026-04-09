<script setup lang="ts">
import LogoImage from '../assets/logo.svg';
import { useCart } from '../shared/cart';

const cart = useCart();
</script>

<template>
	<header class="header">
		<a class="header__logo" href="/">
			<img
				class="header__image"
				:src="LogoImage.src"
				height="28"
				width="120"
				alt="Inakono Store." />
		</a>

		<a href="/cart">Cart ({{ cart.totalItems }})</a>
	</header>
</template>

<style lang="css">
.header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;

	padding-inline: var(--page-container-padding-inline);
	padding-block: var(--spacing-5);

	border-bottom: 1px solid rgba(22, 22, 22, 0.1);

	.header__logo {
		border: 1px solid transparent;

		&:visited {
			color: inherit;
		}

		&:focus-visible {
			/* TODO customize focus */
		}
	}

	.header__image {
		display: block;
		max-width: 100%;
	}
}
</style>
