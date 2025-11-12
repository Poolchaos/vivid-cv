'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ResumeForm } from "@/components/ResumeForm";
import PreviewContainer from "@/components/PreviewContainer";
import { TemplateSelector } from "@/components/TemplateSelector";
import { useResumeStore } from "@/store/resumeStore";
import type { TemplateId } from "@/components/TemplateSelector";

export default function CreateResumePage() {
  const { selectedTemplate, setTemplate } = useResumeStore();

  const handleTemplateChange = (templateId: TemplateId) => {
    setTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">VividCV</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Preview</Button>
            <Button size="sm">Publish</Button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <TemplateSelector
            selectedTemplate={selectedTemplate || undefined}
            onSelectTemplate={handleTemplateChange}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <ResumeForm />
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:sticky lg:top-8 h-[800px]"
          >
            <PreviewContainer />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
