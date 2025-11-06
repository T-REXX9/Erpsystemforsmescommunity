import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  MessageCircle,
  Inbox,
  Send,
  Clock,
  XCircle,
  Radio,
  Search,
  Plus,
  Mail,
  CheckCircle,
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

export function Communication() {
  // Mock data for messages
  const messages = {
    inbox: [
      { id: 'MSG-001', from: 'ABC Corp', subject: 'Order Inquiry', date: '2024-01-15 10:30', status: 'Unread' },
      { id: 'MSG-002', from: 'XYZ Ltd', subject: 'Payment Confirmation', date: '2024-01-15 09:15', status: 'Read' },
      { id: 'MSG-003', from: 'DEF Inc', subject: 'Product Query', date: '2024-01-14 16:45', status: 'Read' },
    ],
    sent: [
      { id: 'MSG-004', to: 'ABC Corp', subject: 'Invoice #INV-001', date: '2024-01-15 11:00', status: 'Delivered' },
      { id: 'MSG-005', to: 'XYZ Ltd', subject: 'Order Confirmation', date: '2024-01-14 14:30', status: 'Delivered' },
    ],
    pending: [
      { id: 'MSG-006', to: 'GHI Pvt', subject: 'Payment Reminder', date: '2024-01-15 12:00', status: 'Pending' },
      { id: 'MSG-007', to: 'JKL Corp', subject: 'Stock Update', date: '2024-01-15 11:30', status: 'Pending' },
    ],
    failed: [
      { id: 'MSG-008', to: 'MNO Ltd', subject: 'Delivery Update', date: '2024-01-14 10:00', status: 'Failed' },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Unread':
        return <Badge variant="default">Unread</Badge>;
      case 'Read':
        return <Badge variant="secondary">Read</Badge>;
      case 'Delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'Failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={SPACING.pageContainer}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={TYPOGRAPHY.pageTitle}>Communication</h1>
          <p className={TYPOGRAPHY.pageSubtitle}>Manage text messages and communications</p>
        </div>
        <Button className="gap-2">
          <Plus className={ICON_SIZES.buttonDefault} />
          <span className={TYPOGRAPHY.body}>New Message</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-5 ${SPACING.gridGap}`}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={`${TYPOGRAPHY.metricLabel} flex items-center gap-2`}>
              <Mail className={ICON_SIZES.metricIcon} />
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={TYPOGRAPHY.metricValue}>156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Send className="w-4 h-4" />
              Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox" className="gap-2">
            <Inbox className="w-4 h-4" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent" className="gap-2">
            <Send className="w-4 h-4" />
            Sent
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="failed" className="gap-2">
            <XCircle className="w-4 h-4" />
            Failed
          </TabsTrigger>
          <TabsTrigger value="operator" className="gap-2">
            <Radio className="w-4 h-4" />
            Operator
          </TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Inbox Messages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-8 w-[300px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Message ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.inbox.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.id}</TableCell>
                      <TableCell>{message.from}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
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

        {/* Sent Tab */}
        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Message ID</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.sent.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.id}</TableCell>
                      <TableCell>{message.to}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
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

        {/* Pending Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Message ID</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.pending.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.id}</TableCell>
                      <TableCell>{message.to}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Retry</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Failed Tab */}
        <TabsContent value="failed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Failed Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Message ID</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.failed.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.id}</TableCell>
                      <TableCell>{message.to}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Retry</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operator Tab */}
        <TabsContent value="operator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Configure SMS operator settings and preferences</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Primary Operator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Operator A</p>
                    <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">Active</Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Backup Operator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Operator B</p>
                    <Badge variant="secondary" className="mt-2">Standby</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

