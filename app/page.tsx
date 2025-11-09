'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, FileSearch, ArrowRight, Github, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1724] via-[#1a2332] to-[#0f1724]">
      <nav className="border-b border-cyan-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span className="text-2xl font-bold text-white">SentinelForge</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">AI-Powered Security Analysis</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Automatically find vulnerabilities and malicious code in open source
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              {' '}— fast
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your code or logs, and let our AI agents identify security threats, analyze intent, and generate comprehensive reports in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500/30 hover:bg-cyan-500/10 px-8"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-[#0f1724]/50 border-cyan-500/20 p-8 backdrop-blur-sm">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl"
                />
              </div>
              <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Shield className="w-32 h-32 text-cyan-400 opacity-80" />
                </motion.div>
                <p className="text-cyan-300 mt-4 text-lg font-medium">Scanning in progress...</p>
                <div className="flex gap-2 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-cyan-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="bg-[#0f1724]/50 border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
              <FileSearch className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Upload & Parse</h3>
            <p className="text-gray-400">
              Upload logs, code, or configuration files. Our Data Agent parses and structures your data automatically.
            </p>
          </Card>

          <Card className="bg-[#0f1724]/50 border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Intent-Aware Analysis</h3>
            <p className="text-gray-400">
              AI agents understand context and intent, identifying threats with high confidence and minimal false positives.
            </p>
          </Card>

          <Card className="bg-[#0f1724]/50 border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Automated Reports</h3>
            <p className="text-gray-400">
              Get actionable reports with severity scoring, remediation steps, and exportable formats (CSV, JSON, PDF).
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-gray-400 mb-4">
            <Github className="w-5 h-5" />
            <span className="text-sm">Open Source Security. Built for Developers.</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
              View Dashboard
            </Link>
            <span>•</span>
            <a href="#docs" className="hover:text-cyan-400 transition-colors">
              Documentation
            </a>
            <span>•</span>
            <a href="#api" className="hover:text-cyan-400 transition-colors">
              API Reference
            </a>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-cyan-500/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-500" />
              <span className="text-sm text-gray-400">© 2024 SentinelForge. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-cyan-400 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-cyan-400 transition-colors">
                Terms
              </a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
