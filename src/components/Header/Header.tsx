"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthModal, type AuthMode } from "@/components/AuthModal/AuthModal";

import styles from "./Header.module.css";

export function Header() {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.content}`}>
          <Link className={styles.logo} href="/" aria-label="LearnLingo home">
            <span className={styles.logoMark} aria-hidden="true" />
            LearnLingo
          </Link>

          <nav className={styles.navigation} aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/teachers">Teachers</Link>
          </nav>

          <div className={styles.authActions}>
            <button className={styles.loginButton} type="button" onClick={() => setAuthMode("login")}>
              <svg aria-hidden="true" className={styles.loginIcon} fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 3.75H15a1.25 1.25 0 0 1 1.25 1.25v10A1.25 1.25 0 0 1 15 16.25h-3.75" />
                <path d="M9.167 6.667 12.5 10l-3.333 3.333M12.083 10H3.75" />
              </svg>
              Log in
            </button>
            <button className={styles.registrationButton} type="button" onClick={() => setAuthMode("register")}>
              Registration
            </button>
          </div>
        </div>
      </header>
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} />
    </>
  );
}
