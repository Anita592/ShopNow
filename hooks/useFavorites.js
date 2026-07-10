import { useState, useEffect } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const addFavorite = (product) => {
    const updated = [...favorites, product];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (productId) => {
    const updated = favorites.filter((p) => p._id !== productId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
}
