// import { useState, useEffect } from "react";
// import {
//   FiEye,
//   FiEdit2,
//   FiTrash2,
//   FiPlus,
//   FiUsers,
//   FiShoppingCart,
//   FiTrendingUp,
//   FiX,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiChevronLeft,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalPages: 0,
//     activeUsers: 0,
//     avgPagesPerUser: 0,
//   });
//   const [checkoutPages, setCheckoutPages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [previewPage, setPreviewPage] = useState(null);
//   const [pageToDelete, setPageToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     productname: "",
//     productprice: "",
//     buttonText: "Buy Now",
//     colors: {
//       primary: "#4f46e5",
//       secondary: "#ffffff",
//     },
//     font: "Arial",
//     formFields: {
//       name: true,
//       email: true,
//       phone: true,
//       address: false,
//     },
//     utmParameters: {
//       source: "",
//       medium: "",
//       campaign: "",
//       term: "",
//       content: "",
//     },
//   });
//   const [notification, setNotification] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });
//   const navigate = useNavigate();

//   const API_BASE = "https://task-dashbaord.onrender.com/admin";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const headers = {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         };

//         const [statsRes, pagesRes] = await Promise.all([
//           fetch(`${API_BASE}/`, { headers }),
//           fetch(`${API_BASE}/`, { headers }),
//         ]);

//         const [statsData, pagesData] = await Promise.all([
//           statsRes.json(),
//           pagesRes.json(),
//         ]);

//         setStats({
//           totalPages: statsData.totalPages || pagesData.length || 0,
//           activeUsers: statsData.activeUsers || "A",
//           avgPagesPerUser: statsData.avgPagesPerUser || 1.0,
//         });

//         setCheckoutPages(pagesData || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         showNotification("Failed to load data", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const showNotification = (message, type = "success") => {
//     setNotification({
//       show: true,
//       message,
//       type,
//     });
//     setTimeout(() => {
//       setNotification({
//         show: false,
//         message: "",
//         type: "success",
//       });
//     }, 3000);
//   };

//   const handleEditClick = (page) => {
//     setCurrentPage(page);
//     setFormData({
//       title: page.title || "",
//       productname: page.productname || "",
//       productprice: page.productprice || "",
//       buttonText: page.buttonText || "Buy Now",
//       colors: {
//         primary: page.colors?.primary || "#4f46e5",
//         secondary: page.colors?.secondary || "#ffffff",
//       },
//       font: page.font || "Arial",
//       formFields: page.formFields || {
//         name: true,
//         email: true,
//         phone: true,
//         address: false,
//       },
//       utmParameters: page.utmParameters || {
//         source: "",
//         medium: "",
//         campaign: "",
//         term: "",
//         content: "",
//       },
//     });
//     setShowEditModal(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else if (name.startsWith("formFields.")) {
//       const fieldName = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         formFields: {
//           ...prev.formFields,
//           [fieldName]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handlePreview = (page) => {
//     setPreviewPage(page);
//     setShowPreviewModal(true);
//   };

//   const confirmDelete = (id) => {
//     setPageToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleDelete = async () => {
//     if (!pageToDelete) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${API_BASE}/checkout/${pageToDelete}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         setCheckoutPages(
//           checkoutPages.filter((page) => page._id !== pageToDelete)
//         );
//         setStats((prev) => ({
//           ...prev,
//           totalPages: prev.totalPages - 1,
//           avgPagesPerUser:
//             prev.totalPages > 1
//               ? (
//                   (prev.totalPages - 1) /
//                   (typeof prev.activeUsers === "number" ? prev.activeUsers : 1)
//                 ).toFixed(1)
//               : 0,
//         }));
//         showNotification("Page deleted successfully");
//       } else {
//         throw new Error("Failed to delete page");
//       }
//     } catch (error) {
//       console.error("Error deleting page:", error);
//       showNotification("Failed to delete page", "error");
//     } finally {
//       setShowDeleteModal(false);
//       setPageToDelete(null);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!currentPage?._id) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${API_BASE}/checkout/${currentPage._id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: formData.title,
//           productname: formData.productname,
//           productprice: formData.productprice,
//           buttonText: formData.buttonText,
//           colors: formData.colors,
//           font: formData.font,
//           formFields: formData.formFields,
//           utmParameters: formData.utmParameters,
//         }),
//       });

