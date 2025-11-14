import type { Patient, Doctor, Appointment, MedicalRecord } from './types';

export const mockPatients: Patient[] = [
  {
    id: 'pat1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1985-04-12',
    avatarUrl: 'https://picsum.photos/seed/pat1/100/100',
    phone: '555-0101',
  },
  {
    id: 'pat2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    dateOfBirth: '1992-09-23',
    avatarUrl: 'https://picsum.photos/seed/pat2/100/100',
    phone: '555-0102',
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Emily Carter',
    email: 'emily.carter@medicare.com',
    specialty: 'Cardiology',
    avatarUrl: 'https://picsum.photos/seed/doc1/100/100',
  },
  {
    id: 'doc2',
    name: 'Dr. Ben Adams',
    email: 'ben.adams@medicare.com',
    specialty: 'Neurology',
    avatarUrl: 'https://picsum.photos/seed/doc2/100/100',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'pat1',
    doctorId: 'doc1',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    time: '10:00 AM',
    reason: 'Annual Checkup',
    status: 'Scheduled',
  },
  {
    id: 'apt2',
    patientId: 'pat2',
    doctorId: 'doc2',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    time: '02:30 PM',
    reason: 'Follow-up consultation',
    status: 'Scheduled',
  },
  {
    id: 'apt3',
    patientId: 'pat1',
    doctorId: 'doc1',
    date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    time: '09:00 AM',
    reason: 'Chest Pain',
    status: 'Completed',
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
    {
        id: 'rec1',
        patientId: 'pat1',
        records: {
            vitals: [
                { date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(), bloodPressure: '120/80', heartRate: 72, temperature: 98.6, respiratoryRate: 16 },
                { date: new Date(new Date().setDate(new Date().getDate() - 375)).toISOString(), bloodPressure: '118/78', heartRate: 70, temperature: 98.5, respiratoryRate: 16 },
            ],
            diagnoses: [
                { date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(), diagnosis: 'Stable Angina', doctor: 'Dr. Emily Carter' },
                { date: new Date(new Date().setDate(new Date().getDate() - 730)).toISOString(), diagnosis: 'Hypertension', doctor: 'Dr. Emily Carter' },
            ],
            medications: [
                { id: 'med1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', startDate: new Date(new Date().setDate(new Date().getDate() - 730)).toISOString() },
                { id: 'med2', name: 'Aspirin', dosage: '81mg', frequency: 'Once a day', startDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString() },
            ],
            notes: [
                { date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(), note: 'Patient reports occasional chest discomfort. EKG normal. Stress test scheduled.', doctor: 'Dr. Emily Carter'},
            ]
        }
    },
    {
        id: 'rec2',
        patientId: 'pat2',
        records: {
            vitals: [
                { date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), bloodPressure: '110/70', heartRate: 65, temperature: 98.7, respiratoryRate: 18 },
            ],
            diagnoses: [
                { date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), diagnosis: 'Migraine without aura', doctor: 'Dr. Ben Adams' },
            ],
            medications: [
                 { id: 'med3', name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed for migraine', startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString() },
            ],
            notes: [
                { date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), note: 'Patient presented with classic migraine symptoms. Responded well to initial treatment.', doctor: 'Dr. Ben Adams'},
            ]
        }
    }
];

export function getPatientData(patientId: string) {
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return null;

    const appointments = mockAppointments.filter(a => a.patientId === patientId);
    const medicalRecord = mockMedicalRecords.find(r => r.patientId === patientId);

    return {
        ...patient,
        appointments,
        medicalRecord
    }
}

export function getDoctorData(doctorId: string) {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    if (!doctor) return null;

    const appointments = mockAppointments.filter(a => a.doctorId === doctorId)
      .map(appt => ({
        ...appt,
        patientName: mockPatients.find(p => p.id === appt.patientId)?.name || 'Unknown Patient'
      }));
      
    const patientIds = [...new Set(appointments.map(a => a.patientId))];
    const patients = mockPatients.filter(p => patientIds.includes(p.id));

    return {
        ...doctor,
        appointments,
        patients,
    }
}
