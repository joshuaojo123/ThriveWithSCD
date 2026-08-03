"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,77,255,0.2),_transparent_30%),linear-gradient(135deg,_#f8f6ff_0%,_#f3fff9_100%)] px-6 py-12 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-violet-700">Member access</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">Access your ThriveWithSCD account.</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Sign in to explore education, manage community activity, and support your health journey.
          </p>
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-md rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

          <button type="submit" className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200">
            Sign in
          </button>

          <p className="mt-4 text-sm text-slate-600">
            New here? <Link href="/signup" className="font-semibold text-violet-700">Create an account</Link>
          </p>
          <Link href="/" className="mt-2 inline-flex text-sm font-medium text-slate-600 hover:text-violet-700">
            Return home
          </Link>
        </form>
      </div>
    </div>
  );
}
