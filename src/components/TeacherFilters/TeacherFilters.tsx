"use client";

import styles from "./TeacherFilters.module.css";

export type TeacherFiltersValue = { language: string; level: string; price: string; sort: string };
type Props = { value: TeacherFiltersValue; onChange: (value: TeacherFiltersValue) => void; languages: string[]; prices: number[]; levels: string[] };

export function TeacherFilters({ value, onChange, languages, prices, levels }: Props) {
  const update = (key: keyof TeacherFiltersValue, nextValue: string) => onChange({ ...value, [key]: nextValue });
  return <section className={styles.filters} aria-label="Teacher filters">
    <label><span>Languages</span><select value={value.language} onChange={(e) => update("language", e.target.value)}><option value="all">All</option>{languages.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label><span>Level of knowledge</span><select value={value.level} onChange={(e) => update("level", e.target.value)}><option value="all">All</option>{levels.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label><span>Price</span><select value={value.price} onChange={(e) => update("price", e.target.value)}><option value="all">All</option>{prices.map((item) => <option key={item} value={item}>{item} $</option>)}</select></label>
    <label><span>Sort by</span><select value={value.sort} onChange={(e) => update("sort", e.target.value)}><option value="default">Default</option><option value="rating-desc">Highest rating</option><option value="price-asc">Lowest price</option><option value="price-desc">Highest price</option><option value="lessons-desc">Most lessons</option></select></label>
  </section>;
}
