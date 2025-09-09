"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IntakeSubmissionSchema, IntakeSubmission } from "@starter/shared";
import { postJSON } from "@/lib/api";
import clsx from "clsx";

const schema = IntakeSubmissionSchema;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IntakeSubmission>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", dateOfBirth: "", symptoms: "", consent: false },
  });

  const onSubmit = async (data: IntakeSubmission) => {
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!base) throw new Error("API base URL is not set");
      await postJSON<{ status: string }>(`${base}/submit`, data);
      alert("Thank you — submission received.");
      reset();
    } catch (err: unknown) {
      console.error(err);
      alert(`Submission failed: ${err ?? "Unknown error"}`);
    }
  };

  // shared styles
  const labelCls = "block text-sm font-medium text-foreground/80";
  const inputBase =
    "mt-1 w-full rounded-xl border border-foreground/10 bg-background/80 px-3 py-2 shadow-sm outline-none " +
    "focus:border-transparent focus:ring-2 focus:ring-blue-500 transition";
  const errorText = "mt-1 text-sm text-red-600";
  const section = "space-y-1.5";

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#60a5fa15,transparent),radial-gradient(900px_500px_at_100%_0%,#22d3ee10,transparent)]">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-foreground/10 bg-background/80 p-6 shadow-2xl backdrop-blur">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Patient Intake</h1>
            <p className="mt-1 text-sm text-foreground/70">
              Please provide your details. We’ll keep your information private and secure.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full name */}
            <div className={section}>
              <label htmlFor="fullName" className={labelCls}>
                Full name
              </label>
              <input
                id="fullName"
                className={clsx(inputBase, errors.fullName && "ring-2 ring-red-500")}
                aria-invalid={!!errors.fullName || undefined}
                {...register("fullName")}
                placeholder="Jane Doe"
                autoComplete="name"
              />
              {errors.fullName && <p className={errorText}>{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className={section}>
              <label htmlFor="email" className={labelCls}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={clsx(inputBase, errors.email && "ring-2 ring-red-500")}
                aria-invalid={!!errors.email || undefined}
                {...register("email")}
                placeholder="jane@example.com"
                autoComplete="email"
              />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>

            {/* DOB */}
            <div className={section}>
              <label htmlFor="dob" className={labelCls}>
                Date of birth
              </label>
              <input
                id="dob"
                type="date"
                className={clsx(inputBase, errors.dateOfBirth && "ring-2 ring-red-500")}
                aria-invalid={!!errors.dateOfBirth || undefined}
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && <p className={errorText}>{errors.dateOfBirth.message}</p>}
            </div>

            {/* Symptoms */}
            <div className={section}>
              <label htmlFor="symptoms" className={labelCls}>
                Symptoms
              </label>
              <textarea
                id="symptoms"
                rows={4}
                className={clsx(inputBase, "resize-y", errors.symptoms && "ring-2 ring-red-500")}
                aria-invalid={!!errors.symptoms || undefined}
                {...register("symptoms")}
                placeholder="Describe what you’re experiencing…"
              />
              {errors.symptoms && <p className={errorText}>{errors.symptoms.message}</p>}
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2 rounded-xl border border-foreground/10 bg-background/80 p-3">
              <input
                id="consent"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-foreground/30 text-blue-600 focus:ring-blue-500"
                {...register("consent")}
              />
              <label htmlFor="consent" className="text-sm text-foreground/90">
                I consent to the processing of my information for the purpose of this intake.
              </label>
            </div>
            {errors.consent && <p className={errorText}>{errors.consent.message}</p>}

            {/* Actions */}
            <div className="pt-2">
              <button
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-blue-600/20 transition enabled:hover:bg-blue-700 enabled:active:scale-[.99] disabled:opacity-50"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
              <p className="mt-3 text-center text-xs text-foreground/60">
                Your data is transmitted securely. You can update or remove it at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
