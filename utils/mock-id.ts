// utils/mock-data.ts

export const getMockPatientById = async (userId: string | null) => {
  // You can toggle between `null` and mock data
  if (!userId) return null;

  const mockPatient = {
    id: "123",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: new Date("1990-01-01"),
    gender: "MALE",
    phone: "1234567890",
    email: "john.doe@example.com",
    marital_status: "single",
    address: "123 Main St",
    emergency_contact_name: "Jane Doe",
    emergency_contact_number: "0987654321",
    relation: "wife",
    blood_group: "O+",
    allergies: "Peanuts",
    medical_conditions: "Hypertension",
    medical_history: "None",
    insurance_provider: "MockCare",
    insurance_number: "MC123456",
    privacy_consent: true,
    service_consent: true,
    medical_consent: true,
    img: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  // 🔁 Toggle this to test both create and update flows
  return null; // Simulates first-time user
  // return mockPatient; // Simulates existing patient
};
