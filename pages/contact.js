
import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
 
export default function ContactScreen() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
 
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };
 
  const submitHandler = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
 
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatus('error');
    }
  };
 
  return (
    <Layout title="Contact">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-10 mb-10 text-center shadow-md">
          <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have a question about a product or an order? Send us a message
            and our team will get back to you.
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-lg mb-2">Support</h3>
              <p className="text-sm text-gray-600">
                Questions about your order, shipping, or returns.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-lg mb-2">Response Time</h3>
              <p className="text-sm text-gray-600">
                We usually reply within 24 hours.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-lg mb-2">Business</h3>
              <p className="text-sm text-gray-600">
                Partnership or wholesale inquiries welcome.
              </p>
            </div>
          </div>
 
          {/* Contact form */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  placeholder="How can we help?"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
 
              <button
                type="submit"
                className="bg-amber-300 hover:bg-amber-400 transition text-black font-semibold px-6 py-3 rounded-lg"
              >
                Send Message
              </button>
 
              {status === 'success' && (
                <p className="text-green-600 font-medium">
                  Your message was sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
