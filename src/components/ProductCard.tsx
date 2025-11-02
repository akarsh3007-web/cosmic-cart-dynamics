import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number | string;
  image: string;
  category: string;
  status: "available" | "sold_out" | "in_transition";
  quantity: number;
}

const ProductCard = ({ id, name, price, image, category, status, quantity }: ProductCardProps) => {
  const getStatusBadge = () => {
    if (status === "sold_out") {
      return <Badge variant="destructive" className="absolute top-4 left-4 z-10">Sold Out</Badge>;
    }
    if (status === "in_transition") {
      return <Badge variant="secondary" className="absolute top-4 left-4 z-10">In Transition</Badge>;
    }
    if (quantity < 20 && status === "available") {
      return <Badge variant="outline" className="absolute top-4 left-4 z-10 bg-yellow-500/20 text-yellow-300 border-yellow-500/50">Low Stock</Badge>;
    }
    return null;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="glass hover:border-primary/50 transition-all duration-300 overflow-hidden">
        <Link to={`/product/${id}`}>
          <div className="relative overflow-hidden aspect-square">
            {getStatusBadge()}
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </Link>
        
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {category}
          </p>
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          <p className="text-xl font-bold text-primary">${typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full gap-2" 
            variant="default"
            disabled={status === "sold_out"}
          >
            <ShoppingCart className="w-4 h-4" />
            {status === "sold_out" ? "Sold Out" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
