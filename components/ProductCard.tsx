import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { hasDiscount, calculateDiscountPercentage } from "@/lib/price";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  rating,
  inStock,
}: ProductCardProps) {
  const isDiscounted = hasDiscount(price, originalPrice);
  const discountPct = calculateDiscountPercentage(price, originalPrice);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Discount Badge */}
        {isDiscounted && (
          <div className="absolute left-2 top-2 rounded-md bg-orange-500 px-2 py-1 text-xs font-bold text-white">
            -{discountPct}%
          </div>
        )}

        {/* Stock Badge */}
        {!inStock && (
          <div className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800" title={title}>
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          <div className="flex text-yellow-400">
             {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                />
             ))}
          </div>
          <span className="text-xs text-gray-500">({rating})</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-orange-600">
              ${price.toFixed(2)}
            </span>
            {isDiscounted && originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={!inStock}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              inStock
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
