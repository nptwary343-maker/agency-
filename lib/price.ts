export function hasDiscount(price: number, originalPrice?: number): boolean {
  return !!originalPrice && originalPrice > price;
}

export function calculateDiscountPercentage(price: number, originalPrice?: number): number {
  if (!hasDiscount(price, originalPrice) || !originalPrice) {
    return 0;
  }
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
