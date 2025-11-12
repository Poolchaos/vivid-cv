"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeStore } from "@/store/resumeStore";
import { validatePersonalInfo } from "@/lib/validation";
import { useState } from "react";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
interface ValidationErrors {
  [key: string]: string;
}

export function ResumeForm() {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    // Validate the entire personalInfo when a field loses focus
    const result = validatePersonalInfo(personalInfo);
    if (!result.success) {
      const fieldError = result.error.issues.find((err) => err.path[0] === field);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Basic information that will appear at the top of your resume
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={personalInfo.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Professional Title
              </label>
              <Input
                id="title"
                placeholder="Senior Software Engineer"
                value={personalInfo.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                onBlur={() => handleBlur("title")}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={personalInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              value={personalInfo.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              onBlur={() => handleBlur("location")}
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="summary" className="text-sm font-medium">
              Professional Summary
            </label>
            <textarea
              id="summary"
              placeholder="Brief summary of your experience and skills..."
              rows={4}
              value={personalInfo.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              onBlur={() => handleBlur("summary")}
              className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.summary ? "border-destructive" : ""
              }`}
            />
            {errors.summary && (
              <p className="text-sm text-destructive">{errors.summary}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <ExperienceForm />
      <EducationForm />
      <SkillsForm />
    </div>
  );
}
