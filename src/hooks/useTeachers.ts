"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Teacher } from "@/types/teacher";
import { getTeachers } from "@/services/teachers.service";
import type { TeacherFiltersValue } from "@/components/TeacherFilters/TeacherFilters";

const PAGE_SIZE = 4;
const matches = (teacher: Teacher, filters: TeacherFiltersValue) => (filters.language === "all" || teacher.languages.includes(filters.language)) && (filters.level === "all" || teacher.levels.includes(filters.level)) && (filters.price === "all" || teacher.price_per_hour === Number(filters.price));

export function useTeachers(filters: TeacherFiltersValue) {
  const [teachers, setTeachers] = useState<Teacher[]>([]); const [hasMore, setHasMore] = useState(true); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const cursor = useRef<string | null>(null); const more = useRef(true); const loading = useRef(false);
  const loadMore = useCallback(async (reset = false) => {
    if (loading.current || (!reset && !more.current)) return;
    loading.current = true; setIsLoading(true); setError(null);
    try {
      let nextCursor = reset ? null : cursor.current; let nextHasMore = true; const found: Teacher[] = [];
      while (nextHasMore && found.length < PAGE_SIZE) { const page = await getTeachers({ cursor: nextCursor, limit: PAGE_SIZE }); found.push(...page.teachers.filter((teacher) => matches(teacher, filters))); nextCursor = page.nextCursor; nextHasMore = page.nextCursor !== null; }
      cursor.current = nextCursor; more.current = nextHasMore; setHasMore(nextHasMore); setTeachers((current) => reset ? found.slice(0, PAGE_SIZE) : [...current, ...found.slice(0, PAGE_SIZE)]);
    } catch { setError("Could not load teachers. Please try again."); }
    finally { loading.current = false; setIsLoading(false); }
  }, [filters]);
  useEffect(() => { const start = window.setTimeout(() => void loadMore(true), 0); return () => window.clearTimeout(start); }, [loadMore]);
  return { teachers, isLoading, error, hasMore, loadMore };
}
