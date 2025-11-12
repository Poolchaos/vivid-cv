"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export type TemplateId = "card-flip" | "timeline" | "skill-galaxy";

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: "card-flip",
    name: "3D Card Flip",
    description: "Profile photo flips in 3D on hover with smooth animations",
    thumbnail: "/templates/card-flip.png",
    features: ["3D Transforms", "Hover Effects", "Photo Showcase"],
  },
  {
    id: "timeline",
    name: "Timeline Flow",
    description: "Animated scrollable career timeline with milestones",
    thumbnail: "/templates/timeline.png",
    features: ["Scroll Animations", "Timeline Layout", "Career Progression"],
  },
  {
    id: "skill-galaxy",
    name: "Skill Galaxy",
    description: "Interactive particle system visualizing your skills",
    thumbnail: "/templates/skill-galaxy.png",
    features: ["Particle System", "Interactive", "Skill Visualization"],
  },
];

interface TemplateSelectorProps {
  selectedTemplate?: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateId | null>(null);

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="radiogroup"
      aria-label="Resume template selection"
    >
      {templates.map((template) => {
        const isSelected = selectedTemplate === template.id;
        const isHovered = hoveredTemplate === template.id;

        return (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 ${
              isSelected
                ? "ring-2 ring-primary shadow-lg"
                : isHovered
                ? "shadow-md scale-[1.02]"
                : ""
            }`}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            onClick={() => onSelectTemplate(template.id)}
            role="radio"
            aria-checked={isSelected}
            aria-labelledby={`template-${template.id}-title`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTemplate(template.id);
              }
            }}
          >
            <CardHeader>
              <CardTitle 
                id={`template-${template.id}-title`}
                className="flex items-center justify-between"
              >
                {template.name}
                {isSelected && (
                  <span className="text-xs font-normal text-primary" aria-label="Currently selected">
                    Selected
                  </span>
                )}
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground text-sm">Preview</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <Button
                variant={isSelected ? "default" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTemplate(template.id);
                }}
              >
                {isSelected ? "Selected" : "Select Template"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
