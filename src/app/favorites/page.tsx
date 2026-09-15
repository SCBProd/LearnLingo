"use client";

import { useEffect, useState } from "react";

import { BookingForm } from "@/components/BookingForm/BookingForm";
import { TeacherList } from "@/components/TeacherList/TeacherList";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { getTeachersByIds } from "@/services/teachers.service";
import type { Teacher } from "@/types/teacher";

import styles from "./page.module.css";

export default function FavoritesPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { favoriteIds, toggleFavorite } = useFavorites(user?.uid);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingTeacher, setBookingTeacher] = useState<Teacher | null>(null);
  const idsKey = favoriteIds.join(",");

  useEffect(() => {
    if (!user) return;
    const start = window.setTimeout(() => {
      void getTeachersByIds(idsKey ? idsKey.split(",") : [])
        .then((nextTeachers) => { setTeachers(nextTeachers); setError(null); })
        .catch(() => setError("Could not load favourites. Please try again."))
        .finally(() => setIsLoading(false));
    }, 0);
    return () => window.clearTimeout(start);
  }, [idsKey, user]);

  if (isAuthLoading) return <main className={styles.page}><p className={styles.status}>Loading…</p></main>;
  if (!user) return <main className={styles.page}><div className={`container ${styles.content}`}><h1>Favorites</h1><p className={styles.status}>Sign in to view your favourite teachers.</p></div></main>;

  return <main className={styles.page}><div className={`container ${styles.content}`}>
    <h1>Favorites</h1>
    {error && <p className={styles.status} role="alert">{error}</p>}
    <TeacherList teachers={teachers} favoriteIds={favoriteIds} onFavorite={(teacherId) => void toggleFavorite(teacherId)} onBook={setBookingTeacher} activeLanguage="all" activeLevel="all" activePrice="all" />
    {isLoading && <p className={styles.status}>Loading favourites…</p>}
    {!isLoading && !error && teachers.length === 0 && <p className={styles.status}>You have not added any teachers to favourites yet.</p>}
  </div>{bookingTeacher && <BookingForm teacher={bookingTeacher} onClose={() => setBookingTeacher(null)} />}</main>;
}