//       if (response.ok) {
//         const updatedPage = await response.json();
//         setCheckoutPages(
//           checkoutPages.map((page) =>
//             page._id === currentPage._id ? updatedPage : page
//           )
//         );
//         setShowEditModal(false);
//         showNotification("Page updated successfully");
//       } else {
//         throw new Error("Failed to update page");
//       }
//     } catch (error) {
//       console.error("Error updating page:", error);
//       showNotification("Failed to update page", "error");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 relative">
//       {/* Notification */}
//       {notification.show && (
//         <div
//           className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-lg ${
//             notification.type === "success"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {notification.type === "success" ? (
//             <FiCheckCircle className="mr-2" />
//           ) : (
//             <FiAlertCircle className="mr-2" />
//           )}
//           <span>{notification.message}</span>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Confirm Deletion
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this checkout page? This action
//               cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Preview Modal */}
//       {showPreviewModal && previewPage && (
//         <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <button
//                 onClick={() => setShowPreviewModal(false)}
//                 className="flex items-center text-gray-500 hover:text-gray-700"
//               >
//                 <FiChevronLeft className="mr-1" />
//                 Back to Dashboard
//               </button>
//               <h3 className="text-lg font-medium text-gray-900">
//                 {previewPage.title || "Checkout Page Preview"}
//               </h3>
//               <div className="w-6"></div> {/* Spacer for alignment */}
//             </div>

//             <div
//               className="border rounded-lg p-6 mx-auto"
//               style={{
//                 backgroundColor: previewPage.colors?.secondary || "#ffffff",
//                 fontFamily: previewPage.font || "Arial",
//                 maxWidth: "500px",
//               }}
//             >
//               <h1
//                 className="text-2xl font-bold mb-4"
//                 style={{ color: previewPage.colors?.primary || "#4f46e5" }}
//               >
//                 {previewPage.title || "Checkout Page"}
//               </h1>

//               <h2 className="text-xl font-semibold mb-2">
//                 {previewPage.productname || "Product Name"}
//               </h2>
//               <p className="text-lg mb-4">
//                 ${previewPage.productprice || "0.00"}
//               </p>

//               <div className="space-y-4">
//                 {previewPage.formFields?.name && (
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="p-2 w-full border rounded-md"
//                     style={{
//                       borderColor: previewPage.colors?.primary || "#4f46e5",
//                     }}
//                   />
//                 )}

//                 {previewPage.formFields?.email && (
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="p-2 w-full border rounded-md"
//                     style={{
//                       borderColor: previewPage.colors?.primary || "#4f46e5",
//                     }}
//                   />
//                 )}

//                 {previewPage.formFields?.phone && (
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="p-2 w-full border rounded-md"
//                     style={{
//                       borderColor: previewPage.colors?.primary || "#4f46e5",
//                     }}
//                   />
//                 )}

//                 {previewPage.formFields?.address && (
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="p-2 w-full border rounded-md"
//                     style={{
//                       borderColor: previewPage.colors?.primary || "#4f46e5",
//                     }}
//                   />
//                 )}

//                 <button
//                   className="w-full p-3 rounded-md text-white font-medium"
//                   style={{
//                     backgroundColor: previewPage.colors?.primary || "#4f46e5",
//                   }}
//                 >
//                   {previewPage.buttonText || "Buy Now"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && currentPage && (
//         <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Edit Checkout Page
//               </h3>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FiX size={20} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Basic Information */}
//               <div className="space-y-4">
//                 <h4 className="font-medium text-gray-700 border-b pb-2">
//                   Basic Information
//                 </h4>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Page Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     name="productname"
//                     value={formData.productname}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Price
//                   </label>
//                   <input
//                     type="number"
//                     name="productprice"
//                     value={formData.productprice}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Button Text
//                   </label>
//                   <input
//                     type="text"
//                     name="buttonText"
//                     value={formData.buttonText}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>

