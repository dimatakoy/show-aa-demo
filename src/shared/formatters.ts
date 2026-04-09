export const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	currencyDisplay: 'narrowSymbol',
});

export function formatPrice(value: number) {
	const [currency, numericValue] = priceFormatter.formatToParts(value);

	const nbsp = '\u00A0';
	return [currency?.value, numericValue?.value].join(nbsp);
}
