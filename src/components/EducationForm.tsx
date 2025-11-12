"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResumeStore, Education } from "@/store/resumeStore";
import { validateEducation } from "@/lib/validation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface EducationErrors {
  [key: string]: {
    [field: string]: string;
  };
}

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [errors, setErrors] = useState<EducationErrors>({});

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    addEducation(newEducation);
  };

  const handleInputChange = (id: string, field: keyof Education, value: string | boolean) => {
    updateEducation(id, { [field]: value });
    
    // Clear error for this field
    if (errors[id]?.[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors[id]) {
          delete newErrors[id][field];
          if (Object.keys(newErrors[id]).length === 0) {
            delete newErrors[id];
          }
        }
        return newErrors;
      });
    }
  };

  const handleBlur = (id: string, field: string) => {
    const edu = education.find((e) => e.id === id);
    if (!edu) return;

    const result = validateEducation(edu);
    if (!result.success) {
      const fieldError = result.error.issues.find((err) => err.path[0] === field);
      if (fieldError) {
        setErrors((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            [field]: fieldError.message,
          },
        }));
      }
    }
  };

  const handleRemove = (id: string) => {
    removeEducation(id);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>
          Add your educational background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-md space-y-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => handleRemove(edu.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`institution-${edu.id}`} className="text-sm font-medium">
                  Institution
                </label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => handleInputChange(edu.id, "institution", e.target.value)}
                  onBlur={() => handleBlur(edu.id, "institution")}
                  className={errors[edu.id]?.institution ? "border-destructive" : ""}
                  placeholder="University of Example"
                />
                {errors[edu.id]?.institution && (
                  <p className="text-sm text-destructive">{errors[edu.id].institution}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor={`degree-${edu.id}`} className="text-sm font-medium">
                  Degree
                </label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => handleInputChange(edu.id, "degree", e.target.value)}
                  onBlur={() => handleBlur(edu.id, "degree")}
                  className={errors[edu.id]?.degree ? "border-destructive" : ""}
                  placeholder="Bachelor of Science"
                />
                {errors[edu.id]?.degree && (
                  <p className="text-sm text-destructive">{errors[edu.id].degree}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor={`field-${edu.id}`} className="text-sm font-medium">
                Field of Study
              </label>
              <Input
                id={`field-${edu.id}`}
                value={edu.field}
                onChange={(e) => handleInputChange(edu.id, "field", e.target.value)}
                onBlur={() => handleBlur(edu.id, "field")}
                className={errors[edu.id]?.field ? "border-destructive" : ""}
                placeholder="Computer Science"
              />
              {errors[edu.id]?.field && (
                <p className="text-sm text-destructive">{errors[edu.id].field}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`startDate-${edu.id}`} className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id={`startDate-${edu.id}`}
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleInputChange(edu.id, "startDate", e.target.value)}
                  onBlur={() => handleBlur(edu.id, "startDate")}
                  className={errors[edu.id]?.startDate ? "border-destructive" : ""}
                />
                {errors[edu.id]?.startDate && (
                  <p className="text-sm text-destructive">{errors[edu.id].startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor={`endDate-${edu.id}`} className="text-sm font-medium">
                  End Date
                </label>
                <div className="space-y-2">
                  <Input
                    id={`endDate-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => handleInputChange(edu.id, "endDate", e.target.value)}
                    onBlur={() => handleBlur(edu.id, "endDate")}
                    className={errors[edu.id]?.endDate ? "border-destructive" : ""}
                    disabled={edu.current}
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => handleInputChange(edu.id, "current", e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Currently enrolled</span>
                  </label>
                </div>
                {errors[edu.id]?.endDate && (
                  <p className="text-sm text-destructive">{errors[edu.id].endDate}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button onClick={handleAddEducation} variant="outline" className="w-full">
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