//               {/* Design Settings */}
//               <div className="space-y-4">
//                 <h4 className="font-medium text-gray-700 border-b pb-2">
//                   Design Settings
//                 </h4>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Primary Color
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type="color"
//                       name="colors.primary"
//                       value={formData.colors?.primary || "#4f46e5"}
//                       onChange={handleFormChange}
//                       className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
//                     />
//                     <span className="ml-2 text-sm text-gray-600">
//                       {formData.colors?.primary || "#4f46e5"}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Secondary Color
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type="color"
//                       name="colors.secondary"
//                       value={formData.colors?.secondary || "#ffffff"}
//                       onChange={handleFormChange}
//                       className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
//                     />
//                     <span className="ml-2 text-sm text-gray-600">
//                       {formData.colors?.secondary || "#ffffff"}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Font
//                   </label>
//                   <select
//                     name="font"
//                     value={formData.font || "Arial"}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="Arial">Arial</option>
//                     <option value="Helvetica">Helvetica</option>
//                     <option value="Times New Roman">Times New Roman</option>
//                     <option value="Courier New">Courier New</option>
//                     <option value="Georgia">Georgia</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Form Fields */}
//               <div className="space-y-4">
//                 <h4 className="font-medium text-gray-700 border-b pb-2">
//                   Form Fields
//                 </h4>
//                 <div className="space-y-2">
//                   {Object.entries(formData.formFields || {}).map(
//                     ([field, enabled]) => (
//                       <div key={field} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`field-${field}`}
//                           name={`formFields.${field}`}
//                           checked={enabled}
//                           onChange={handleFormChange}
//                           className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                         />
//                         <label
//                           htmlFor={`field-${field}`}
//                           className="ml-2 block text-sm text-gray-700 capitalize"
//                         >
//                           {field}
//                         </label>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>

