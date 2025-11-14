export type Patient = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  avatarUrl: string;
  phone: string;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  specialty: string;
  avatarUrl: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  patientName?: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
};

export type Vital = {
    date: string;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
}

export type Diagnosis = {
    date: string;
    diagnosis: string;
    doctor: string;
}

export type Note = {
    date: string;
    note: string;
    doctor: string;
}

export type MedicalRecord = {
  id: string;
  patientId: string;
  records: {
    vitals: Vital[];
    diagnoses: Diagnosis[];
    medications: Medication[];
    notes: Note[];
  };
};
