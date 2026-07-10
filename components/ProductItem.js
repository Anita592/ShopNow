import Link from 'next/link';
import React from 'react';
import useFavorites from '../hooks/useFavorites';
export default function ProductItem({ product, addToCartHandler }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((p) => p._id === product._id);
  const favoriteClickHandler = () => {
    if (isFavorite) {
      removeFavorite(product._id);
    } else {
      addFavorite(product);
    }
  };
  return (
    <div className="card relative">
      <button
        onClick={favoriteClickHandler}
        type="button"
        aria-label="Toggle favorite"
        className="absolute top-2 right-2 z-10 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:scale-110 transition"
      >
        {isFavorite ? (
          <span className="text-red-500 text-xl">♥</span>
        ) : (
          <span className="text-gray-400 text-xl">♡</span>
        )}
      </button>
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}