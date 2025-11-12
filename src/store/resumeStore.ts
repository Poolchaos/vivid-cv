import { create } from "zustand";
import { TemplateId } from "@/components/TemplateSelector";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  selectedTemplate: TemplateId | null;
}

interface ResumeStore extends ResumeData {
  // Personal Info Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Experience Actions
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  // Education Actions
  addEducation: (education: Education) => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Skills Actions
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  
  // Template Selection
  setTemplate: (templateId: TemplateId) => void;
  
  // Reset
  resetResume: () => void;
}

const initialState: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  selectedTemplate: null,
};

export const useResumeStore = create<ResumeStore>((set) => ({
  ...initialState,
  
  updatePersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),
  
  addExperience: (experience) =>
    set((state) => ({
      experience: [...state.experience, experience],
    })),
  
  updateExperience: (id, updates) =>
    set((state) => ({
      experience: state.experience.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    })),
  
  removeExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((exp) => exp.id !== id),
    })),
  
  addEducation: (education) =>
    set((state) => ({
      education: [...state.education, education],
    })),
  
  updateEducation: (id, updates) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    })),
  
  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),
  
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),
  
  updateSkill: (id, updates) =>
    set((state) => ({
      skills: state.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    })),
  
  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== id),
    })),
  
  setTemplate: (templateId) =>
    set({ selectedTemplate: templateId }),
  
  resetResume: () => set(initialState),
}));
