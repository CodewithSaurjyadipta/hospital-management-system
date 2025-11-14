import { getPatientData } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO } from 'date-fns';
import { HeartPulse, Stethoscope, Thermometer, User, Pill } from 'lucide-react';
import { PrescriptionChecker } from '@/components/prescription-checker';

export default function PatientRecordPage({ params }: { params: { patientId: string } }) {
  const patientData = getPatientData(params.patientId);

  if (!patientData) {
    return <div className="container py-8">Patient not found.</div>;
  }

  const { name, email, dateOfBirth, avatarUrl, medicalRecord } = patientData;
  const latestVitals = medicalRecord?.records.vitals[0];

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-2xl">{name}</CardTitle>
                <CardDescription>{email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Born on {format(parseISO(dateOfBirth), 'MMMM d, yyyy')}</span>
              </div>
            </CardContent>
          </Card>
          
          {latestVitals && (
            <Card>
              <CardHeader>
                <CardTitle>Latest Vitals</CardTitle>
                <CardDescription>As of {format(parseISO(latestVitals.date), 'PPP')}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-muted-foreground">BP</div>
                    <div className="font-semibold">{latestVitals.bloodPressure}</div>
                  </div>
                </div>
                 <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-muted-foreground">Heart Rate</div>
                    <div className="font-semibold">{latestVitals.heartRate} bpm</div>
                  </div>
                </div>
                 <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-muted-foreground">Temp</div>
                    <div className="font-semibold">{latestVitals.temperature}°F</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <PrescriptionChecker
            patientId={patientData.id}
            medicationHistory={medicalRecord?.records.medications.map(m => m.name) || []}
          />
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="diagnoses">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="vitals">Vitals History</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="diagnoses">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnosis History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Doctor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medicalRecord?.records.diagnoses.map((d, i) => (
                        <TableRow key={i}>
                          <TableCell>{format(parseISO(d.date), 'yyyy-MM-dd')}</TableCell>
                          <TableCell className="font-medium">{d.diagnosis}</TableCell>
                          <TableCell>{d.doctor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>Medication History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Start Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medicalRecord?.records.medications.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium">{m.name}</TableCell>
                          <TableCell>{m.dosage}</TableCell>
                          <TableCell>{m.frequency}</TableCell>
                          <TableCell>{format(parseISO(m.startDate), 'yyyy-MM-dd')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vitals">
               <Card>
                <CardHeader>
                  <CardTitle>Vitals History</CardTitle>
                </CardHeader>
                <CardContent>
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Blood Pressure</TableHead>
                        <TableHead>Heart Rate</TableHead>
                        <TableHead>Temp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medicalRecord?.records.vitals.map((v, i) => (
                        <TableRow key={i}>
                          <TableCell>{format(parseISO(v.date), 'yyyy-MM-dd')}</TableCell>
                          <TableCell>{v.bloodPressure}</TableCell>
                          <TableCell>{v.heartRate} bpm</TableCell>
                          <TableCell>{v.temperature}°F</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="notes">
               <Card>
                <CardHeader>
                  <CardTitle>Consultation Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {medicalRecord?.records.notes.map((n, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">{n.note}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        - {n.doctor} on {format(parseISO(n.date), 'PPP')}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
