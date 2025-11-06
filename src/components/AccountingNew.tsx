import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Calculator,
  Wallet,
  BookOpen,
  FileBarChart,
  Search,
  Plus,
  Truck,
  PackageX,
  FileEdit,
  DollarSign,
  BookOpenCheck,
  FileCheck,
  FileSpreadsheet,
  Receipt,
  BarChart3,
  TrendingUp,
  FileText,
  Users,
  UserCircle,
  PhoneCall,
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

export function AccountingNew() {
  // Mock data for transactions
  const transactions = [
    { id: 'TXN-001', type: 'Freight Charges', customer: 'ABC Corp', date: '2024-01-15', amount: '₹5,000', status: 'Debit' },
    { id: 'TXN-002', type: 'Sales Return', customer: 'XYZ Ltd', date: '2024-01-14', amount: '₹12,000', status: 'Credit' },
    { id: 'TXN-003', type: 'Adjustment Entry', customer: 'DEF Inc', date: '2024-01-13', amount: '₹3,500', status: 'Debit' },
    { id: 'TXN-004', type: 'Collection', customer: 'GHI Pvt', date: '2024-01-12', amount: '₹45,000', status: 'Credit' },
  ];

  // Mock data for ledger
  const ledgerEntries = [
    { id: 'LED-001', customer: 'ABC Corp', debit: '₹50,000', credit: '₹0', balance: '₹50,000' },
    { id: 'LED-002', customer: 'XYZ Ltd', debit: '₹0', credit: '₹30,000', balance: '-₹30,000' },
    { id: 'LED-003', customer: 'DEF Inc', debit: '₹75,000', credit: '₹25,000', balance: '₹50,000' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Debit':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Debit</Badge>;
      case 'Credit':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Credit</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={SPACING.pageContainer}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={TYPOGRAPHY.pageTitle}>Accounting</h1>
          <p className={TYPOGRAPHY.pageSubtitle}>Manage transactions, ledgers, and financial reports</p>
        </div>
        <Button className="gap-2">
          <Plus className={ICON_SIZES.buttonDefault} />
          <span className={TYPOGRAPHY.body}>New Entry</span>
        </Button>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="transactions" className={SPACING.sectionContainer}>
        <TabsList>
          <TabsTrigger value="transactions" className="gap-2">
            <Wallet className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="accounting" className="gap-2">
            <BookOpen className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Accounting</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileBarChart className={ICON_SIZES.buttonDefault} />
            <span className={TYPOGRAPHY.body}>Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Accounting Transactions</CardTitle>
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
                  <Truck className="w-4 h-4" />
                  Freight Charges (Debit)
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <PackageX className="w-4 h-4" />
                  Sales Return (Credit)
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <FileEdit className="w-4 h-4" />
                  Adjustment Entry
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <DollarSign className="w-4 h-4" />
                  Daily Collection Entry
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
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

        {/* Accounting Tab */}
        <TabsContent value="accounting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Accounting Records</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Button variant="outline" className="justify-start gap-2">
                  <BookOpenCheck className="w-4 h-4" />
                  Customer Ledger
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <FileCheck className="w-4 h-4" />
                  Collection Summary
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  Statement of Account
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Receipt className="w-4 h-4" />
                  Accounts Receivable
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ledger ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ledgerEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.customer}</TableCell>
                      <TableCell className="text-red-600">{entry.debit}</TableCell>
                      <TableCell className="text-green-600">{entry.credit}</TableCell>
                      <TableCell className="font-semibold">{entry.balance}</TableCell>
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
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-5 h-5" />
                  Freight Charges Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View all freight charges (debit) transactions</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5" />
                  Sales Return Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Track sales returns (credit) over time</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-5 h-5" />
                  Purchase History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Complete purchase history and analysis</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-5 h-5" />
                  Inactive/Active Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Customer activity status report</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <UserCircle className="w-5 h-5" />
                  Old/New Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Customer acquisition and retention analysis</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PhoneCall className="w-5 h-5" />
                  Daily Calls Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Track daily customer calls and interactions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

