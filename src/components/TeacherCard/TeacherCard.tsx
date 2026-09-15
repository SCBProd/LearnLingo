"use client";

import { useState } from "react";

import type { Teacher } from "@/types/teacher";

import styles from "./TeacherCard.module.css";

type Props = { teacher: Teacher; isFavorite: boolean; onFavorite: () => void; onBook: () => void; activeLanguage: string; activeLevel: string; activePrice: string };

export function TeacherCard({ teacher, isFavorite, onFavorite, onBook, activeLanguage, activeLevel, activePrice }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initials = `${teacher.name[0] ?? ""}${teacher.surname[0] ?? ""}`;
  return <article className={styles.card}>
    <div className={styles.avatar} aria-label={`${teacher.name} ${teacher.surname}`}>{teacher.avatar_url ? <img /* eslint-disable-line @next/next/no-img-element */ src={teacher.avatar_url} alt="" /> : initials}</div>
    <div className={styles.teacherInfo}>
      <span className={styles.eyebrow}>Languages</span>
      <h2>{teacher.name} {teacher.surname}</h2>
      <p><span>Speaks:</span> {teacher.languages.map((language, index) => <b className={activeLanguage === language ? styles.selectedText : undefined} key={language}>{index > 0 && ", "}{language}</b>)}</p>
      <p><span>Lesson info:</span> {teacher.lesson_info}</p>
      <p><span>Conditions:</span> {teacher.conditions.join(" ")}</p>
      {isExpanded && <><p><span>Experience:</span> {teacher.experience}</p><div className={styles.reviews}>{teacher.reviews.map((review, index) => <p key={`${review.reviewer_name}-${index}`}><b>{review.reviewer_name}</b> · ★ {review.reviewer_rating}<br />{review.comment}</p>)}</div></>}
      <button className={styles.readMore} type="button" onClick={() => setIsExpanded((current) => !current)}>{isExpanded ? "Show less" : "Read more"}</button>
      {isExpanded && <button className={styles.bookButton} type="button" onClick={onBook}>Book trial lesson</button>}
      <ul className={styles.tags} aria-label="Teaching levels">{teacher.levels.map((level) => <li className={activeLevel === level ? styles.selectedTag : undefined} key={level}>#{level}</li>)}</ul>
    </div>
    <div className={styles.statistics}><span>▣ Lessons online</span><span>Lessons done: <b>{teacher.lessons_done}</b></span><span className={styles.rating}>★ Rating: <b>{teacher.rating}</b></span><span className={activePrice === String(teacher.price_per_hour) ? styles.selectedPrice : undefined}>Price / 1 hour: <b>{teacher.price_per_hour} $</b></span></div>
    <button className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ""}`} type="button" aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"} aria-pressed={isFavorite} onClick={onFavorite}>♥</button>
  </article>;
}
