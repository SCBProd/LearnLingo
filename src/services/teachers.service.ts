import { get, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";

import { db } from "@/lib/firebase";

import { Teacher } from "@/types/teacher";

export type TeachersPage = {
  teachers: Teacher[];
  nextCursor: string | null;
};

type GetTeachersOptions = {
  cursor?: string | null;
  limit?: number;
};

/** Reads one ordered RTDB page. The cursor item is skipped on subsequent pages. */
export async function getTeachers({ cursor = null, limit = 4 }: GetTeachersOptions = {}): Promise<TeachersPage> {
  const teachersRef = ref(db, "teachers");
  const teachersQuery = cursor
    ? query(teachersRef, orderByKey(), startAt(cursor), limitToFirst(limit + 1))
    : query(teachersRef, orderByKey(), limitToFirst(limit));
  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return { teachers: [], nextCursor: null };
  }

  const data = snapshot.val();

  const teachers = Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, "id">),
  }));
  const page = cursor ? teachers.slice(1) : teachers;

  return {
    teachers: page,
    nextCursor: page.length === limit ? page.at(-1)?.id ?? null : null,
  };
}