//               {/* UTM Parameters */}
//               <div className="space-y-4">
//                 <h4 className="font-medium text-gray-700 border-b pb-2">
//                   UTM Parameters
//                 </h4>
//                 <div className="space-y-2">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Source
//                     </label>
//                     <input
//                       type="text"
//                       name="utmParameters.source"
//                       value={formData.utmParameters?.source || ""}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Medium
//                     </label>
//                     <input
//                       type="text"
//                       name="utmParameters.medium"
//                       value={formData.utmParameters?.medium || ""}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Campaign
//                     </label>
//                     <input
//                       type="text"
//                       name="utmParameters.campaign"
//                       value={formData.utmParameters?.campaign || ""}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Term
//                     </label>
//                     <input
//                       type="text"
//                       name="utmParameters.term"
//                       value={formData.utmParameters?.term || ""}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Content
//                     </label>
//                     <input
//                       type="text"
//                       name="utmParameters.content"
//                       value={formData.utmParameters?.content || ""}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
//           <p className="text-gray-600 mt-2">
//             Manage all checkout pages and user data.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow flex items-start">
//             <div className="bg-blue-100 p-3 rounded-full mr-4">
//               <FiShoppingCart className="text-blue-600 h-6 w-6" />
//             </div>
//             <div>
//               <h3 className="text-gray-500 text-sm font-medium">Total Pages</h3>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {stats.totalPages}
//               </p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow flex items-start">
//             <div className="bg-green-100 p-3 rounded-full mr-4">
//               <FiUsers className="text-green-600 h-6 w-6" />
//             </div>
//             <div>
//               <h3 className="text-gray-500 text-sm font-medium">
//                 Active Users
//               </h3>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {stats.activeUsers}
//               </p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow flex items-start">
//             <div className="bg-purple-100 p-3 rounded-full mr-4">
//               <FiTrendingUp className="text-purple-600 h-6 w-6" />
//             </div>
//             <div>
//               <h3 className="text-gray-500 text-sm font-medium">
//                 Avg. Pages per User
//               </h3>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 {stats.avgPagesPerUser}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-lg font-medium text-gray-800">
//               All Checkout Pages
//             </h2>
//             <button
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
//               onClick={() => navigate("/admin/checkout/new")}
//             >
//               <FiPlus className="mr-2" />
//               New Page
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Title
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Owner
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Primary Color
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Form Fields
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Created
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {checkoutPages.map((page) => (
//                   <tr key={page._id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {page.title || "Untitled Page"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {page.owner || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div
//                           className="h-4 w-4 rounded-full mr-2 border border-gray-300"
//                           style={{
//                             backgroundColor: page.colors?.primary || "#4f46e5",
//                           }}
//                         ></div>
//                         <span className="text-sm text-gray-500">
//                           {page.colors?.primary || "#4f46e5"}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {Object.entries(page.formFields || {})
//                           .filter(([_, value]) => value)
//                           .map(([field]) => field)
//                           .join(", ") || "No fields"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(page.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handlePreview(page)}
//                           className="text-blue-600 hover:text-blue-900 p-1"
//                           title="Preview"
//                         >
//                           <FiEye />
//                         </button>
//                         <button
//                           onClick={() => handleEditClick(page)}
//                           className="text-green-600 hover:text-green-900 p-1"
//                           title="Edit"
//                         >
//                           <FiEdit2 />
//                         </button>
//                         <button
//                           onClick={() => confirmDelete(page._id)}
//                           className="text-red-600 hover:text-red-900 p-1"
//                           title="Delete"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUsers,
  FiShoppingCart,
  FiTrendingUp,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronLeft,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewPage, setPreviewPage] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    productname: "",
    productprice: "",
    buttonText: "Buy Now",
    colors: {
      primary: "#4f46e5",
      secondary: "#ffffff",
    },
    font: "Arial",
    formFields: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    utmParameters: {
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    },
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  const API_BASE = "https://task-dashbaord.onrender.com/admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Using the same endpoint for both stats and pages as per original code
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
          activeUsers: statsData.activeUsers || 0,
          avgPagesPerUser: statsData.avgPagesPerUser || 0,
        });

        setCheckoutPages(pagesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const handleEditClick = (page) => {
    setCurrentPage(page);
    setFormData({
      title: page.title || "",
      productname: page.productname || "",
      productprice: page.productprice || "",
      buttonText: page.buttonText || "Buy Now",
      colors: {
        primary: page.colors?.primary || "#4f46e5",
        secondary: page.colors?.secondary || "#ffffff",
      },
      font: page.font || "Arial",
      formFields: {
        name: page.formFields?.name || "",
        email: page.formFields?.email || "",
        phone: page.formFields?.phone || "",
        address: page.formFields?.address || "",
      },
      utmParameters: page.utmParameters || {
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      },
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePreview = (page) => {
    setPreviewPage(page);
    setShowPreviewModal(true);
  };

  const confirmDelete = (id) => {
    setPageToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!pageToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/checkout/${pageToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCheckoutPages(
          checkoutPages.filter((page) => page._id !== pageToDelete)
        );
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
        showNotification("Page deleted successfully");
      } else {
        throw new Error("Failed to delete page");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      showNotification("Failed to delete page", "error");
    } finally {
      setShowDeleteModal(false);
      setPageToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (!currentPage?._id) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/checkout/${currentPage._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          productname: formData.productname,
          productprice: parseFloat(formData.productprice), // Ensure price is a number
          buttonText: formData.buttonText,
          colors: formData.colors,
          font: formData.font,
          formFields: formData.formFields,
          utmParameters: formData.utmParameters,
        }),
      });

      if (response.ok) {
        const updatedPage = await response.json();
        setCheckoutPages(
          checkoutPages.map((page) =>
            page._id === currentPage._id ? updatedPage : page
          )
        );
        setShowEditModal(false);
        showNotification("Page updated successfully");
      } else {
        throw new Error("Failed to update page");
      }
    } catch (error) {
      console.error("Error updating page:", error);
      showNotification("Failed to update page", "error");
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
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <FiCheckCircle className="mr-2" />
          ) : (
            <FiAlertCircle className="mr-2" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this checkout page? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <FiChevronLeft className="mr-1" />
                Back to Dashboard
              </button>
              <h3 className="text-lg font-medium text-gray-900">
                {previewPage.title || "Checkout Page Preview"}
              </h3>
              <div className="w-6"></div> {/* Spacer for alignment */}
            </div>

            <div
              className="border rounded-lg p-6 mx-auto"
              style={{
                backgroundColor: previewPage.colors?.secondary || "#ffffff",
                fontFamily: previewPage.font || "Arial",
                maxWidth: "500px",
              }}
            >
              <h1
                className="text-2xl font-bold mb-4"
                style={{ color: previewPage.colors?.primary || "#4f46e5" }}
              >
                {previewPage.title || "Checkout Page"}
              </h1>

              <h2 className="text-xl font-semibold mb-2">
                {previewPage.productname || "Product Name"}
              </h2>
              <p className="text-lg mb-4">
                ${previewPage.productprice || "0.00"}
              </p>

              <div className="space-y-4">
                {previewPage.formFields?.name && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={previewPage.formFields.name}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{
                      borderColor: previewPage.colors?.primary || "#4f46e5",
                    }}
                  />
                )}
                {previewPage.formFields?.email && (
                  <input
                    type="email"
                    placeholder="Email"
                    value={previewPage.formFields.email}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{
                      borderColor: previewPage.colors?.primary || "#4f46e5",
                    }}
                  />
                )}
                {previewPage.formFields?.phone && (
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={previewPage.formFields.phone}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{
                      borderColor: previewPage.colors?.primary || "#4f46e5",
                    }}
                  />
                )}
                {previewPage.formFields?.address && (
                  <input
                    type="text"
                    placeholder="Address"
                    value={previewPage.formFields.address}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{
                      borderColor: previewPage.colors?.primary || "#4f46e5",
                    }}
                  />
                )}
                <button
                  className="w-full p-3 rounded-md text-white font-medium"
                  style={{
                    backgroundColor: previewPage.colors?.primary || "#4f46e5",
                  }}
                >
                  {previewPage.buttonText || "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit and Preview Modal */}
      {showEditModal && currentPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            {/* Edit Form */}
            <div className="w-full md:w-1/2 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Edit Checkout Page
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">
                    Basic Information
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Page Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="productname"
                      value={formData.productname}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Price
                    </label>
                    <input
                      type="number"
                      name="productprice"
                      value={formData.productprice}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      name="buttonText"
                      value={formData.buttonText}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Design Settings */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">
                    Design Settings
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="colors.primary"
                        value={formData.colors?.primary || "#4f46e5"}
                        onChange={handleFormChange}
                        className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {formData.colors?.primary || "#4f46e5"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="colors.secondary"
                        value={formData.colors?.secondary || "#ffffff"}
                        onChange={handleFormChange}
                        className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {formData.colors?.secondary || "#ffffff"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font
                    </label>
                    <select
                      name="font"
                      value={formData.font || "Arial"}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">
                    Form Fields
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(formData.formFields || {}).map(
                      ([field]) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type={
                              field === "email"
                                ? "email"
                                : field === "phone"
                                ? "tel"
                                : "text"
                            }
                            name={`formFields.${field}`}
                            value={formData.formFields[field]}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder={`Enter ${field}`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* UTM Parameters */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 border-b pb-2">
                    UTM Parameters
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Source
                      </label>
                      <input
                        type="text"
                        name="utmParameters.source"
                        value={formData.utmParameters?.source || ""}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medium
                      </label>
                      <input
                        type="text"
                        name="utmParameters.medium"
                        value={formData.utmParameters?.medium || ""}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign
                      </label>
                      <input
                        type="text"
                        name="utmParameters.campaign"
                        value={formData.utmParameters?.campaign || ""}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Term
                      </label>
                      <input
                        type="text"
                        name="utmParameters.term"
                        value={formData.utmParameters?.term || ""}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <input
                        type="text"
                        name="utmParameters.content"
                        value={formData.utmParameters?.content || ""}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="w-full md:w-1/2 p-6 bg-gray-50 border-l border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Live Preview
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div
                className="border rounded-lg p-6 mx-auto"
                style={{
                  backgroundColor: formData.colors?.secondary || "#ffffff",
                  fontFamily: formData.font || "Arial",
                  maxWidth: "500px",
                }}
              >
                <h1
                  className="text-2xl font-bold mb-4"
                  style={{ color: formData.colors?.primary || "#4f46e5" }}
                >
                  {formData.title || "Checkout Page"}
                </h1>

                <h2 className="text-xl font-semibold mb-2">
                  {formData.productname || "Product Name"}
                </h2>
                <p className="text-lg mb-4">
                  ${formData.productprice || "0.00"}
                </p>

                <div className="space-y-4">
                  {formData.formFields?.name && (
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.formFields.name}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: formData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  {formData.formFields?.email && (
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.formFields.email}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: formData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  {formData.formFields?.phone && (
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.formFields.phone}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: formData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  {formData.formFields?.address && (
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.formFields.address}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: formData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  <button
                    className="w-full p-3 rounded-md text-white font-medium"
                    style={{
                      backgroundColor: formData.colors?.primary || "#4f46e5",
                    }}
                  >
                    {formData.buttonText || "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
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
                          .map(
                            ([field]) =>
                              field.charAt(0).toUpperCase() + field.slice(1)
                          )
                          .join(", ") || "No fields"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePreview(page)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Preview"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => handleEditClick(page)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => confirmDelete(page._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
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
