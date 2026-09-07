"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setStatus("error");
        setError(body.error || "Incorrect email or password.");
        return;
      }
      const from = searchParams.get("from");
      router.replace(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Something went wrong — please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass-light w-full max-w-sm rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-lift)]">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Admin Login</h1>
      <p className="mt-1.5 text-[15px] text-[var(--color-text-muted)]">Manoj Tours and Travels</p>

      <label className="mt-7 block">
        <span className="mb-1.5 block text-[13px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Email
        </span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/70 px-3.5 py-2.5 text-[16px] text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[13px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Password
        </span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/70 px-3.5 py-2.5 text-[16px] text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
        />
      </label>

      {status === "error" && (
        <p className="animate-fade-in mt-4 text-[14px] text-[var(--color-danger)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-3 text-[16px] font-semibold text-[var(--color-text-on-dark)] transition-colors hover:bg-[var(--color-ink-2)] disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
