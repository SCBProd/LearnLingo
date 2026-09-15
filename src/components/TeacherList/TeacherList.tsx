import type { Teacher } from "@/types/teacher";
import { TeacherCard } from "@/components/TeacherCard/TeacherCard";

import styles from "./TeacherList.module.css";

type Props = { teachers: Teacher[]; favoriteIds: string[]; onFavorite: (teacherId: string) => void; onBook: (teacher: Teacher) => void; activeLanguage: string; activeLevel: string; activePrice: string };
export function TeacherList({ teachers, favoriteIds, onFavorite, onBook, activeLanguage, activeLevel, activePrice }: Props) {
  return <div className={styles.list}>{teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} isFavorite={favoriteIds.includes(teacher.id)} onFavorite={() => onFavorite(teacher.id)} onBook={() => onBook(teacher)} activeLanguage={activeLanguage} activeLevel={activeLevel} activePrice={activePrice} />)}</div>;
}
