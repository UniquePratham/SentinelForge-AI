'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface AuroraLoaderProps {
    label?: string;
    hint?: string;
}

export function AuroraLoader({ label = 'Loading SentinelForge', hint }: AuroraLoaderProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
            <motion.div
                className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[160px]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.85, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <motion.div
                className="absolute -bottom-40 right-[-10%] h-[380px] w-[420px] rounded-full bg-emerald-500/20 blur-[160px]"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-white/10 bg-slate-900/70 px-12 py-12 text-center shadow-[0_24px_80px_rgba(34,211,238,0.25)] backdrop-blur-2xl"
            >
                <div className="relative h-20 w-20">
                    <motion.span
                        className="absolute inset-0 rounded-3xl border border-primary/40"
                        initial={{ rotate: 0, opacity: 0.6 }}
                        animate={{ rotate: 360, opacity: [0.6, 0.3, 0.6] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.span
                        className="absolute inset-3 rounded-2xl border border-primary/30"
                        initial={{ rotate: 0, opacity: 0.8 }}
                        animate={{ rotate: -360, opacity: [0.8, 0.4, 0.8] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute inset-6 grid place-items-center rounded-xl bg-primary/15 text-primary"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Shield className="h-8 w-8" />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <p className="text-lg font-semibold text-white">{label}</p>
                    <p className="text-sm text-slate-300">
                        {hint ?? 'Orchestrating autonomous responders and calibrating heuristics...'}
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3">
                    <div className="relative h-2 w-full rounded-full bg-white/5">
                        <motion.span
                            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary via-emerald-400 to-primary"
                            initial={{ width: '10%' }}
                            animate={{ width: ['10%', '80%', '30%', '100%'] }}
                            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                        <motion.span
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.span
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                        />
                        <motion.span
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        />
                        <span>Syncing agent telemetry</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
