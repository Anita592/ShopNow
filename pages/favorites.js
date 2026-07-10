import Layout from '../components/Layout';
import useFavorites from '../hooks/useFavorites';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Layout title="Favorites">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-10 mb-10 text-center shadow-md">
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-gray-700">Products you have saved for later.</p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-10 text-center text-gray-600">
            You have no saved products yet. Browse the shop and add items you like to your favorites.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow-sm border p-4 text-center hover:shadow-md transition">
                <p className="font-semibold mb-2">{p.name}</p>
                <button onClick={() => removeFavorite(p._id)} className="text-red-500 text-sm font-medium hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}