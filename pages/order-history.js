import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <Layout title="Order History">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-10 mb-10 text-center shadow-md">
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-gray-700">
            Track and review all of your past orders.
          </p>
        </div>
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border p-10 text-center text-gray-600">
            Loading...
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-10 text-center text-gray-600">
            You have no orders yet. Start shopping to see your orders here.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="px-5 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">DATE</th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">TOTAL</th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">PAID</th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      DELIVERED
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-semibold">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b bg-white even:bg-gray-50 hover:bg-amber-50 transition"
                    >
                      <td className="px-5 py-4">{order._id.substring(20, 24)}</td>
                      <td className="px-5 py-4">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-5 py-4 font-medium">
                        ${order.totalPrice}
                      </td>
                      <td className="px-5 py-4">
                        {order.isPaid ? (
                          <span className="text-green-600 font-medium">
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            not paid
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-medium">
                            {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            not delivered
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/order/${order._id}`}
                          passHref
                          className="text-amber-600 font-medium hover:underline"
                        >
                          Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;