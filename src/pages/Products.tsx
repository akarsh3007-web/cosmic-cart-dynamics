import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)");
    
    if (data) {
      setProducts(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image_url,
          category: p.categories?.name || "Uncategorized",
          status: p.status,
          quantity: p.quantity,
        }))
      );
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) {
      setCategories(data.map((c) => c.name));
    }
  };

  const oldProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Audio",
    },
    {
      id: "2",
      name: "Smart Watch Pro",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Wearables",
    },
    {
      id: "3",
      name: "Designer Backpack",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "Accessories",
    },
    {
      id: "4",
      name: "Minimalist Camera",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
      category: "Electronics",
    },
    {
      id: "5",
      name: "Leather Wallet",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
      category: "Accessories",
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      category: "Audio",
    },
    {
      id: "7",
      name: "Sunglasses",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
      category: "Fashion",
    },
    {
      id: "8",
      name: "Laptop Stand",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
      category: "Accessories",
    },
  ];

  const oldCategories = ["Electronics", "Audio", "Wearables", "Accessories", "Fashion"];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">{products.length} products found</p>
          </div>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`w-full md:w-64 space-y-6 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="glass p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <Slider defaultValue={[0, 1000]} max={1000} step={10} className="mb-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>

            <div className="glass p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <label
                      htmlFor={category}
                      className="text-sm cursor-pointer hover:text-primary transition-colors"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="text-sm cursor-pointer hover:text-primary transition-colors"
                    >
                      {rating} stars & up
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
