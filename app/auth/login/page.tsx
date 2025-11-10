'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { loginUser } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = loginUser(email, password);
      if (user) {
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // demo login removed

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950/90">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[360px] w-[420px] rounded-full bg-blue-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-10 text-white lg:w-1/2"
        >
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-semibold">SentinelForge</p>
              <p className="text-xs text-slate-300">AI-Powered Defense Fabric</p>
            </div>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-snug">
              Welcome back. Your security command center is waiting.
            </h1>
            <p className="max-w-lg text-slate-300">
              Log in to orchestrate autonomous threat detection, review agent insights, and ship secure releases without slowing down delivery.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Unified agent timeline", "Audit-ready activity log", "SOC2 compliant infrastructure", "24/7 anomaly alerts"].map((item) => (
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
          <Card className="border border-white/10 bg-slate-900/70 p-8 shadow-[0_24px_80px_rgba(34,211,238,0.2)] backdrop-blur-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold text-white">Sign in</h2>
              <p className="mt-2 text-sm text-slate-400">Securely access your SentinelForge workspace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="investigator@sentinelforge.ai"
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Verifying...' : 'Access dashboard'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="mt-8 space-y-4 text-center text-sm text-slate-400">
              <p>
                Need an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:text-primary/80">
                  Create workspace
                </Link>
              </p>
              <p>
                Trouble signing in? <a className="text-slate-200 hover:text-primary" href="mailto:support@sentinelforge.ai">Contact support</a>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
