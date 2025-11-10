'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { signupUser } from '@/lib/auth';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const success = signupUser(email, name, password);
      if (success) {
        toast.success('Account created successfully!');
        router.push('/dashboard');
      } else {
        toast.error('Email already exists');
      }
    } catch (error) {
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950/95">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 right-10 h-80 w-80 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute left-[-10%] top-[40%] h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[360px] w-[420px] rounded-full bg-purple-500/20 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-8 text-white lg:w-1/2"
        >
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-semibold">SentinelForge</p>
              <p className="text-xs text-slate-300">Autonomous security, engineered for velocity.</p>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-slate-200">
            <Sparkles className="h-4 w-4 text-primary" />
            Launch in under 10 minutes • SOC2 ready
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-snug">
              Spin up your workspace and let the agents handle the noise.
            </h1>
            <p className="max-w-lg text-slate-300">
              Create a SentinelForge account to coordinate ingest, intent detection, and reporting pipelines with zero manual overhead.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Unlimited agent runs", "Bring your own models", "Audit-ready exports", "Granular access policies"].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <span className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full lg:w-1/2"
        >
          <Card className="border border-white/10 bg-slate-900/70 p-8 shadow-[0_24px_80px_rgba(99,102,241,0.2)] backdrop-blur-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold text-white">Create your account</h2>
              <p className="mt-2 text-sm text-slate-400">Provision SentinelForge for your team</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jordan Security"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-slate-100 placeholder:text-slate-500 focus:border-primary/60 focus:bg-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Work email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-slate-100 placeholder:text-slate-500 focus:border-primary/60 focus:bg-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-slate-100 placeholder:text-slate-500 focus:border-primary/60 focus:bg-slate-900"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200">
                  Confirm password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-slate-100 placeholder:text-slate-500 focus:border-primary/60 focus:bg-slate-900"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-primary text-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.3)] hover:bg-primary/80"
              >
                {loading ? 'Provisioning...' : 'Create workspace'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              Already onboarded?{' '}
              <Link href="/auth/login" className="text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
