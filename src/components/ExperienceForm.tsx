"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResumeStore, Experience } from "@/store/resumeStore";
import { validateExperience } from "@/lib/validation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface ExperienceErrors {
  [key: string]: {
    [field: string]: string;
  };
}

export function ExperienceForm() {
  const { experience, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [errors, setErrors] = useState<ExperienceErrors>({});

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    addExperience(newExperience);
  };

  const handleInputChange = (id: string, field: keyof Experience, value: string | boolean) => {
    updateExperience(id, { [field]: value });
    
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
    const exp = experience.find((e) => e.id === id);
    if (!exp) return;

    const result = validateExperience(exp);
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
    removeExperience(id);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>
          Add your professional work experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-md space-y-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => handleRemove(exp.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`company-${exp.id}`} className="text-sm font-medium">
                  Company
                </label>
                <Input
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) => handleInputChange(exp.id, "company", e.target.value)}
                  onBlur={() => handleBlur(exp.id, "company")}
                  className={errors[exp.id]?.company ? "border-destructive" : ""}
                  placeholder="Acme Corp"
                />
                {errors[exp.id]?.company && (
                  <p className="text-sm text-destructive">{errors[exp.id].company}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor={`position-${exp.id}`} className="text-sm font-medium">
                  Position
                </label>
                <Input
                  id={`position-${exp.id}`}
                  value={exp.position}
                  onChange={(e) => handleInputChange(exp.id, "position", e.target.value)}
                  onBlur={() => handleBlur(exp.id, "position")}
                  className={errors[exp.id]?.position ? "border-destructive" : ""}
                  placeholder="Senior Developer"
                />
                {errors[exp.id]?.position && (
                  <p className="text-sm text-destructive">{errors[exp.id].position}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`startDate-${exp.id}`} className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id={`startDate-${exp.id}`}
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange(exp.id, "startDate", e.target.value)}
                  onBlur={() => handleBlur(exp.id, "startDate")}
                  className={errors[exp.id]?.startDate ? "border-destructive" : ""}
                />
                {errors[exp.id]?.startDate && (
                  <p className="text-sm text-destructive">{errors[exp.id].startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor={`endDate-${exp.id}`} className="text-sm font-medium">
                  End Date
                </label>
                <div className="space-y-2">
                  <Input
                    id={`endDate-${exp.id}`}
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleInputChange(exp.id, "endDate", e.target.value)}
                    onBlur={() => handleBlur(exp.id, "endDate")}
                    className={errors[exp.id]?.endDate ? "border-destructive" : ""}
                    disabled={exp.current}
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleInputChange(exp.id, "current", e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Currently working here</span>
                  </label>
                </div>
                {errors[exp.id]?.endDate && (
                  <p className="text-sm text-destructive">{errors[exp.id].endDate}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor={`description-${exp.id}`} className="text-sm font-medium">
                Description
              </label>
              <textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => handleInputChange(exp.id, "description", e.target.value)}
                onBlur={() => handleBlur(exp.id, "description")}
                rows={3}
                className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors[exp.id]?.description ? "border-destructive" : ""
                }`}
                placeholder="Describe your responsibilities and achievements..."
              />
              {errors[exp.id]?.description && (
                <p className="text-sm text-destructive">{errors[exp.id].description}</p>
              )}
            </div>
          </div>
        ))}

        <Button onClick={handleAddExperience} variant="outline" className="w-full">
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
}
