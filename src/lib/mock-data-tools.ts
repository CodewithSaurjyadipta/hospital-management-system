import { mockAppointments, mockDoctors } from './mock-data';
import { Appointment } from './types';
import { format, parse, isSameDay } from 'date-fns';

const allTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

/**
 * Gets the available appointment slots for a given doctor on a specific date.
 */
export function getDoctorAvailability(doctorName: string, date: string): string[] {
  console.log(`Checking availability for ${doctorName} on ${date}`);

  const doctor = mockDoctors.find(d => d.name.toLowerCase() === doctorName.toLowerCase());
  if (!doctor) {
    return []; // Or throw an error
  }
  
  const targetDate = parse(date, 'yyyy-MM-dd', new Date());

  const bookedSlots = mockAppointments
    .filter(appt => 
        appt.doctorId === doctor.id && 
        isSameDay(parse(appt.date, 'yyyy-MM-dd', new Date()), targetDate)
    )
    .map(appt => appt.time);

  const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
  
  console.log('Available slots:', availableSlots);
  return availableSlots;
}

/**
 * Books a new appointment.
 */
export function bookAppointment(details: {
  patientId: string;
  doctorName: string;
  date: string;
  time: string;
}): { success: boolean; message: string } {
    console.log('Attempting to book appointment with details:', details);
    
    const doctor = mockDoctors.find(d => d.name.toLowerCase() === details.doctorName.toLowerCase());
    if (!doctor) {
        return { success: false, message: `Doctor "${details.doctorName}" not found.` };
    }

    const availability = getDoctorAvailability(details.doctorName, details.date);
    if (!availability.includes(details.time)) {
        return { success: false, message: `The time slot ${details.time} is not available.` };
    }

    const newAppointment: Appointment = {
        id: `apt${mockAppointments.length + 1}`,
        patientId: details.patientId,
        doctorId: doctor.id,
        date: details.date,
        time: details.time,
        reason: 'AI Scheduled Appointment',
        status: 'Scheduled',
    };

    mockAppointments.push(newAppointment);

    console.log('Booking successful:', newAppointment);
    return { success: true, message: 'Appointment booked successfully.' };
}
