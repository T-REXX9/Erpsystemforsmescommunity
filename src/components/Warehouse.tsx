import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Package,
  ShoppingBag,
  FileBarChart,
  Search,
  Plus,
  ArrowRightLeft,
  Database,
  Truck,
  ClipboardCheck,
  FileText,
  FileEdit,
  PackageCheck,
  PackageX,
  BarChart3,
  AlertCircle,
  FileCheck,
  TrendingUp,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { TYPOGRAPHY, ICON_SIZES, SPACING } from '../constants';

export function Warehouse() {
  // Mock data for inventory
  const inventoryItems = [
    { id: 'P001', name: 'Product A', quantity: 150, unit: 'pcs', status: 'In Stock', location: 'Warehouse A' },
    { id: 'P002', name: 'Product B', quantity: 45, unit: 'pcs', status: 'Low Stock', location: 'Warehouse B' },
    { id: 'P003', name: 'Product C', quantity: 0, unit: 'pcs', status: 'Out of Stock', location: 'Warehouse A' },
    { id: 'P004', name: 'Product D', quantity: 320, unit: 'pcs', status: 'In Stock', location: 'Warehouse C' },
  ];

  // Mock data for purchase orders
  const purchaseOrders = [
    { id: 'PO-001', supplier: 'Supplier A', date: '2024-01-15', amount: '₹50,000', status: 'Pending' },
    { id: 'PO-002', supplier: 'Supplier B', date: '2024-01-14', amount: '₹75,000', status: 'Approved' },
    { id: 'PO-003', supplier: 'Supplier C', date: '2024-01-13', amount: '₹30,000', status: 'Received' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In Stock</Badge>;
      case 'Low Stock':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Low Stock</Badge>;
      case 'Out of Stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Approved</Badge>;
      case 'Received':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Received</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={SPACING.pageContainer}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={TYPOGRAPHY.pageTitle}>Warehouse Management</h1>
          <p className={TYPOGRAPHY.pageSubtitle}>Manage inventory, purchasing, and warehouse reports</p>
        </div>
        <Button className="gap-2">
          <Plus className={ICON_SIZES.buttonDefault} />
          <span className={TYPOGRAPHY.body}>New Entry</span>
        </Button>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="inventory" className={SPACING.sectionContainer}>
        <TabsList>
          <TabsTrigger value="inventory" className="gap-2">
            <Package className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="purchasing" className="gap-2">
            <ShoppingBag className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Purchasing</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileBarChart className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className={SPACING.sectionContainer}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className={TYPOGRAPHY.cardTitle}>Inventory Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className={`absolute left-2 top-2.5 ${ICON_SIZES.buttonDefault} text-muted-foreground`} />
                    <Input placeholder="Search products..." className="pl-8 w-[300px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`grid grid-cols-1 md:grid-cols-4 ${SPACING.gridGap} mb-6`}>
                <Button variant="outline" className="justify-start gap-2">
                  <ArrowRightLeft className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Stock Movement</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Database className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Product Database</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Truck className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Transfer Stock</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <ClipboardCheck className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Inventory Audit</span>
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Product ID</TableHead>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Product Name</TableHead>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Quantity</TableHead>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Unit</TableHead>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Location</TableHead>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Status</TableHead>
                    <TableHead className={TYPOGRAPHY.tableHeader}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className={TYPOGRAPHY.tableCellBold}>{item.id}</TableCell>
                      <TableCell className={TYPOGRAPHY.tableCell}>{item.name}</TableCell>
                      <TableCell className={TYPOGRAPHY.tableCell}>{item.quantity}</TableCell>
                      <TableCell className={TYPOGRAPHY.tableCell}>{item.unit}</TableCell>
                      <TableCell className={TYPOGRAPHY.tableCell}>{item.location}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className={TYPOGRAPHY.body}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchasing Tab */}
        <TabsContent value="purchasing" className={SPACING.sectionContainer}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className={TYPOGRAPHY.cardTitle}>Purchase Management</CardTitle>
                <Button className="gap-2">
                  <Plus className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>New Purchase Order</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`grid grid-cols-1 md:grid-cols-4 ${SPACING.gridGap} mb-6`}>
                <Button variant="outline" className="justify-start gap-2">
                  <FileText className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Purchase Request</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <FileEdit className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Purchase Order</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <PackageCheck className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Receiving Stock</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <PackageX className={ICON_SIZES.buttonDefault} />
                  <span className={TYPOGRAPHY.body}>Return to Supplier</span>
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Inventory Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View detailed inventory status and stock levels</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Reorder Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Items that need to be reordered</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Item Suggested for Stock Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Suggested items to stock based on demand</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Fast/Slow Inventory Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Analysis of fast-moving and slow-moving items</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

