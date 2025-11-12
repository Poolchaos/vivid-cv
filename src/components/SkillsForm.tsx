"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResumeStore, Skill } from "@/store/resumeStore";
import { validateSkill } from "@/lib/validation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface SkillErrors {
  [key: string]: {
    [field: string]: string;
  };
}

const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
] as const;

export function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [errors, setErrors] = useState<SkillErrors>({});

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: "intermediate",
      category: "",
    };
    addSkill(newSkill);
  };

  const handleInputChange = (id: string, field: keyof Skill, value: string) => {
    updateSkill(id, { [field]: value });
    
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
    const skill = skills.find((s) => s.id === id);
    if (!skill) return;

    const result = validateSkill(skill);
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
    removeSkill(id);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your technical and professional skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded-md space-y-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => handleRemove(skill.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor={`name-${skill.id}`} className="text-sm font-medium">
                  Skill Name
                </label>
                <Input
                  id={`name-${skill.id}`}
                  value={skill.name}
                  onChange={(e) => handleInputChange(skill.id, "name", e.target.value)}
                  onBlur={() => handleBlur(skill.id, "name")}
                  className={errors[skill.id]?.name ? "border-destructive" : ""}
                  placeholder="React"
                />
                {errors[skill.id]?.name && (
                  <p className="text-sm text-destructive">{errors[skill.id].name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor={`category-${skill.id}`} className="text-sm font-medium">
                  Category
                </label>
                <Input
                  id={`category-${skill.id}`}
                  value={skill.category}
                  onChange={(e) => handleInputChange(skill.id, "category", e.target.value)}
                  onBlur={() => handleBlur(skill.id, "category")}
                  className={errors[skill.id]?.category ? "border-destructive" : ""}
                  placeholder="Frontend Development"
                />
                {errors[skill.id]?.category && (
                  <p className="text-sm text-destructive">{errors[skill.id].category}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor={`level-${skill.id}`} className="text-sm font-medium">
                Proficiency Level
              </label>
              <select
                id={`level-${skill.id}`}
                value={skill.level}
                onChange={(e) => handleInputChange(skill.id, "level", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {skillLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <Button onClick={handleAddSkill} variant="outline" className="w-full">
          Add Skill
        </Button>
      </CardContent>
    </Card>
  );
}
