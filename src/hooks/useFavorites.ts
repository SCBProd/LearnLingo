"use client";

import { useEffect, useState } from "react";

import { setFavorite, subscribeToFavorites } from "@/services/favorites.service";

export function useFavorites(userId: string | undefined) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) {
      const reset = window.setTimeout(() => setFavoriteIds([]), 0);
      return () => window.clearTimeout(reset);
    }
    return subscribeToFavorites(userId, setFavoriteIds);
  }, [userId]);

  const toggleFavorite = async (teacherId: string) => {
    if (!userId) return;
    await setFavorite(userId, teacherId, !favoriteIds.includes(teacherId));
  };

  return { favoriteIds, toggleFavorite };
}
