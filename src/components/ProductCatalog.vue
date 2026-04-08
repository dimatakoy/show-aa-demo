<template>
	<main class="product-catalog">
		<slot />
	</main>
</template>

<style lang="css">
.product-catalog {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;

	padding-inline: var(--page-container-padding-inline);
}
</style>
