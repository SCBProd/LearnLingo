"use client";

import { useEffect, useId, useState } from "react";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "@/lib/firebase";
import styles from "./AuthModal.module.css";

export type AuthMode = "login" | "register";

type AuthModalProps = {
  mode: AuthMode | null;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
  const titleId = useId();
  const isRegistration = mode === "register";
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!mode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode, onClose]);

  if (!mode) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();

    setError(null);
    setIsSubmitting(true);

    try {
      if (isRegistration) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(credential.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (caughtError) {
      if (caughtError instanceof FirebaseError) {
        const messages: Record<string, string> = {
          "auth/email-already-in-use": "An account with this email already exists.",
          "auth/invalid-credential": "Incorrect email or password.",
          "auth/invalid-email": "Enter a valid email address.",
          "auth/operation-not-allowed": "Email and password sign-in is not enabled for this project.",
          "auth/weak-password": "Password must contain at least 6 characters.",
        };
        setError(messages[caughtError.code] ?? "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close modal">×</button>
        <h2 id={titleId}>{isRegistration ? "Registration" : "Log in"}</h2>
        <p>{isRegistration ? "Create an account to save your favourite teachers and bookings." : "Welcome back! Enter your details to continue."}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegistration && <label>Name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>}
          <label>Email<input name="email" type="email" placeholder="Email" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" placeholder="Password" autoComplete={isRegistration ? "new-password" : "current-password"} minLength={isRegistration ? 6 : undefined} required /></label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait…" : isRegistration ? "Sign up" : "Log in"}</button>
        </form>

        <p className={styles.switchText}>
          {isRegistration ? "Already have an account?" : "Don't have an account?"}{" "}
          <button type="button" onClick={() => onModeChange(isRegistration ? "login" : "register")}>
            {isRegistration ? "Log in" : "Registration"}
          </button>
        </p>
      </section>
    </div>
  );
}
