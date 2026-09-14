"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase";
import styles from "./page.module.css";

type Teacher = {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
};

const fallbackTeacher: Teacher = {
  id: "demo-jane-smith",
  name: "Jane",
  surname: "Smith",
  languages: ["German", "French"],
  levels: ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate"],
  rating: 4.8,
  reviews: [],
  price_per_hour: 30,
  lessons_done: 1098,
  avatar_url: "",
  lesson_info: "Lessons are structured to cover grammar, vocabulary, and practical usage of the language.",
  conditions: ["Welcomes both adult learners and teenagers (13 years and above).", "Provides personalized study plans."],
  experience: "",
};

const levels = ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([fallbackTeacher]);
  const [language, setLanguage] = useState("All");
  const [level, setLevel] = useState("All");
  const [price, setPrice] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    void getDocs(collection(db, "teachers"))
      .then((snapshot) => {
        const fetchedTeachers = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }) as Teacher);
        if (fetchedTeachers.length) setTeachers(fetchedTeachers);
      })
      .catch(() => undefined);
  }, []);

  const languageOptions = useMemo(() => ["All", ...Array.from(new Set(teachers.flatMap((item) => item.languages)))], [teachers]);
  const priceOptions = useMemo(() => ["All", ...Array.from(new Set(teachers.map((item) => String(item.price_per_hour))))], [teachers]);
  const filteredTeachers = teachers.filter((item) =>
    (language === "All" || item.languages.includes(language)) &&
    (level === "All" || item.levels.includes(level)) &&
    (price === "All" || item.price_per_hour === Number(price)),
  );

  return (
    <main className={styles.page}>
      <div className={`container ${styles.content}`}>
        <section className={styles.filters} aria-label="Teacher filters">
          <label><span>Languages</span><select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Languages">{languageOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Level of knowledge</span><select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Level of knowledge"><option>All</option>{levels.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Price</span><select value={price} onChange={(event) => setPrice(event.target.value)} aria-label="Price">{priceOptions.map((item) => <option key={item}>{item === "All" ? item : `${item} $`}</option>)}</select></label>
        </section>

        {filteredTeachers.map((item) => {
          const isFavorite = favorites.includes(item.id);
          return <article className={styles.card} key={item.id}>
            <div className={styles.avatar} style={item.avatar_url ? { backgroundImage: `url(${item.avatar_url})` } : undefined} aria-label={`${item.name} ${item.surname}`}>{item.avatar_url ? null : `${item.name[0]}${item.surname[0]}`}</div>
            <div className={styles.teacherInfo}>
              <span className={styles.eyebrow}>Languages</span><h1>{item.name} {item.surname}</h1>
              <p><span>Speaks:</span> <b>{item.languages.join(", ")}</b></p><p><span>Lesson info:</span> {item.lesson_info}</p><p><span>Conditions:</span> {item.conditions.join(" ")}</p>
              <button className={styles.readMore} type="button">Read more</button>
              <ul className={styles.tags} aria-label="Teaching levels">{item.levels.map((itemLevel, index) => <li className={index === 0 ? styles.primaryTag : undefined} key={itemLevel}>#{itemLevel}</li>)}</ul>
            </div>
            <div className={styles.statistics}><span>▣ Lessons online</span><span>Lessons done: <b>{item.lessons_done}</b></span><span className={styles.rating}>★ Rating: <b>{item.rating}</b></span><span>Price / 1 hour: <b>{item.price_per_hour} $</b></span></div>
            <button className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ""}`} type="button" aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"} onClick={() => setFavorites((items) => isFavorite ? items.filter((id) => id !== item.id) : [...items, item.id])}>♡</button>
          </article>;
        })}
        {!filteredTeachers.length && <p className={styles.emptyState}>No teachers match these filters.</p>}
      </div>
    </main>
  );
}
