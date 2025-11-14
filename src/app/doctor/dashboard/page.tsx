import { getDoctorData } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isToday } from 'date-fns';

export default function DoctorDashboard() {
  // In a real app, you'd get the logged-in doctor's ID
  const doctorData = getDoctorData('doc1');

  if (!doctorData) {
    return <div className="container py-8">Doctor not found.</div>;
  }

  const todayAppointments = doctorData.appointments
    .filter(a => isToday(parseISO(a.date)))
    .sort((a, b) => a.time.localeCompare(b.time));
  
  const nextAppointment = todayAppointments.length > 0 ? todayAppointments[0] : null;

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={doctorData.avatarUrl} alt={doctorData.name} />
          <AvatarFallback>{doctorData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">{doctorData.name}</h1>
          <p className="text-lg text-muted-foreground">{doctorData.specialty}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {nextAppointment && (
            <Card className="bg-primary/10 border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Next Appointment</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold">{nextAppointment.patientName}</p>
                  <p className="text-muted-foreground">{nextAppointment.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{nextAppointment.time}</p>
                  <Badge variant="default" className="mt-1">
                    {nextAppointment.status}
                  </Badge>
                </div>
                 <Link href={`/doctor/patients/${nextAppointment.patientId}`}>
                  <Button>
                    View Patient File <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for today.</CardDescription>
            </CardHeader>
            <CardContent>
              {todayAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAppointments.map(appt => (
                      <TableRow key={appt.id} className={appt.id === nextAppointment?.id ? 'bg-muted' : ''}>
                        <TableCell className="font-medium">{appt.time}</TableCell>
                        <TableCell>{appt.patientName}</TableCell>
                        <TableCell>{appt.reason}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/doctor/patients/${appt.patientId}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12" />
                  <p className="mt-4">No appointments scheduled for today.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>My Patients</CardTitle>
              <CardDescription>A list of your active patients.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorData.patients.map(patient => (
                  <Link href={`/doctor/patients/${patient.id}`} key={patient.id}>
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">{patient.email}</p>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
