export function formatPrice(price: string): string {
    return `${price.split(',').join(' ')} EUR`;
};
