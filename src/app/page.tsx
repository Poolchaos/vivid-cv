'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Eye } from "lucide-react";

const templates = [
  {
    id: 'card-flip',
    name: '3D Card Flip',
    description: 'Stunning 3D card with flippable effects showcasing your profile',
    features: ['3D Transforms', 'Hover Effects', 'Interactive'],
  },
  {
    id: 'timeline',
    name: 'Timeline Flow',
    description: 'Animated career timeline with smooth scrolling milestones',
    features: ['Scroll Animations', 'Timeline Layout', 'Career Flow'],
  },
  {
    id: 'skill-galaxy',
    name: 'Skill Galaxy',
    description: 'Interactive particle system visualizing your expertise',
    features: ['Particle System', '3D Space', 'Skill Visualization'],
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Interactive 3D',
    description: 'Stand out with stunning 3D animations powered by React Three Fiber',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for performance with instant loading and smooth interactions',
  },
  {
    icon: Eye,
    title: 'Memorable',
    description: 'Create a lasting impression that traditional resumes simply cannot match',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
            >
              <Sparkles className="w-4 h-4" />
              Next-generation resume builder
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
              Bring Your Resume to{' '}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Life
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Create stunning 3D interactive resumes that captivate recruiters and showcase your unique personality
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/create">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="#templates">View Templates</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why VividCV?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Traditional resumes are boring. Stand out with interactive 3D experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Template
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Each template brings your resume to life in its own unique way
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-white">{template.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-linear-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 text-sm">Interactive Preview</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/create">
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Stand Out?
            </h2>
            <p className="text-xl text-gray-300">
              Join creators who are redefining how resumes look and feel. Create your interactive 3D resume in minutes.
            </p>
            <Button size="lg" className="text-lg px-12" asChild>
              <Link href="/create">
                Create Your Resume Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © 2025 VividCV. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
