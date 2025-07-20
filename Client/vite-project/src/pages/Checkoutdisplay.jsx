// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CheckoutViewPage = () => {
//   const [checkouts, setCheckouts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewData, setPreviewData] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     title: "",
//     productname: "",
//     productprice: "",
//     buttonText: "Buy Now",
//     colors: {
//       primary: "#3b82f6",
//       secondary: "#ffffff",
//     },
//     font: "Arial",
//     formFields: {
//       name: true,
//       email: true,
//       phone: false,
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

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCheckoutData();
//   }, []);

//   const fetchCheckoutData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const user = JSON.parse(localStorage.getItem("user"));

//       const response = await axios.get(
//         `https://task-dashbaord.onrender.com/api/checkout-pages/user/${user._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCheckouts(response.data);
//     } catch (error) {
//       console.error("Error fetching checkout data", error);
//       setError("Failed to load checkout data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePreview = (checkout) => {
//     setPreviewData(checkout);
//     setShowPreview(true);
//   };

//   const handleEdit = (checkout) => {
//     setEditingId(checkout._id);
//     setEditFormData({
//       title: checkout.title || "",
//       productname: checkout.productname || "",
//       productprice: checkout.productprice || "",
//       buttonText: checkout.buttonText || "Buy Now",
//       font: checkout.font || "Arial",
//       colors: {
//         primary: checkout.colors?.primary || "#4f46e5",
//         secondary: checkout.colors?.secondary || "#ffffff",
//       },
//       formFields: {
//         name: checkout.formFields?.name ?? true,
//         email: checkout.formFields?.email ?? true,
//         phone: checkout.formFields?.phone ?? false,
//         address: checkout.formFields?.address ?? false,
//       },
//       utmParameters: checkout.utmParameters || {
//         source: "",
//         medium: "",
//         campaign: "",
//         term: "",
//         content: "",
//       },
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.startsWith("colors.")) {
//       const colorField = name.split(".")[1];
//       setEditFormData((prev) => ({
//         ...prev,
//         colors: {
//           ...prev.colors,
//           [colorField]: value,
//         },
//       }));
//     } else if (name.startsWith("formFields.")) {
//       const fieldName = name.split(".")[1];
//       setEditFormData((prev) => ({
//         ...prev,
//         formFields: {
//           ...prev.formFields,
//           [fieldName]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else if (name.startsWith("utmParameters.")) {
//       const utmField = name.split(".")[1];
//       setEditFormData((prev) => ({
//         ...prev,
//         utmParameters: {
//           ...prev.utmParameters,
//           [utmField]: value,
//         },
//       }));
//     } else {
//       setEditFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://task-dashbaord.onrender.com/api/checkout-pages/${id}`,
//         editFormData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setEditingId(null);
//       fetchCheckoutData();
//     } catch (error) {
//       console.error("Error updating checkout page", error);
//       setError("Failed to update checkout page.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this checkout page?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`https://task-dashbaord.onrender.com/api/checkout-pages/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         fetchCheckoutData();
//       } catch (error) {
//         console.error("Error deleting checkout page", error);
//         setError("Failed to delete checkout page.");
//       }
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error)
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   if (checkouts.length === 0)
//     return <div className="text-center py-8">No checkout data found</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Your Checkout Pages
//       </h1>

//       {/* Preview Modal */}
//       {showPreview && previewData && (
//         <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {previewData.title || "Checkout Page Preview"}
//                 </h2>
//                 <button
//                   onClick={() => setShowPreview(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Preview Content */}
//               <div
//                 className="border rounded-lg p-6 mx-auto"
//                 style={{
//                   backgroundColor: previewData.colors?.secondary || "#ffffff",
//                   fontFamily: previewData.font || "Arial",
//                   maxWidth: "500px",
//                 }}
//               >
//                 <h1
//                   className="text-2xl font-bold mb-4"
//                   style={{ color: previewData.colors?.primary || "#4f46e5" }}
//                 >
//                   {previewData.title || "Checkout Page"}
//                 </h1>

//                 <h2 className="text-xl font-semibold mb-2">
//                   {previewData.productname || "Product Name"}
//                 </h2>
//                 <p className="text-lg mb-4">
//                   ${previewData.productprice || "0.00"}
//                 </p>

//                 <div className="space-y-4">
//                   {previewData.formFields?.name && (
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       className="p-2 w-full border rounded-md"
//                       style={{
//                         borderColor: previewData.colors?.primary || "#4f46e5",
//                       }}
//                     />
//                   )}

