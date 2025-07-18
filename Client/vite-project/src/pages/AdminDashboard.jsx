import { useState, useEffect } from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUsers,
  FiShoppingCart,
  FiTrendingUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPages: 0,
    activeUsers: 0,
    avgPagesPerUser: 0,
  });
  const [checkoutPages, setCheckoutPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE = "http://localhost:7002/admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [statsRes, pagesRes] = await Promise.all([
          fetch(`${API_BASE}/`, { headers }),
          fetch(`${API_BASE}/`, { headers }),
        ]);

        const [statsData, pagesData] = await Promise.all([
          statsRes.json(),
          pagesRes.json(),
        ]);

        setStats({
          totalPages: statsData.totalPages || pagesData.length || 0,
          activeUsers: statsData.activeUsers || "A",
          avgPagesPerUser: statsData.avgPagesPerUser || 1.0,
        });

        setCheckoutPages(pagesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/checkout-pages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCheckoutPages(checkoutPages.filter((page) => page._id !== id));

        setStats((prev) => ({
          ...prev,
          totalPages: prev.totalPages - 1,
          avgPagesPerUser:
            prev.totalPages > 1
              ? (
                  (prev.totalPages - 1) /
                  (typeof prev.activeUsers === "number" ? prev.activeUsers : 1)
                ).toFixed(1)
              : 0,
        }));
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 mt-2">
            Manage all checkout pages and user data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FiShoppingCart className="text-blue-600 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Pages</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalPages}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FiUsers className="text-green-600 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Active Users
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stats.activeUsers}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FiTrendingUp className="text-purple-600 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Avg. Pages per User
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {stats.avgPagesPerUser}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              All Checkout Pages
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              onClick={() => navigate("/admin/checkout/new")}
            >
              <FiPlus className="mr-2" />
              New Page
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Primary Color
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form Fields
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {checkoutPages.map((page) => (
                  <tr key={page._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {page.title || "Untitled Page"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {page.owner || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="h-4 w-4 rounded-full mr-2 border border-gray-300"
                          style={{
                            backgroundColor: page.colors?.primary || "#4f46e5",
                          }}
                        ></div>
                        <span className="text-sm text-gray-500">
                          {page.colors?.primary || "#4f46e5"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {Object.entries(page.formFields || {})
                          .filter(([_, value]) => value)
                          .map(([field]) => field)
                          .join(", ") || "No fields"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
