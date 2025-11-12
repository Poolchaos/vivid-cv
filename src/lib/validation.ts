import { z } from "zod";

// Personal Info Schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number too long"),
  location: z.string().min(2, "Location must be at least 2 characters").max(100, "Location too long"),
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title too long"),
  summary: z.string().min(50, "Summary must be at least 50 characters").max(500, "Summary too long"),
});

// Experience Schema
export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name too long"),
  position: z.string().min(2, "Position must be at least 2 characters").max(100, "Position too long"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description too long"),
}).refine(
  (data) => {
    if (data.current) return true;
    return !!data.endDate;
  },
  {
    message: "End date is required when not currently employed",
    path: ["endDate"],
  }
);

// Education Schema
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(2, "Institution name must be at least 2 characters").max(100, "Institution name too long"),
  degree: z.string().min(2, "Degree must be at least 2 characters").max(100, "Degree too long"),
  field: z.string().min(2, "Field of study must be at least 2 characters").max(100, "Field too long"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
}).refine(
  (data) => {
    if (data.current) return true;
    return !!data.endDate;
  },
  {
    message: "End date is required when not currently enrolled",
    path: ["endDate"],
  }
);

// Skill Schema
export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Skill name must be at least 2 characters").max(50, "Skill name too long"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  category: z.string().min(2, "Category must be at least 2 characters").max(50, "Category too long"),
});

// Full Resume Schema
export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  selectedTemplate: z.enum(["card-flip", "timeline", "skill-galaxy"]).nullable(),
});

// Export inferred types
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type ResumeDataInput = z.infer<typeof resumeDataSchema>;

// Validation helper
export function validatePersonalInfo(data: unknown) {
  return personalInfoSchema.safeParse(data);
}

export function validateExperience(data: unknown) {
  return experienceSchema.safeParse(data);
}

export function validateEducation(data: unknown) {
  return educationSchema.safeParse(data);
}

export function validateSkill(data: unknown) {
  return skillSchema.safeParse(data);
}

export function validateResumeData(data: unknown) {
  return resumeDataSchema.safeParse(data);
}
