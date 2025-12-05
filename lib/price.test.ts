import { hasDiscount, calculateDiscountPercentage } from './price';

describe('Price Logic', () => {
  describe('hasDiscount', () => {
    it('should return true if originalPrice is greater than price', () => {
      expect(hasDiscount(80, 100)).toBe(true);
    });

    it('should return false if originalPrice is undefined', () => {
      expect(hasDiscount(100)).toBe(false);
    });

    it('should return false if originalPrice is less than or equal to price', () => {
      expect(hasDiscount(100, 100)).toBe(false);
      expect(hasDiscount(120, 100)).toBe(false);
    });
  });

  describe('calculateDiscountPercentage', () => {
    it('should calculate correct percentage', () => {
      expect(calculateDiscountPercentage(80, 100)).toBe(20);
      expect(calculateDiscountPercentage(50, 100)).toBe(50);
    });

    it('should round to nearest integer', () => {
      expect(calculateDiscountPercentage(33.33, 100)).toBe(67); // 100 - 33.33 = 66.67 => 66.67%
    });

    it('should return 0 if no discount', () => {
      expect(calculateDiscountPercentage(100, 100)).toBe(0);
      expect(calculateDiscountPercentage(100)).toBe(0);
    });
  });
});
