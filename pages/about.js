import Layout from '../components/Layout';
export default function AboutScreen() {
  return (
    <Layout title="About">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-10 mb-10 text-center shadow-md">
          <h1 className="text-4xl font-bold mb-3">ShopNow</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your online store for quality clothing and accessories, at fair
            prices and with a simple, easy shopping experience.
          </p>
        </div>
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition">
            <div className="text-4xl mb-3"> </div>
            <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
            <p className="text-sm text-gray-600">
              Shirts, pants, and casual wear for men and women, carefully
              selected for quality.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition">
            <div className="text-4xl mb-3"> </div>
            <h3 className="font-semibold text-lg mb-2">Fast Checkout</h3>
            <p className="text-sm text-gray-600">
              Add items to your cart, sign in, and complete your order in
              just a few simple steps.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center hover:shadow-md transition">
            <div className="text-4xl mb-3"> </div>
            <h3 className="font-semibold text-lg mb-2">Support</h3>
            <p className="text-sm text-gray-600">
              Our team is ready to help with any question about products or
              orders through the Contact page.
            </p>
          </div>
        </div>
        {/* How it works section */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center font-bold">
                1
              </span>
              <p>Browse our products and find what you like.</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center font-bold">
                2
              </span>
              <p>Add items to your Cart, or save them to Favorites for later.</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center font-bold">
                3
              </span>
              <p>Create an account or sign in, and complete your order securely.</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center font-bold">
                4
              </span>
              <p>Track your order anytime directly from your profile.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

}