import { ProductCard } from "@/components/ProductCard";
import { CategoryStrip } from "@/components/CategoryStrip";

export default function Home() {
  const products = [
    {
      id: "1",
      title: "Wireless Bluetooth Headphones with Noise Cancelling",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://picsum.photos/seed/1/400/400",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "2",
      title: "Smart Watch Series 7",
      price: 199.00,
      image: "https://picsum.photos/seed/2/400/400",
      rating: 5.0,
      inStock: true,
    },
    {
      id: "3",
      title: "Gaming Mouse RGB",
      price: 25.50,
      originalPrice: 30.00,
      image: "https://picsum.photos/seed/3/400/400",
      rating: 3.8,
      inStock: false,
    },
    {
      id: "4",
      title: "Mechanical Keyboard",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://picsum.photos/seed/4/400/400",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "5",
      title: "Premium Panjabi",
      price: 25.00,
      image: "https://picsum.photos/seed/5/400/400",
      rating: 4.9,
      inStock: true,
    },
    {
      id: "6",
      title: "Sony WH-1000XM5",
      price: 350.00,
      image: "https://picsum.photos/seed/6/400/400",
      rating: 4.7,
      inStock: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Category Strip */}
      <div className="sticky top-16 z-40">
        <CategoryStrip />
      </div>

      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Just For You</h2>
          <button className="text-sm font-medium text-orange-600 hover:underline">See All</button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