//                   {previewData.formFields?.email && (
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       className="p-2 w-full border rounded-md"
//                       style={{
//                         borderColor: previewData.colors?.primary || "#4f46e5",
//                       }}
//                     />
//                   )}

//                   {previewData.formFields?.phone && (
//                     <input
//                       type="tel"
//                       placeholder="Phone"
//                       className="p-2 w-full border rounded-md"
//                       style={{
//                         borderColor: previewData.colors?.primary || "#4f46e5",
//                       }}
//                     />
//                   )}

//                   {previewData.formFields?.address && (
//                     <input
//                       type="text"
//                       placeholder="Address"
//                       className="p-2 w-full border rounded-md"
//                       style={{
//                         borderColor: previewData.colors?.primary || "#4f46e5",
//                       }}
//                     />
//                   )}

//                   <button
//                     className="w-full p-3 rounded-md text-white font-medium"
//                     style={{
//                       backgroundColor: previewData.colors?.primary || "#4f46e5",
//                     }}
//                   >
//                     {previewData.buttonText || "Buy Now"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {checkouts.map((checkout) => (
//           <div key={checkout._id} className="bg-white rounded-lg shadow-md p-6">
//             {editingId === checkout._id ? (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   Edit Checkout Page
//                 </h2>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Page Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={editFormData.title}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     name="productname"
//                     value={editFormData.productname}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">
//                     Product Price
//                   </label>
//                   <input
//                     type="text"
//                     name="productprice"
//                     value={editFormData.productprice}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">
//                     Button Text
//                   </label>
//                   <input
//                     type="text"
//                     name="buttonText"
//                     value={editFormData.buttonText}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Font</label>
//                   <select
//                     name="font"
//                     value={editFormData.font}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="Arial">Arial</option>
//                     <option value="Helvetica">Helvetica</option>
//                     <option value="Times New Roman">Times New Roman</option>
//                     <option value="Georgia">Georgia</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">
//                     Primary Color
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type="color"
//                       name="colors.primary"
//                       value={editFormData.colors.primary}
//                       onChange={handleEditChange}
//                       className="mr-2"
//                     />
//                     <input
//                       type="text"
//                       name="colors.primary"
//                       value={editFormData.colors.primary}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">
//                     Secondary Color
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type="color"
//                       name="colors.secondary"
//                       value={editFormData.colors.secondary}
//                       onChange={handleEditChange}
//                       className="mr-2"
//                     />
//                     <input
//                       type="text"
//                       name="colors.secondary"
//                       value={editFormData.colors.secondary}
//                       onChange={handleEditChange}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     Form Fields
//                   </label>
//                   <div className="grid grid-cols-2 gap-2">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="formFields.name"
//                         checked={editFormData.formFields.name}
//                         onChange={handleEditChange}
//                         className="mr-2"
//                       />
//                       <span>Name</span>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="formFields.email"
//                         checked={editFormData.formFields.email}
//                         onChange={handleEditChange}
//                         className="mr-2"
//                       />
//                       <span>Email</span>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="formFields.phone"
//                         checked={editFormData.formFields.phone}
//                         onChange={handleEditChange}
//                         className="mr-2"
//                       />
//                       <span>Phone</span>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="formFields.address"
//                         checked={editFormData.formFields.address}
//                         onChange={handleEditChange}
//                         className="mr-2"
//                       />
//                       <span>Address</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     UTM Parameters
//                   </label>
//                   <div className="space-y-2">
//                     {Object.entries(editFormData.utmParameters).map(
//                       ([param]) => (
//                         <input
//                           key={param}
//                           type="text"
//                           name={`utmParameters.${param}`}
//                           placeholder={`UTM ${param}`}
//                           value={editFormData.utmParameters[param]}
//                           onChange={handleEditChange}
//                           className="w-full p-2 border rounded"
//                         />
//                       )
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex space-x-4 pt-4">
//                   <button
//                     onClick={() => handleUpdate(checkout._id)}
//                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={cancelEdit}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="border-b pb-4 mb-6">
//                   <h2 className="text-xl font-bold text-gray-800">
//                     {checkout.title}
//                   </h2>
//                   <p className="text-gray-500">
//                     Created:{" "}
//                     {new Date(checkout.createdAt).toLocaleDateString("en-GB")}
//                   </p>
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">
//                     Product Info
//                   </h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <p className="mb-2">
//                       <span className="font-medium text-gray-700">Name:</span>
//                       <span className="ml-2 text-gray-900">
//                         {checkout.productname || "Not specified"}
//                       </span>
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-700">Price:</span>
//                       <span className="ml-2 text-gray-900">
//                         {checkout.productprice || "Not specified"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">
//                     Colors
//                   </h3>
//                   <div className="flex space-x-4">
//                     <div className="flex items-center">
//                       <div
//                         className="w-8 h-8 rounded-full mr-2 border border-gray-300"
//                         style={{ backgroundColor: checkout.colors.primary }}
//                       ></div>
//                       <span>Primary</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div
//                         className="w-8 h-8 rounded-full mr-2 border border-gray-300"
//                         style={{ backgroundColor: checkout.colors.secondary }}
//                       ></div>
//                       <span>Secondary</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">
//                     Form Fields
//                   </h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={checkout.formFields.name}
//                         readOnly
//                         className="mr-2"
//                       />
//                       <span>Name</span>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={checkout.formFields.email}
//                         readOnly
//                         className="mr-2"
//                       />
//                       <span>Email</span>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={checkout.formFields.phone}
//                         readOnly
//                         className="mr-2"
//                       />
//                       <span>Phone</span>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={checkout.formFields.address}
//                         readOnly
//                         className="mr-2"
//                       />
//                       <span>Address</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">
//                     Button Text
//                   </h3>
//                   <p className="bg-gray-100 p-2 rounded">
//                     {checkout.buttonText}
//                   </p>
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">
//                     Font
//                   </h3>
//                   <p className="bg-gray-100 p-2 rounded">{checkout.font}</p>
//                 </div>

