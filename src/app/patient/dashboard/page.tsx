import { getPatientData } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Pill, Stethoscope, User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

export default function PatientDashboard() {
  // In a real app, you'd get the logged-in user's ID
  const patientData = getPatientData('pat1');

  if (!patientData) {
    return <div className="container py-8">Patient not found.</div>;
  }

  const upcomingAppointments = patientData.appointments
    .filter(a => a.status === 'Scheduled' && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recentMedication = patientData.medicalRecord?.records.medications[0];
  const recentDiagnosis = patientData.medicalRecord?.records.diagnoses[0];


  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={patientData.avatarUrl} alt={patientData.name} />
                <AvatarFallback>{patientData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-2xl">{patientData.name}</CardTitle>
                <CardDescription>{patientData.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Born on {format(parseISO(patientData.dateOfBirth), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span>Member since 2022</span>
                </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/patient/ai-scheduler">
                <Button className="w-full justify-start gap-2">
                  <Bot className="h-4 w-4" />
                  AI Scheduler
                </Button>
              </Link>
              <Link href="/patient/billing">
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <Pill className="h-4 w-4" />
                  View Prescriptions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your next scheduled visits.</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.map(appt => (
                      <TableRow key={appt.id}>
                        <TableCell>{format(parseISO(appt.date), 'EEE, MMM d, yyyy')}</TableCell>
                        <TableCell>{appt.time}</TableCell>
                        <TableCell>Dr. Carter</TableCell>
                        <TableCell>{appt.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-4">No upcoming appointments.</p>
              )}
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Health Summary</CardTitle>
               <CardDescription>A quick look at your recent health status.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold text-sm text-muted-foreground">Recent Diagnosis</h3>
                {recentDiagnosis ? (
                  <>
                    <p className="font-bold text-lg">{recentDiagnosis.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">on {format(parseISO(recentDiagnosis.date), 'MMM d, yyyy')}</p>
                  </>
                ) : <p className="text-muted-foreground">No recent diagnosis.</p>}
              </div>
               <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold text-sm text-muted-foreground">Current Medication</h3>
                {recentMedication ? (
                  <>
                    <p className="font-bold text-lg">{recentMedication.name} {recentMedication.dosage}</p>
                    <p className="text-xs text-muted-foreground">{recentMedication.frequency}</p>
                  </>
                ) : <p className="text-muted-foreground">No active medications.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
