import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  ShoppingCart,
  CreditCard,
  FileBarChart,
  Search,
  Plus,
  FileText,
  FileEdit,
  Receipt,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  FileCheck,
  DollarSign,
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

export function Sales() {
  // Mock data for sales transactions
  const salesTransactions = [
    { id: 'INQ-001', customer: 'ABC Corp', type: 'Inquiry', date: '2024-01-15', amount: '₹50,000', status: 'Pending' },
    { id: 'SO-001', customer: 'XYZ Ltd', type: 'Sales Order', date: '2024-01-14', amount: '₹75,000', status: 'Confirmed' },
    { id: 'INV-001', customer: 'DEF Inc', type: 'Invoice', date: '2024-01-13', amount: '₹30,000', status: 'Paid' },
    { id: 'OS-001', customer: 'GHI Pvt', type: 'Order Slip', date: '2024-01-12', amount: '₹45,000', status: 'Processing' },
  ];

  // Mock data for sales stats
  const salesStats = [
    { title: 'Total Sales', value: '₹12,50,000', change: '+15.3%', trend: 'up' },
    { title: 'Pending Orders', value: '23', change: '+5.2%', trend: 'up' },
    { title: 'Completed Orders', value: '156', change: '+12.8%', trend: 'up' },
    { title: 'Average Order Value', value: '₹8,013', change: '+3.1%', trend: 'up' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Confirmed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case 'Paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Processing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <p className="text-muted-foreground">Manage sales transactions and view reports</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Sale
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {salesStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="transaction" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transaction" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Transaction
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileBarChart className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Transaction Tab */}
        <TabsContent value="transaction" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sales Transactions</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-8 w-[300px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Button variant="outline" className="justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Sales Inquiry
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <FileEdit className="w-4 h-4" />
                  Sales Order
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Receipt className="w-4 h-4" />
                  Order Slip
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  Invoice
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Inquiry Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View all sales inquiries and their status</p>
                <div className="mt-4">
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">Total Inquiries</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Sales Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Comprehensive sales performance analysis</p>
                <div className="mt-4">
                  <div className="text-2xl font-bold">₹12.5L</div>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Sales Development Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Track sales growth and development trends</p>
                <div className="mt-4">
                  <div className="text-2xl font-bold">+15.3%</div>
                  <p className="text-xs text-muted-foreground">Growth Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

