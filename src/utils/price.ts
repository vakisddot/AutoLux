export function formatPrice(price: number): string {
    return new Intl.NumberFormat("bg-BG", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(price);
};
