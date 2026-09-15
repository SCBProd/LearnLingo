import { onValue, ref, remove, set } from "firebase/database";

import { db } from "@/lib/firebase";

export function subscribeToFavorites(userId: string, onChange: (teacherIds: string[]) => void) {
  return onValue(ref(db, `favorites/${userId}`), (snapshot) => {
    onChange(snapshot.exists() ? Object.keys(snapshot.val() as Record<string, true>) : []);
  });
}

export async function setFavorite(userId: string, teacherId: string, isFavorite: boolean) {
  const favoriteRef = ref(db, `favorites/${userId}/${teacherId}`);
  await (isFavorite ? set(favoriteRef, true) : remove(favoriteRef));
}
