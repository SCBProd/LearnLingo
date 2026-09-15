"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { TeacherFilters, type TeacherFiltersValue } from "@/components/TeacherFilters/TeacherFilters";
import { TeacherList } from "@/components/TeacherList/TeacherList";
import { LANGUAGE_OPTIONS, LEVEL_OPTIONS } from "@/constants/filters";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useTeachers } from "@/hooks/useTeachers";
import styles from "./page.module.css";

const initialFilters: TeacherFiltersValue = { language: "all", level: "all", price: "all", sort: "default" };
export default function TeachersPage() {
  const [filters, setFilters] = useState(initialFilters); const [showAuthNotice, setShowAuthNotice] = useState(false); const { user } = useAuth(); const { favoriteIds, toggleFavorite } = useFavorites(user?.uid); const sentinelRef = useRef<HTMLDivElement | null>(null);
  const queryFilters = useMemo(() => ({ language: filters.language, level: filters.level, price: filters.price, sort: "default" }), [filters.language, filters.level, filters.price]);
  const { teachers, isLoading, error, hasMore, loadMore } = useTeachers(queryFilters);
  const languages = useMemo(() => Array.from(new Set([...LANGUAGE_OPTIONS, ...teachers.flatMap((teacher) => teacher.languages)])).sort(), [teachers]);
  const prices = useMemo(() => Array.from(new Set(teachers.map((teacher) => teacher.price_per_hour))).sort((a, b) => a - b), [teachers]);
  const sortedTeachers = useMemo(() => [...teachers].sort((a, b) => filters.sort === "rating-desc" ? b.rating - a.rating : filters.sort === "price-asc" ? a.price_per_hour - b.price_per_hour : filters.sort === "price-desc" ? b.price_per_hour - a.price_per_hour : filters.sort === "lessons-desc" ? b.lessons_done - a.lessons_done : 0), [filters.sort, teachers]);
  useEffect(() => { const sentinel = sentinelRef.current; if (!sentinel || !hasMore || isLoading) return; const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && void loadMore(), { rootMargin: "240px" }); observer.observe(sentinel); return () => observer.disconnect(); }, [hasMore, isLoading, loadMore]);
  const handleFavorite = useCallback((teacherId: string) => { if (!user) { setShowAuthNotice(true); return; } void toggleFavorite(teacherId); }, [toggleFavorite, user]);
  return <main className={styles.page}><div className={`container ${styles.content}`}>
    <TeacherFilters value={filters} onChange={setFilters} languages={languages} prices={prices} levels={LEVEL_OPTIONS} />
    {error && <div className={styles.message} role="alert">{error} <button type="button" onClick={() => void loadMore()}>Try again</button></div>}
    <TeacherList teachers={sortedTeachers} favoriteIds={favoriteIds} onFavorite={handleFavorite} />
    {isLoading && <p className={styles.status} aria-live="polite">Loading teachers…</p>}
    {!isLoading && !error && teachers.length === 0 && <p className={styles.status}>No teachers match these filters.</p>}
    {!isLoading && !error && teachers.length > 0 && !hasMore && <p className={styles.status}>There are no more teachers to load.</p>}
    <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
  </div>{showAuthNotice && <Modal title="Sign in to add favourites" onClose={() => setShowAuthNotice(false)}><p>Adding teachers to favourites is available only for authorised users.</p></Modal>}</main>;
}
