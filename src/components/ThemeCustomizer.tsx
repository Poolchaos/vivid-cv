"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeCustomizerProps {
  onThemeChange?: (colors: ThemeColors) => void;
}

const colorPresets = [
  { name: "Blue", primary: "221.2 83.2% 53.3%", secondary: "210 40% 96.1%", accent: "210 40% 96.1%" },
  { name: "Purple", primary: "262.1 83.3% 57.8%", secondary: "270 60% 98%", accent: "270 60% 98%" },
  { name: "Green", primary: "142.1 76.2% 36.3%", secondary: "138 76% 97%", accent: "138 76% 97%" },
  { name: "Orange", primary: "24.6 95% 53.1%", secondary: "33 100% 96%", accent: "33 100% 96%" },
  { name: "Red", primary: "0 84.2% 60.2%", secondary: "0 85.7% 97.3%", accent: "0 85.7% 97.3%" },
];

const fontOptions = [
  { name: "Inter", value: "var(--font-inter)" },
  { name: "System", value: "system-ui" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Mono", value: "var(--font-mono)" },
];

const spacingOptions = [
  { name: "Compact", value: "compact" },
  { name: "Normal", value: "normal" },
  { name: "Spacious", value: "spacious" },
];

export function ThemeCustomizer({ onThemeChange }: ThemeCustomizerProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [selectedSpacing, setSelectedSpacing] = useState(1);

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    const preset = colorPresets[index];
    onThemeChange?.({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Customizer</CardTitle>
        <CardDescription>
          Customize the colors, fonts, and spacing of your resume
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Color Scheme</h4>
          <div className="grid grid-cols-5 gap-2">
            {colorPresets.map((preset, index) => (
              <button
                key={preset.name}
                onClick={() => handleColorSelect(index)}
                className={`relative aspect-square rounded-md transition-all ${
                  selectedColor === index ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                style={{
                  background: `hsl(${preset.primary})`,
                }}
                aria-label={`Select ${preset.name} color scheme`}
              >
                {selectedColor === index && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {colorPresets[selectedColor].name}
          </p>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Font Family</h4>
          <div className="grid grid-cols-2 gap-2">
            {fontOptions.map((font, index) => (
              <Button
                key={font.name}
                variant={selectedFont === index ? "default" : "outline"}
                className="justify-start"
                onClick={() => setSelectedFont(index)}
              >
                {font.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Spacing Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Spacing</h4>
          <div className="grid grid-cols-3 gap-2">
            {spacingOptions.map((spacing, index) => (
              <Button
                key={spacing.name}
                variant={selectedSpacing === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpacing(index)}
              >
                {spacing.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Preview</h4>
          <div
            className="p-4 rounded-md border"
            style={{
              background: `hsl(${colorPresets[selectedColor].secondary})`,
              fontFamily: fontOptions[selectedFont].value,
            }}
          >
            <h5
              className="text-lg font-semibold mb-2"
              style={{ color: `hsl(${colorPresets[selectedColor].primary})` }}
            >
              John Doe
            </h5>
            <p className="text-sm text-muted-foreground">
              This is how your resume will look with the selected theme.
            </p>
          </div>
        </div>

        <Button className="w-full">Apply Theme</Button>
      </CardContent>
    </Card>
  );
}
