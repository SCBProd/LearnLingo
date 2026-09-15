"use client";
import { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import type { Teacher } from "@/types/teacher";
import styles from "./BookingForm.module.css";

type Props = { teacher: Teacher; onClose: () => void };
const reasons = ["Career and business", "Lesson for kids", "Living abroad", "Exams and coursework", "Culture, travel or hobby"];
export function BookingForm({ teacher, onClose }: Props) {
  const [isBooked, setIsBooked] = useState(false); const initials = `${teacher.name[0] ?? ""}${teacher.surname[0] ?? ""}`;
  return <Modal title="Book trial lesson" onClose={onClose} className={styles.modal}>{isBooked ? <div className={styles.success}><p>Thank you! Your trial lesson request has been sent.</p><button type="button" onClick={onClose}>Close</button></div> : <>
    <p className={styles.intro}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>
    <div className={styles.teacher}><div className={styles.avatar}>{teacher.avatar_url ? <img /* eslint-disable-line @next/next/no-img-element */ src={teacher.avatar_url} alt="" /> : initials}</div><div><span>Your teacher</span><strong>{teacher.name} {teacher.surname}</strong></div></div>
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setIsBooked(true); }}><fieldset><legend>What is your main reason for learning languages?</legend>{reasons.map((reason) => <label className={styles.radio} key={reason}><input type="radio" name="reason" value={reason} required /> <span>{reason}</span></label>)}</fieldset><label>Full name<input name="fullName" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label><button className={styles.submit} type="submit">Book</button></form>
  </>}</Modal>;
}
