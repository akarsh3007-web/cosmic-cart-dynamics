import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsRes, ordersRes, profilesRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total', { count: 'exact' }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);

      const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + parseFloat(order.total.toString()), 0) || 0;

      return [
        {
          title: "Total Revenue",
          value: `$${totalRevenue.toFixed(2)}`,
          change: "From all orders",
          icon: DollarSign,
        },
        {
          title: "Orders",
          value: ordersRes.count?.toString() || "0",
          change: `${ordersRes.count || 0} total orders`,
          icon: ShoppingCart,
        },
        {
          title: "Customers",
          value: profilesRes.count?.toString() || "0",
          change: "Registered users",
          icon: Users,
        },
        {
          title: "Products",
          value: productsRes.count?.toString() || "0",
          change: "In inventory",
          icon: Package,
        },
      ];
    }
  });

  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select('id, total, status, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(4);
      return data || [];
    }
  });

  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, price, image_url')
        .limit(4);
      return data || [];
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <div>
                      <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${parseFloat(order.total.toString()).toFixed(2)}</p>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts && topProducts.length > 0 ? (
                topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded overflow-hidden">
                        {product.image_url && (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                    <p className="font-medium">${parseFloat(product.price.toString()).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No products yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
