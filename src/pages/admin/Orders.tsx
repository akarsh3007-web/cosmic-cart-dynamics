import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "#1001",
      customer: "John Doe",
      date: "2025-01-15",
      total: 299.99,
      status: "Delivered",
      items: 2,
    },
    {
      id: "#1002",
      customer: "Jane Smith",
      date: "2025-01-16",
      total: 449.99,
      status: "Processing",
      items: 1,
    },
    {
      id: "#1003",
      customer: "Bob Johnson",
      date: "2025-01-17",
      total: 179.99,
      status: "Shipped",
      items: 3,
    },
    {
      id: "#1004",
      customer: "Alice Williams",
      date: "2025-01-18",
      total: 899.99,
      status: "Pending",
      items: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400";
      case "Processing":
        return "bg-blue-500/20 text-blue-400";
      case "Shipped":
        return "bg-purple-500/20 text-purple-400";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      <div className="glass p-6 rounded-lg space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-10 bg-card"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
