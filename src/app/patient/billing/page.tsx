import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockInvoices = [
    { id: "INV001", date: "2024-05-20", service: "Annual Checkup", amount: "$150.00", status: "Paid" },
    { id: "INV002", date: "2024-05-25", service: "Cardiology Consultation", amount: "$250.00", status: "Paid" },
    { id: "INV003", date: "2024-06-10", service: "Blood Test", amount: "$75.00", status: "Due" },
    { id: "INV004", date: "2024-06-15", service: "Neurology Follow-up", amount: "$180.00", status: "Pending" },
];

export default function BillingPage() {
    return (
        <div className="container py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Billing & Payments</CardTitle>
                    <CardDescription>View your invoices and manage payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockInvoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.service}</TableCell>
                                    <TableCell>{invoice.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            invoice.status === 'Paid' ? 'secondary' : 
                                            invoice.status === 'Due' ? 'destructive' : 'outline'
                                        }>
                                            {invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" disabled={invoice.status === 'Paid'}>
                                            {invoice.status === 'Paid' ? 'Paid' : 'Pay Now'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
