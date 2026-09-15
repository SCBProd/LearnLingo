"use client";

import { useEffect, type ReactNode } from "react";

import styles from "./Modal.module.css";

type ModalProps = { title: string; children: ReactNode; onClose: () => void };

export function Modal({ title, children, onClose }: ModalProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
    <section className={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
      <button className={styles.close} type="button" onClick={onClose} aria-label="Close">×</button>
      <h2>{title}</h2>
      {children}
    </section>
  </div>;
}
