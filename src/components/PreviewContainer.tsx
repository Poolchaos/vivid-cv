import { useResumeStore } from '../store/resumeStore';
import CardFlipTemplate from './templates/CardFlipTemplate';
import TimelineTemplate from './templates/TimelineTemplate';
import SkillGalaxyTemplate from './templates/SkillGalaxyTemplate';
import { motion } from 'framer-motion';

export default function PreviewContainer() {
  const { selectedTemplate } = useResumeStore();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'card-flip':
        return <CardFlipTemplate />;
      case 'timeline':
        return <TimelineTemplate />;
      case 'skill-galaxy':
        return <SkillGalaxyTemplate />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Select a template to preview</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-700"
    >
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <h2 className="text-lg font-semibold text-white">Live Preview</h2>
        <p className="text-sm text-gray-400 mt-1">
          Your resume updates in real-time as you fill the form
        </p>
      </div>
      <div className="w-full h-[calc(100%-80px)]">{renderTemplate()}</div>
    </motion.div>
  );
}
