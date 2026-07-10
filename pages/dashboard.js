import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import useFavorites from "../hooks/useFavorites";

export default function DashboardScreen() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { favorites } = useFavorites();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <Layout title="Dashboard">
        <div className="min-h-[60vh] flex items-center justify-center">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-10 mb-10 text-center shadow-md">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session?.user?.name}
          </h1>
          <p className="text-gray-700">
            Here is a quick overview of your account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Profile</h3>
            <p className="text-sm text-gray-600 mb-4">
              View and update your personal information.
            </p>
            <a
              href="/profile"
              className="text-amber-600 font-medium hover:underline"
            >
              Go to Profile →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Order History</h3>
            <p className="text-sm text-gray-600 mb-4">
              Track and review your past orders.
            </p>
            <a
              href="/order-history"
              className="text-amber-600 font-medium hover:underline"
            >
              View Orders →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Favorites</h3>
            <p className="text-sm text-gray-600 mb-4">
              You have {favorites.length} saved item(s).
            </p>
            <a
              href="/favorites"
              className="text-amber-600 font-medium hover:underline"
            >
              View Favorites →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
