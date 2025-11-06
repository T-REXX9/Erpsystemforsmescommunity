import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Wrench,
  UsersRound,
  Package,
  UserCog,
  Search,
  Plus,
  Database,
  PhoneCall,
  Users,
  Building2,
  Tag,
  Boxes,
  MapPin,
  MessageSquare,
  UserCheck,
  Shield,
  ClipboardList,
  Lock,
  Server,
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

export function Maintenance() {
  // Mock data for customers
  const customers = [
    { id: 'CUST-001', name: 'ABC Corp', group: 'Premium', phone: '+91 98765 43210', status: 'Active', lastCall: '2024-01-15' },
    { id: 'CUST-002', name: 'XYZ Ltd', group: 'Standard', phone: '+91 98765 43211', status: 'Active', lastCall: '2024-01-14' },
    { id: 'CUST-003', name: 'DEF Inc', group: 'Premium', phone: '+91 98765 43212', status: 'Inactive', lastCall: '2024-01-10' },
  ];

  // Mock data for products
  const products = [
    { id: 'PROD-001', name: 'Product A', category: 'Electronics', supplier: 'Supplier A', price: '₹5,000' },
    { id: 'PROD-002', name: 'Product B', category: 'Furniture', supplier: 'Supplier B', price: '₹12,000' },
    { id: 'PROD-003', name: 'Product C', category: 'Stationery', supplier: 'Supplier C', price: '₹500' },
  ];

  // Mock data for staff
  const staff = [
    { id: 'STAFF-001', name: 'John Doe', team: 'Sales', role: 'Manager', status: 'Active' },
    { id: 'STAFF-002', name: 'Jane Smith', team: 'Operations', role: 'Executive', status: 'Active' },
    { id: 'STAFF-003', name: 'Bob Johnson', team: 'Finance', role: 'Accountant', status: 'Active' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'Inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={SPACING.pageContainer}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={TYPOGRAPHY.pageTitle}>Maintenance</h1>
          <p className={TYPOGRAPHY.pageSubtitle}>Manage customers, products, and profiles</p>
        </div>
        <Button className="gap-2">
          <Plus className={ICON_SIZES.buttonDefault} />
          <span className={TYPOGRAPHY.body}>New Entry</span>
        </Button>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="customer" className={SPACING.sectionContainer}>
        <TabsList>
          <TabsTrigger value="customer" className="gap-2">
            <UsersRound className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Customer</span>
          </TabsTrigger>
          <TabsTrigger value="product" className="gap-2">
            <Package className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Product</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <UserCog className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Profile</span>
          </TabsTrigger>
        </TabsList>

        {/* Customer Tab */}
        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="pl-8 w-[300px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button variant="outline" className="justify-start gap-2">
                  <Database className="w-4 h-4" />
                  Customer Data
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Daily Call Monitoring
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Customer Group
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Call</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.group}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.lastCall}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
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

        {/* Product Tab */}
        <TabsContent value="product" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Product Management</CardTitle>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <Button variant="outline" className="justify-start gap-2">
                  <Building2 className="w-4 h-4" />
                  Suppliers
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Tag className="w-4 h-4" />
                  Special Price
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Boxes className="w-4 h-4" />
                  Category Management
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <MapPin className="w-4 h-4" />
                  Courier Management
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Remark Templates
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell>{product.price}</TableCell>
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

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Profile Management</CardTitle>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Staff
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button variant="outline" className="justify-start gap-2">
                  <UserCheck className="w-4 h-4" />
                  Staff
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <UsersRound className="w-4 h-4" />
                  Team
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Shield className="w-4 h-4" />
                  Approver
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button variant="outline" className="justify-start gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Activity Logs
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Lock className="w-4 h-4" />
                  System Access
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Server className="w-4 h-4" />
                  Server Maintenance
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.team}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
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
      </Tabs>
    </div>
  );
}