//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">
//                     UTM Parameters
//                   </h3>
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     {Object.entries(checkout.utmParameters || {}).map(
//                       ([key, value]) => (
//                         <p key={key} className="mb-2">
//                           <span className="font-medium text-gray-700">
//                             {key}:
//                           </span>
//                           <span className="ml-2 text-gray-900">
//                             {value || "Not set"}
//                           </span>
//                         </p>
//                       )
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => handlePreview(checkout)}
//                     className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
//                   >
//                     Preview
//                   </button>
//                   <button
//                     onClick={() => handleEdit(checkout)}
//                     className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(checkout._id)}
//                     className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CheckoutViewPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutViewPage = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    productname: "",
    productprice: "",
    buttonText: "Buy Now",
    colors: {
      primary: "#3b82f6",
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

  const navigate = useNavigate();

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `https://task-dashbaord.onrender.com/api/checkout-pages/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCheckouts(response.data);
    } catch (error) {
      console.error("Error fetching checkout data", error);
      setError("Failed to load checkout data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (checkout) => {
    setPreviewData(checkout);
    setShowPreview(true);
  };

  const handleEdit = (checkout) => {
    setEditingId(checkout._id);
    setEditFormData({
      title: checkout.title || "",
      productname: checkout.productname || "",
      productprice: checkout.productprice || "",
      buttonText: checkout.buttonText || "Buy Now",
      font: checkout.font || "Arial",
      colors: {
        primary: checkout.colors?.primary || "#4f46e5",
        secondary: checkout.colors?.secondary || "#ffffff",
      },
      formFields: {
        name: checkout.formFields?.name || "",
        email: checkout.formFields?.email || "",
        phone: checkout.formFields?.phone || "",
        address: checkout.formFields?.address || "",
      },
      utmParameters: checkout.utmParameters || {
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      },
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("colors.")) {
      const colorField = name.split(".")[1];
      setEditFormData((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [colorField]: value,
        },
      }));
    } else if (name.startsWith("formFields.")) {
      const fieldName = name.split(".")[1];
      setEditFormData((prev) => ({
        ...prev,
        formFields: {
          ...prev.formFields,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith("utmParameters.")) {
      const utmField = name.split(".")[1];
      setEditFormData((prev) => ({
        ...prev,
        utmParameters: {
          ...prev.utmParameters,
          [utmField]: value,
        },
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://task-dashbaord.onrender.com/api/checkout-pages/${id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingId(null);
      fetchCheckoutData();
    } catch (error) {
      console.error("Error updating checkout page", error);
      setError("Failed to update checkout page.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this checkout page?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://task-dashbaord.onrender.com/api/checkout-pages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchCheckoutData();
      } catch (error) {
        console.error("Error deleting checkout page", error);
        setError("Failed to delete checkout page.");
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (checkouts.length === 0)
    return <div className="text-center py-8">No checkout data found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Your Checkout Pages
      </h1>

      {/* Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {previewData.title || "Checkout Page Preview"}
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Preview Content */}
              <div
                className="border rounded-lg p-6 mx-auto"
                style={{
                  backgroundColor: previewData.colors?.secondary || "#ffffff",
                  fontFamily: previewData.font || "Arial",
                  maxWidth: "500px",
                }}
              >
                <h1
                  className="text-2xl font-bold mb-4"
                  style={{ color: previewData.colors?.primary || "#4f46e5" }}
                >
                  {previewData.title || "Checkout Page"}
                </h1>

                <h2 className="text-xl font-semibold mb-2">
                  {previewData.productname || "Product Name"}
                </h2>
                <p className="text-lg mb-4">
                  ${previewData.productprice || "0.00"}
                </p>

                <div className="space-y-4">
                  {previewData.formFields?.name && (
                    <input
                      type="text"
                      placeholder="Name"
                      value={previewData.formFields.name}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: previewData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  {previewData.formFields?.email && (
                    <input
                      type="email"
                      placeholder="Email"
                      value={previewData.formFields.email}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: previewData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  {previewData.formFields?.phone && (
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={previewData.formFields.phone}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: previewData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  {previewData.formFields?.address && (
                    <input
                      type="text"
                      placeholder="Address"
                      value={previewData.formFields.address}
                      readOnly
                      className="p-2 w-full border rounded-md"
                      style={{
                        borderColor: previewData.colors?.primary || "#4f46e5",
                      }}
                    />
                  )}
                  <button
                    className="w-full p-3 rounded-md text-white font-medium"
                    style={{
                      backgroundColor: previewData.colors?.primary || "#4f46e5",
                    }}
                  >
                    {previewData.buttonText || "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checkouts.map((checkout) => (
          <div key={checkout._id} className="bg-white rounded-lg shadow-md p-6">
            {editingId === checkout._id ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Edit Checkout Page
                </h2>

                <div>
                  <label className="block text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productname"
                    value={editFormData.productname}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Product Price
                  </label>
                  <input
                    type="number"
                    name="productprice"
                    value={editFormData.productprice}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    value={editFormData.buttonText}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Font</label>
                  <select
                    name="font"
                    value={editFormData.font}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      name="colors.primary"
                      value={editFormData.colors.primary}
                      onChange={handleEditChange}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      name="colors.primary"
                      value={editFormData.colors.primary}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      name="colors.secondary"
                      value={editFormData.colors.secondary}
                      onChange={handleEditChange}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      name="colors.secondary"
                      value={editFormData.colors.secondary}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Form Fields
                  </label>
                  <div className="space-y-2">
                    {Object.entries(editFormData.formFields).map(([field]) => (
                      <div key={field}>
                        <label className="block text-gray-700 mb-1">
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
                          value={editFormData.formFields[field]}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded"
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    UTM Parameters
                  </label>
                  <div className="space-y-2">
                    {Object.entries(editFormData.utmParameters).map(
                      ([param]) => (
                        <input
                          key={param}
                          type="text"
                          name={`utmParameters.${param}`}
                          placeholder={`UTM ${param}`}
                          value={editFormData.utmParameters[param]}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded"
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => handleUpdate(checkout._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {checkout.title}
                  </h2>
                  <p className="text-gray-500">
                    Created:{" "}
                    {new Date(checkout.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Product Info
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2">
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">
                        {checkout.productname || "Not specified"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Price:</span>
                      <span className="ml-2 text-gray-900">
                        ${checkout.productprice || "0.00"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Colors
                  </h3>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full mr-2 border border-gray-300"
                        style={{ backgroundColor: checkout.colors.primary }}
                      ></div>
                      <span>Primary</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full mr-2 border border-gray-300"
                        style={{ backgroundColor: checkout.colors.secondary }}
                      ></div>
                      <span>Secondary</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Form Fields
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(checkout.formFields).map(
                      ([field, value]) => (
                        <p key={field} className="mb-2">
                          <span className="font-medium text-gray-700">
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                          </span>
                          <span className="ml-2 text-gray-900">
                            {value || "Not set"}
                          </span>
                        </p>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Button Text
                  </h3>
                  <p className="bg-gray-100 p-2 rounded">
                    {checkout.buttonText}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Font
                  </h3>
                  <p className="bg-gray-100 p-2 rounded">{checkout.font}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    UTM Parameters
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {Object.entries(checkout.utmParameters || {}).map(
                      ([key, value]) => (
                        <p key={key} className="mb-2">
                          <span className="font-medium text-gray-700">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <span className="ml-2 text-gray-900">
                            {value || "Not set"}
                          </span>
                        </p>
                      )
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handlePreview(checkout)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleEdit(checkout)}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(checkout._id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutViewPage;
