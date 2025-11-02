import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Premium Wireless Headphones",
    price: 299.99,
    rating: 4.8,
    reviews: 124,
    description: "Experience superior sound quality with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium comfort padding.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    ],
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Smart Watch Pro",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Wearables",
      status: "available" as const,
      quantity: 50,
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      category: "Audio",
      status: "available" as const,
      quantity: 30,
    },
    {
      id: "3",
      name: "Designer Backpack",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "Accessories",
      status: "sold_out" as const,
      quantity: 0,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`glass rounded-lg overflow-hidden aspect-square hover:border-primary transition-all ${
                    selectedImage === index ? "border-primary border-2" : ""
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-4xl font-bold text-primary mb-6">${product.price}</p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center glass rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:text-primary transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-white/10">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:text-primary transition-colors"
                >
                  +
                </button>
              </div>

              <Button size="lg" className="flex-1 gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="glass p-4 rounded-lg text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">2 Year Warranty</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-20">
          <TabsList className="glass">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="glass p-8 rounded-lg mt-4">
            <h3 className="text-2xl font-bold mb-4">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="glass p-8 rounded-lg mt-4">
            <h3 className="text-2xl font-bold mb-4">Specifications</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Brand</span>
                <span className="font-medium text-foreground">LuxeAudio</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Model</span>
                <span className="font-medium text-foreground">LA-3000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Battery Life</span>
                <span className="font-medium text-foreground">30 hours</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Connectivity</span>
                <span className="font-medium text-foreground">Bluetooth 5.0</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="glass p-8 rounded-lg mt-4">
            <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
            <p className="text-muted-foreground">Reviews coming soon...</p>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
