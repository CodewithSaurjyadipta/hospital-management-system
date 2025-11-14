import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Stethoscope, Calendar } from "lucide-react";

export default function AdminPage() {
    const stats = [
        { title: "Total Patients", value: "1,254", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
        { title: "Total Doctors", value: "78", icon: <Stethoscope className="h-6 w-6 text-muted-foreground" /> },
        { title: "Appointments Today", value: "12", icon: <Calendar className="h-6 w-6 text-muted-foreground" /> },
        { title: "New Sign-ups (Month)", value: "45", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    ];

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>System Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">More detailed charts and tables for system administration would be displayed here.</p>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
