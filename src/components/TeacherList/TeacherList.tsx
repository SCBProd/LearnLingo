import type { Teacher } from "@/types/teacher";
import { TeacherCard } from "@/components/TeacherCard/TeacherCard";

import styles from "./TeacherList.module.css";

type Props = { teachers: Teacher[]; favoriteIds: string[]; onFavorite: (teacherId: string) => void };
export function TeacherList({ teachers, favoriteIds, onFavorite }: Props) {
  return <div className={styles.list}>{teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} isFavorite={favoriteIds.includes(teacher.id)} onFavorite={() => onFavorite(teacher.id)} />)}</div>;
}
