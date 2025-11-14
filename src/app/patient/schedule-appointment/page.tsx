"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDoctors } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function ScheduleAppointmentPage() {
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const { toast } = useToast();

    const handleBooking = () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            toast({
                title: "Incomplete Information",
                description: "Please select a doctor, date, and time.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Appointment Booked!",
            description: `Your appointment with ${mockDoctors.find(d => d.id === selectedDoctor)?.name} on ${format(selectedDate, 'PPP')} at ${selectedTime} has been confirmed.`,
        });

        // Reset state
        setSelectedDoctor(null);
        setSelectedDate(new Date());
        setSelectedTime(null);
    }

    return (
        <div className="container py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Schedule an Appointment</CardTitle>
                    <CardDescription>Choose a doctor and find a time that works for you.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium mb-2 block">1. Select a Doctor</label>
                            <Select onValueChange={setSelectedDoctor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a healthcare professional" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockDoctors.map(doctor => (
                                        <SelectItem key={doctor.id} value={doctor.id}>
                                            {doctor.name} - {doctor.specialty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium mb-2 block">2. Select a Date</label>
                            <div className="flex justify-center rounded-md border">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium mb-2 block">3. Select a Time</label>
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map(time => (
                                    <Button 
                                        key={time} 
                                        variant={selectedTime === time ? "default" : "outline"}
                                        onClick={() => setSelectedTime(time)}
                                        disabled={!selectedDoctor || !selectedDate}
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </div>
                         {selectedDoctor && selectedDate && selectedTime && (
                             <Card className="bg-muted/50">
                                 <CardHeader>
                                     <CardTitle className="text-lg">Appointment Summary</CardTitle>
                                 </CardHeader>
                                <CardContent className="space-y-2">
                                    <p><strong>Doctor:</strong> {mockDoctors.find(d => d.id === selectedDoctor)?.name}</p>
                                    <p><strong>Date:</strong> {format(selectedDate, 'MMMM d, yyyy')}</p>
                                    <p><strong>Time:</strong> {selectedTime}</p>
                                </CardContent>
                             </Card>
                         )}
                         <Button className="w-full" size="lg" onClick={handleBooking} disabled={!selectedDoctor || !selectedDate || !selectedTime}>
                            Confirm Booking
                         </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
