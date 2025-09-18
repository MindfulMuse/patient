import { z } from "zod";

export const PatientFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name can't be more than 50 characters"),

  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name can't be more than 50 characters"),

  date_of_birth: z.coerce.date(),

  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),

  phone: z
    .string()
    .min(10, "Enter phone number")
    .max(10, "Enter phone number"),

  email: z.string().email("Invalid email address."),

  marital_status: z
    .enum(["married", "single", "divorced", "widowed", "separated"])
    .optional(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters")
    .optional(),
// clerk_id: z.string(),
  emergency_contact_name: z
    .string()
    .min(2, "Emergency contact name is required.")
    .max(50, "Emergency contact must be at most 50 characters"),

  emergency_contact_number: z
    .string()
    .min(10, "Enter phone number")
    .max(10, "Enter phone number"),

  relation: z.enum(["mother", "father", "husband", "wife", "other"], {
    message: "Relation with contact person is required",
  }),

  blood_group: z.string(), // required per Prisma

  allergies: z.string().optional(),

  medical_conditions: z.string(), // required per Prisma

  medical_history: z.string().optional(),

  last_admitted_hospital: z.string().optional(),
  last_admission_date: z.coerce.date().optional(),
  admission_reason: z.string().optional(),


  privacy_consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the privacy policy.",
    }),

  service_consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the terms of service.",
    }),

  medical_consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the medical treatment terms.",
    }),

  img: z.string().optional(),
});
