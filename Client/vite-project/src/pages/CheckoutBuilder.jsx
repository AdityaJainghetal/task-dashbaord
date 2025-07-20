// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const CheckoutBuilder = () => {
// //   const [design, setDesign] = useState({
// //     pageTitle: "",
// //     productName: "",
// //     productPrice: "",
// //     buttonText: "Buy Now",
// //     primaryColor: "#3b82f6",
// //     secondaryColor: "#ffffff",
// //     fontStyle: "Arial",
// //     formFields: {
// //       name: true,
// //       email: true,
// //       phone: false,
// //     },
// //     utmParams: {
// //       source: "",
// //       medium: "",
// //       campaign: "",
// //       term: "",
// //       content: "",
// //     },
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [previewUrl, setPreviewUrl] = useState("");
// //   const navigate = useNavigate();

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setDesign((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFormFieldToggle = (field) => {
// //     setDesign((prev) => ({
// //       ...prev,
// //       formFields: { ...prev.formFields, [field]: !prev.formFields[field] },
// //     }));
// //   };

// //   const handleUtmChange = (e) => {
// //     const { name, value } = e.target;
// //     setDesign((prev) => ({
// //       ...prev,
// //       utmParams: { ...prev.utmParams, [name]: value },
// //     }));
// //   };

// //   const generatePreviewUrl = () => {
// //     const params = new URLSearchParams();
// //     Object.entries(design.utmParams).forEach(([key, value]) => {
// //       if (value) params.append(`utm_${key}`, value);
// //     });
// //     return `${window.location.origin}/checkout/preview?${params.toString()}`;
// //   };

// //   const handleSave = async () => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const token = localStorage.getItem("token");

// //       const response = await fetch(
// //         "http://localhost:7002/api/checkout-pages",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`, // ✅ Add this line
// //           },
// //           body: JSON.stringify({
// //             title: design.pageTitle,
// //             product: {
// //               name: design.productName,
// //               price: design.productPrice,
// //             },
// //             buttonText: design.buttonText,
// //             colors: {
// //               primary: design.primaryColor,
// //               secondary: design.secondaryColor,
// //             },
// //             font: design.fontStyle,
// //             formFields: design.formFields,
// //             utmParameters: design.utmParams,
// //           }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || "Failed to save design");
// //       }

// //       setPreviewUrl(generatePreviewUrl());
// //       alert("Design saved successfully!");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     if (window.confirm("Are you sure you want to reset all changes?")) {
// //       setDesign({
// //         pageTitle: "",
// //         productName: "",
// //         productPrice: "",

// //         buttonText: "Buy Now",
// //         primaryColor: "#3b82f6",
// //         secondaryColor: "#ffffff",
// //         fontStyle: "Arial",
// //         formFields: {
// //           name: true,
// //           email: true,
// //           phone: false,
// //         },
// //         utmParams: {
// //           source: "",
// //           medium: "",
// //           campaign: "",
// //           term: "",
// //           content: "",
// //         },
// //       });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <div className="container mx-auto p-4">
// //         <h1 className="text-2xl font-bold mb-6">Checkout Page Builder</h1>

// //         <div className="flex flex-col lg:flex-row gap-6">
// //           {/* Form Section */}
// //           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
// //             <h2 className="text-xl font-bold mb-4">Design Settings</h2>

// //             {error && (
// //               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
// //                 {error}
// //               </div>
// //             )}

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium mb-1">
// //                   Page Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="pageTitle"
// //                   value={design.pageTitle}
// //                   onChange={handleInputChange}
// //                   className="w-full p-2 border rounded-md"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium mb-1">
// //                   Product Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="productName"
// //                   value={design.productName}
// //                   onChange={handleInputChange}
// //                   className="w-full p-2 border rounded-md"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium mb-1">
// //                   Product Price
// //                 </label>
// //                 <input
// //                   type="number"
// //                   name="productPrice"
// //                   value={design.productPrice}
// //                   onChange={handleInputChange}
// //                   className="w-full p-2 border rounded-md"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium mb-1">
// //                   Button Text
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="buttonText"
// //                   value={design.buttonText}
// //                   onChange={handleInputChange}
// //                   className="w-full p-2 border rounded-md"
// //                 />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium mb-1">
// //                     Primary Color
// //                   </label>
// //                   <div className="flex items-center gap-2">
// //                     <input
// //                       type="color"
// //                       name="primaryColor"
// //                       value={design.primaryColor}
// //                       onChange={handleInputChange}
// //                       className="w-10 h-10"
// //                     />
// //                     <span>{design.primaryColor}</span>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium mb-1">
// //                     Secondary Color
// //                   </label>
// //                   <div className="flex items-center gap-2">
// //                     <input
// //                       type="color"
// //                       name="secondaryColor"
// //                       value={design.secondaryColor}
// //                       onChange={handleInputChange}
// //                       className="w-10 h-10"
// //                     />
// //                     <span>{design.secondaryColor}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium mb-1">
// //                   Font Style
// //                 </label>
// //                 <select
// //                   name="fontStyle"
// //                   value={design.fontStyle}
// //                   onChange={handleInputChange}
// //                   className="w-full p-2 border rounded-md"
// //                 >
// //                   <option value="Arial">Arial</option>
// //                   <option value="Helvetica">Helvetica</option>
// //                   <option value="Times New Roman">Times New Roman</option>
// //                   <option value="Georgia">Georgia</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium mb-2">
// //                   Form Fields
// //                 </label>
// //                 <div className="flex flex-wrap gap-4">
// //                   {Object.entries(design.formFields).map(([field, enabled]) => (
// //                     <label key={field} className="flex items-center gap-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={enabled}
// //                         onChange={() => handleFormFieldToggle(field)}
// //                         className="h-4 w-4"
// //                       />
// //                       {field.charAt(0).toUpperCase() + field.slice(1)}
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium mb-1">
// //                   UTM Parameters
// //                 </label>
// //                 <div className="space-y-2">
// //                   {Object.entries(design.utmParams).map(([param]) => (
// //                     <input
// //                       key={param}
// //                       type="text"
// //                       name={param}
// //                       placeholder={`UTM ${param}`}
// //                       value={design.utmParams[param]}
// //                       onChange={handleUtmChange}
// //                       className="w-full p-2 border rounded-md"
// //                     />
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="flex gap-4 pt-4">
// //                 <button
// //                   onClick={handleSave}
// //                   disabled={loading}
// //                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-70"
// //                 >
// //                   {loading ? "Saving..." : "Save Design"}
// //                 </button>
// //                 <button
// //                   onClick={handleReset}
// //                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
// //                 >
// //                   Reset
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Preview Section */}
// //           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
// //             <h2 className="text-xl font-bold mb-4">Preview</h2>

// //             <div
// //               className="border rounded-lg p-6"
// //               style={{
// //                 backgroundColor: design.secondaryColor,
// //                 fontFamily: design.fontStyle,
// //               }}
// //             >
// //               <h1
// //                 className="text-2xl font-bold mb-4"
// //                 style={{ color: design.primaryColor }}
// //               >
// //                 {design.pageTitle || "Checkout Page"}
// //               </h1>

// //               <h2 className="text-xl font-semibold mb-2">
// //                 {design.productName || "Product Name"}
// //               </h2>
// //               <p className="text-lg mb-4">${design.productPrice || "0.00"}</p>

// //               <div className="space-y-4">
// //                 {design.formFields.name && (
// //                   <input
// //                     type="text"
// //                     placeholder="Name"
// //                     className="p-2 w-full border rounded-md"
// //                     style={{ borderColor: design.primaryColor }}
// //                   />
// //                 )}

// //                 {design.formFields.email && (
// //                   <input
// //                     type="email"
// //                     placeholder="Email"
// //                     className="p-2 w-full border rounded-md"
// //                     style={{ borderColor: design.primaryColor }}
// //                   />
// //                 )}

// //                 {design.formFields.phone && (
// //                   <input
// //                     type="tel"
// //                     placeholder="Phone"
// //                     className="p-2 w-full border rounded-md"
// //                     style={{ borderColor: design.primaryColor }}
// //                   />
// //                 )}

// //                 <button
// //                   className="w-full p-3 rounded-md text-white font-medium"
// //                   style={{ backgroundColor: design.primaryColor }}
// //                 >
// //                   {design.buttonText || "Buy Now"}
// //                 </button>
// //               </div>
// //             </div>

// //             {previewUrl && (
// //               <div className="mt-4">
// //                 <label className="block text-sm font-medium mb-1">
// //                   Preview URL
// //                 </label>
// //                 <a
// //                   href={previewUrl}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-blue-600 hover:underline break-all"
// //                 >
// //                   {previewUrl}
// //                 </a>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutBuilder;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CheckoutBuilder = () => {
//   const [design, setDesign] = useState({
//     pageTitle: "",
//     productName: "",
//     productPrice: "",
//     buttonText: "Buy Now",
//     primaryColor: "#3b82f6",
//     secondaryColor: "#ffffff",
//     fontStyle: "Arial",
//     formFields: {
//       name: true,
//       email: true,
//       phone: false,
//       address: false, // Added address field
//     },
//     utmParams: {
//       source: "",
//       medium: "",
//       campaign: "",
//       term: "",
//       content: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [previewUrl, setPreviewUrl] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDesign((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormFieldToggle = (field) => {
//     setDesign((prev) => ({
//       ...prev,
//       formFields: { ...prev.formFields, [field]: !prev.formFields[field] },
//     }));
//   };

//   const handleUtmChange = (e) => {
//     const { name, value } = e.target;
//     setDesign((prev) => ({
//       ...prev,
//       utmParams: { ...prev.utmParams, [name]: value },
//     }));
//   };

//   const generatePreviewUrl = () => {
//     const params = new URLSearchParams();
//     Object.entries(design.utmParams).forEach(([key, value]) => {
//       if (value) params.append(`utm_${key}`, value);
//     });
//     return `${window.location.origin}/checkout/preview?${params.toString()}`;
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");

//       if (!design.productName || !design.productPrice) {
//         throw new Error("Product name and price are required");
//       }

//       const response = await fetch(
//         "https://task-dashboard.onrender.com/api/checkout-pages", // Fixed typo in URL
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             title: design.pageTitle,
//             product: {
//               name: design.productName,
//               price: parseFloat(design.productPrice), // Ensure price is a number
//             },
//             buttonText: design.buttonText,
//             colors: {
//               primary: design.primaryColor,
//               secondary: design.secondaryColor,
//             },
//             font: design.fontStyle,
//             formFields: {
//               name: design.formFields.name,
//               email: design.formFields.email,
//               phone: design.formFields.phone,
//               address: design.formFields.address, // Include address
//             },
//             utmParameters: design.utmParams,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to save design");
//       }

//       setPreviewUrl(generatePreviewUrl());
//       alert("Design saved successfully!");
//       navigate("/display"); // Optional: Navigate to display page after save
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     if (window.confirm("Are you sure you want to reset all changes?")) {
//       setDesign({
//         pageTitle: "",
//         productName: "",
//         productPrice: "",
//         buttonText: "Buy Now",
//         primaryColor: "#3b82f6",
//         secondaryColor: "#ffffff",
//         fontStyle: "Arial",
//         formFields: {
//           name: true,
//           email: true,
//           phone: false,
//           address: false, // Added address
//         },
//         utmParams: {
//           source: "",
//           medium: "",
//           campaign: "",
//           term: "",
//           content: "",
//         },
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-6">Checkout Page Builder</h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Form Section */}
//           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Design Settings</h2>

//             {error && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Page Title
//                 </label>
//                 <input
//                   type="text"
//                   name="pageTitle"
//                   value={design.pageTitle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="productName"
//                   value={design.productName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Product Price
//                 </label>
//                 <input
//                   type="number"
//                   name="productPrice"
//                   value={design.productPrice}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Button Text
//                 </label>
//                 <input
//                   type="text"
//                   name="buttonText"
//                   value={design.buttonText}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Primary Color
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="color"
//                       name="primaryColor"
//                       value={design.primaryColor}
//                       onChange={handleInputChange}
//                       className="w-10 h-10"
//                     />
//                     <span>{design.primaryColor}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Secondary Color
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="color"
//                       name="secondaryColor"
//                       value={design.secondaryColor}
//                       onChange={handleInputChange}
//                       className="w-10 h-10"
//                     />
//                     <span>{design.secondaryColor}</span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Font Style
//                 </label>
//                 <select
//                   name="fontStyle"
//                   value={design.fontStyle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="Arial">Arial</option>
//                   <option value="Helvetica">Helvetica</option>
//                   <option value="Times New Roman">Times New Roman</option>
//                   <option value="Georgia">Georgia</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Form Fields
//                 </label>
//                 <div className="flex flex-wrap gap-4">
//                   {Object.entries(design.formFields).map(([field, enabled]) => (
//                     <label key={field} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={enabled}
//                         onChange={() => handleFormFieldToggle(field)}
//                         className="h-4 w-4"
//                       />
//                       {field.charAt(0).toUpperCase() + field.slice(1)}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   UTM Parameters
//                 </label>
//                 <div className="space-y-2">
//                   {Object.entries(design.utmParams).map(([param]) => (
//                     <input
//                       key={param}
//                       type="text"
//                       name={param}
//                       placeholder={`UTM ${param}`}
//                       value={design.utmParams[param]}
//                       onChange={handleUtmChange}
//                       className="w-full p-2 border rounded-md"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-70"
//                 >
//                   {loading ? "Saving..." : "Save Design"}
//                 </button>
//                 <button
//                   onClick={handleReset}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Preview Section */}
//           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Preview</h2>

//             <div
//               className="border rounded-lg p-6"
//               style={{
//                 backgroundColor: design.secondaryColor,
//                 fontFamily: design.fontStyle,
//               }}
//             >
//               <h1
//                 className="text-2xl font-bold mb-4"
//                 style={{ color: design.primaryColor }}
//               >
//                 {design.pageTitle || "Checkout Page"}
//               </h1>

//               <h2 className="text-xl font-semibold mb-2">
//                 {design.productName || "Product Name"}
//               </h2>
//               <p className="text-lg mb-4">${design.productPrice || "0.00"}</p>

//               <div className="space-y-4">
//                 {design.formFields.name && (
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.email && (
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.phone && (
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.address && ( // Added address field
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 <button
//                   className="w-full p-3 rounded-md text-white font-medium"
//                   style={{ backgroundColor: design.primaryColor }}
//                 >
//                   {design.buttonText || "Buy Now"}
//                 </button>
//               </div>
//             </div>

//             {previewUrl && (
//               <div className="mt-4">
//                 <label className="block text-sm font-medium mb-1">
//                   Preview URL
//                 </label>
//                 <a
//                   href={previewUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline break-all"
//                 >
//                   {previewUrl}
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutBuilder;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CheckoutBuilder = () => {
//   const [design, setDesign] = useState({
//     pageTitle: "",
//     productName: "",
//     productPrice: "",
//     buttonText: "Buy Now",
//     primaryColor: "#3b82f6",
//     secondaryColor: "#ffffff",
//     fontStyle: "Arial",
//     formFields: {
//       name: true,
//       email: true,
//       phone: false,
//       address: false, // Added address field
//     },
//     utmParams: {
//       source: "",
//       medium: "",
//       campaign: "",
//       term: "",
//       content: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [previewUrl, setPreviewUrl] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDesign((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormFieldToggle = (field) => {
//     setDesign((prev) => ({
//       ...prev,
//       formFields: { ...prev.formFields, [field]: !prev.formFields[field] },
//     }));
//   };

//   const handleUtmChange = (e) => {
//     const { name, value } = e.target;
//     setDesign((prev) => ({
//       ...prev,
//       utmParams: { ...prev.utmParams, [name]: value },
//     }));
//   };

//   const generatePreviewUrl = () => {
//     const params = new URLSearchParams();
//     Object.entries(design.utmParams).forEach(([key, value]) => {
//       if (value) params.append(`utm_${key}`, value);
//     });
//     return `${window.location.origin}/checkout/preview?${params.toString()}`;
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");

//       if (!design.productName || !design.productPrice) {
//         throw new Error("Product name and price are required");
//       }

//       const response = await fetch(
//         "http://localhost:7002/api/checkout-pages", // Fixed typo in URL
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             title: design.pageTitle,
//             product: {
//               name: design.productName,
//               price: parseFloat(design.productPrice), // Ensure price is a number
//             },
//             buttonText: design.buttonText,
//             colors: {
//               primary: design.primaryColor,
//               secondary: design.secondaryColor,
//             },
//             font: design.fontStyle,
//             formFields: {
//               name: design.formFields.name,
//               email: design.formFields.email,
//               phone: design.formFields.phone,
//               address: design.formFields.address, // Include address
//             },
//             utmParameters: design.utmParams,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to save design");
//       }

//       setPreviewUrl(generatePreviewUrl());
//       alert("Design saved successfully!");
//       navigate("/display"); // Optional: Navigate to display page after save
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     if (window.confirm("Are you sure you want to reset all changes?")) {
//       setDesign({
//         pageTitle: "",
//         productName: "",
//         productPrice: "",
//         buttonText: "Buy Now",
//         primaryColor: "#3b82f6",
//         secondaryColor: "#ffffff",
//         fontStyle: "Arial",
//         formFields: {
//           name: true,
//           email: true,
//           phone: false,
//           address: false, // Added address
//         },
//         utmParams: {
//           source: "",
//           medium: "",
//           campaign: "",
//           term: "",
//           content: "",
//         },
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-6">Checkout Page Builder</h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Form Section */}
//           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Design Settings</h2>

//             {error && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Page Title
//                 </label>
//                 <input
//                   type="text"
//                   name="pageTitle"
//                   value={design.pageTitle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="productName"
//                   value={design.productName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Product Price
//                 </label>
//                 <input
//                   type="number"
//                   name="productPrice"
//                   value={design.productPrice}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Button Text
//                 </label>
//                 <input
//                   type="text"
//                   name="buttonText"
//                   value={design.buttonText}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Primary Color
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="color"
//                       name="primaryColor"
//                       value={design.primaryColor}
//                       onChange={handleInputChange}
//                       className="w-10 h-10"
//                     />
//                     <span>{design.primaryColor}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Secondary Color
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="color"
//                       name="secondaryColor"
//                       value={design.secondaryColor}
//                       onChange={handleInputChange}
//                       className="w-10 h-10"
//                     />
//                     <span>{design.secondaryColor}</span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Font Style
//                 </label>
//                 <select
//                   name="fontStyle"
//                   value={design.fontStyle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="Arial">Arial</option>
//                   <option value="Helvetica">Helvetica</option>
//                   <option value="Times New Roman">Times New Roman</option>
//                   <option value="Georgia">Georgia</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Form Fields
//                 </label>
//                 <div className="flex flex-wrap gap-4">
//                   {Object.entries(design.formFields).map(([field, enabled]) => (
//                     <label key={field} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={enabled}
//                         onChange={() => handleFormFieldToggle(field)}
//                         className="h-4 w-4"
//                       />
//                       {field.charAt(0).toUpperCase() + field.slice(1)}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   UTM Parameters
//                 </label>
//                 <div className="space-y-2">
//                   {Object.entries(design.utmParams).map(([param]) => (
//                     <input
//                       key={param}
//                       type="text"
//                       name={param}
//                       placeholder={`UTM ${param}`}
//                       value={design.utmParams[param]}
//                       onChange={handleUtmChange}
//                       className="w-full p-2 border rounded-md"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-70"
//                 >
//                   {loading ? "Saving..." : "Save Design"}
//                 </button>
//                 <button
//                   onClick={handleReset}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Preview Section */}
//           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Preview</h2>

//             <div
//               className="border rounded-lg p-6"
//               style={{
//                 backgroundColor: design.secondaryColor,
//                 fontFamily: design.fontStyle,
//               }}
//             >
//               <h1
//                 className="text-2xl font-bold mb-4"
//                 style={{ color: design.primaryColor }}
//               >
//                 {design.pageTitle || "Checkout Page"}
//               </h1>

//               <h2 className="text-xl font-semibold mb-2">
//                 {design.productName || "Product Name"}
//               </h2>
//               <p className="text-lg mb-4">${design.productPrice || "0.00"}</p>

//               <div className="space-y-4">
//                 {design.formFields.name && (
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.email && (
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.phone && (
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.address && ( // Added address field
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 <button
//                   className="w-full p-3 rounded-md text-white font-medium"
//                   style={{ backgroundColor: design.primaryColor }}
//                 >
//                   {design.buttonText || "Buy Now"}
//                 </button>
//               </div>
//             </div>

//             {previewUrl && (
//               <div className="mt-4">
//                 <label className="block text-sm font-medium mb-1">
//                   Preview URL
//                 </label>
//                 <a
//                   href={previewUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline break-all"
//                 >
//                   {previewUrl}
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutBuilder;







// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CheckoutBuilder = () => {
//   const [design, setDesign] = useState({
//     pageTitle: "",
//     productName: "",
//     productPrice: "",
//     buttonText: "Buy Now",
//     primaryColor: "#3b82f6",
//     secondaryColor: "#ffffff",
//     fontStyle: "Arial",
//     formFields: {
//       name: "true",
//       email: "true",
//       phone: "false",
//       address: "false",
//     },
//     utmParams: {
//       source: "",
//       medium: "",
//       campaign: "",
//       term: "",
//       content: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [previewUrl, setPreviewUrl] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDesign((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormFieldToggle = (field) => {
//     setDesign((prev) => ({
//       ...prev,
//       formFields: { ...prev.formFields, [field]: prev.formFields[field] === "true" ? "false" : "true" },
//     }));
//   };

//   const handleUtmChange = (e) => {
//     const { name, value } = e.target;
//     setDesign((prev) => ({
//       ...prev,
//       utmParams: { ...prev.utmParams, [name]: value },
//     }));
//   };

//   const generatePreviewUrl = () => {
//     const params = new URLSearchParams();
//     Object.entries(design.utmParams).forEach(([key, value]) => {
//       if (value) params.append(`utm_${key}`, value);
//     });
//     return `${window.location.origin}/checkout/preview?${params.toString()}`;
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");

//       if (!design.productName || !design.productPrice) {
//         throw new Error("Product name and price are required");
//       }

//       const response = await fetch(
//         "http://localhost:7002/api/checkout-pages",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             title: design.pageTitle,
//             product: {
//               name: design.productName,
//               price: parseFloat(design.productPrice),
//             },
//             buttonText: design.buttonText,
//             colors: {
//               primary: design.primaryColor,
//               secondary: design.secondaryColor,
//             },
//             font: design.fontStyle,
//             formFields: {
//               name: design.formFields.name,
//               email: design.formFields.email,
//               phone: design.formFields.phone,
//               address: design.formFields.address,
//             },
//             utmParameters: design.utmParams,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to save design");
//       }

//       setPreviewUrl(generatePreviewUrl());
//       alert("Design saved successfully!");
//       navigate("/display");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     if (window.confirm("Are you sure you want to reset all changes?")) {
//       setDesign({
//         pageTitle: "",
//         productName: "",
//         productPrice: "",
//         buttonText: "Buy Now",
//         primaryColor: "#3b82f6",
//         secondaryColor: "#ffffff",
//         fontStyle: "Arial",
//         formFields: {
//           name: "true",
//           email: "true",
//           phone: "false",
//           address: "false",
//         },
//         utmParams: {
//           source: "",
//           medium: "",
//           campaign: "",
//           term: "",
//           content: "",
//         },
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-6">Checkout Page Builder</h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Form Section */}
//           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Design Settings</h2>

//             {error && (
//               <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Page Title
//                 </label>
//                 <input
//                   type="text"
//                   name="pageTitle"
//                   value={design.pageTitle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="productName"
//                   value={design.productName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Product Price
//                 </label>
//                 <input
//                   type="number"
//                   name="productPrice"
//                   value={design.productPrice}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Button Text
//                 </label>
//                 <input
//                   type="text"
//                   name="buttonText"
//                   value={design.buttonText}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Primary Color
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="color"
//                       name="primaryColor"
//                       value={design.primaryColor}
//                       onChange={handleInputChange}
//                       className="w-10 h-10"
//                     />
//                     <span>{design.primaryColor}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Secondary Color
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="color"
//                       name="secondaryColor"
//                       value={design.secondaryColor}
//                       onChange={handleInputChange}
//                       className="w-10 h-10"
//                     />
//                     <span>{design.secondaryColor}</span>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Font Style
//                 </label>
//                 <select
//                   name="fontStyle"
//                   value={design.fontStyle}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="Arial">Arial</option>
//                   <option value="Helvetica">Helvetica</option>
//                   <option value="Times New Roman">Times New Roman</option>
//                   <option value="Georgia">Georgia</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Form Fields
//                 </label>
//                 <div className="flex flex-wrap gap-4">
//                   {Object.entries(design.formFields).map(([field, enabled]) => (
//                     <label key={field} className="flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={enabled === "true"}
//                         onChange={() => handleFormFieldToggle(field)}
//                         className="h-4 w-4"
//                       />
//                       {field.charAt(0).toUpperCase() + field.slice(1)}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   UTM Parameters
//                 </label>
//                 <div className="space-y-2">
//                   {Object.entries(design.utmParams).map(([param]) => (
//                     <input
//                       key={param}
//                       type="text"
//                       name={param}
//                       placeholder={`UTM ${param}`}
//                       value={design.utmParams[param]}
//                       onChange={handleUtmChange}
//                       className="w-full p-2 border rounded-md"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-70"
//                 >
//                   {loading ? "Saving..." : "Save Design"}
//                 </button>
//                 <button
//                   onClick={handleReset}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Preview Section */}
//           <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-bold mb-4">Preview</h2>

//             <div
//               className="border rounded-lg p-6"
//               style={{
//                 backgroundColor: design.secondaryColor,
//                 fontFamily: design.fontStyle,
//               }}
//             >
//               <h1
//                 className="text-2xl font-bold mb-4"
//                 style={{ color: design.primaryColor }}
//               >
//                 {design.pageTitle || "Checkout Page"}
//               </h1>

//               <h2 className="text-xl font-semibold mb-2">
//                 {design.productName || "Product Name"}
//               </h2>
//               <p className="text-lg mb-4">${design.productPrice || "0.00"}</p>

//               <div className="space-y-4">
//                 {design.formFields.name === "true" && (
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.email === "true" && (
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.phone === "true" && (
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 {design.formFields.address === "true" && (
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="p-2 w-full border rounded-md"
//                     style={{ borderColor: design.primaryColor }}
//                   />
//                 )}
//                 <button
//                   className="w-full p-3 rounded-md text-white font-medium"
//                   style={{ backgroundColor: design.primaryColor }}
//                 >
//                   {design.buttonText || "Buy Now"}
//                 </button>
//               </div>
//             </div>

//             {previewUrl && (
//               <div className="mt-4">
//                 <label className="block text-sm font-medium mb-1">
//                   Preview URL
//                 </label>
//                 <a
//                   href={previewUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline break-all"
//                 >
//                   {previewUrl}
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutBuilder;






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutBuilder = () => {
  const [design, setDesign] = useState({
    pageTitle: "",
    productName: "",
    productPrice: "",
    buttonText: "Buy Now",
    primaryColor: "#3b82f6",
    secondaryColor: "#ffffff",
    fontStyle: "Arial",
    formFields: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    utmParams: {
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesign((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setDesign((prev) => ({
      ...prev,
      formFields: { ...prev.formFields, [name]: value },
    }));
  };

  const handleUtmChange = (e) => {
    const { name, value } = e.target;
    setDesign((prev) => ({
      ...prev,
      utmParams: { ...prev.utmParams, [name]: value },
    }));
  };

  const generatePreviewUrl = () => {
    const params = new URLSearchParams();
    Object.entries(design.utmParams).forEach(([key, value]) => {
      if (value) params.append(`utm_${key}`, value);
    });
    return `${window.location.origin}/checkout/preview?${params.toString()}`;
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!design.productName || !design.productPrice) {
        throw new Error("Product name and price are required");
      }

      const response = await fetch(
        "http://localhost:7002/api/checkout-pages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: design.pageTitle,
            product: {
              name: design.productName,
              price: parseFloat(design.productPrice),
            },
            buttonText: design.buttonText,
            colors: {
              primary: design.primaryColor,
              secondary: design.secondaryColor,
            },
            font: design.fontStyle,
            formFields: {
              name: design.formFields.name,
              email: design.formFields.email,
              phone: design.formFields.phone,
              address: design.formFields.address,
            },
            utmParameters: design.utmParams,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save design");
      }

      setPreviewUrl(generatePreviewUrl());
      alert("Design saved successfully!");
      navigate("/display");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all changes?")) {
      setDesign({
        pageTitle: "",
        productName: "",
        productPrice: "",
        buttonText: "Buy Now",
        primaryColor: "#3b82f6",
        secondaryColor: "#ffffff",
        fontStyle: "Arial",
        formFields: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        utmParams: {
          source: "",
          medium: "",
          campaign: "",
          term: "",
          content: "",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Checkout Page Builder</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Design Settings</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  name="pageTitle"
                  value={design.pageTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={design.productName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Price
                </label>
                <input
                  type="number"
                  name="productPrice"
                  value={design.productPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={design.buttonText}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="primaryColor"
                      value={design.primaryColor}
                      onChange={handleInputChange}
                      className="w-10 h-10"
                    />
                    <span>{design.primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="secondaryColor"
                      value={design.secondaryColor}
                      onChange={handleInputChange}
                      className="w-10 h-10"
                    />
                    <span>{design.secondaryColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Font Style
                </label>
                <select
                  name="fontStyle"
                  value={design.fontStyle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Form Fields
                </label>
                <div className="space-y-2">
                  {Object.entries(design.formFields).map(([field]) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        name={field}
                        value={design.formFields[field]}
                        onChange={handleFormFieldChange}
                        className="w-full p-2 border rounded-md"
                        placeholder={`Enter ${field}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  UTM Parameters
                </label>
                <div className="space-y-2">
                  {Object.entries(design.utmParams).map(([param]) => (
                    <input
                      key={param}
                      type="text"
                      name={param}
                      placeholder={`UTM ${param}`}
                      value={design.utmParams[param]}
                      onChange={handleUtmChange}
                      className="w-full p-2 border rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Design"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Preview</h2>

            <div
              className="border rounded-lg p-6"
              style={{
                backgroundColor: design.secondaryColor,
                fontFamily: design.fontStyle,
              }}
            >
              <h1
                className="text-2xl font-bold mb-4"
                style={{ color: design.primaryColor }}
              >
                {design.pageTitle || "Checkout Page"}
              </h1>

              <h2 className="text-xl font-semibold mb-2">
                {design.productName || "Product Name"}
              </h2>
              <p className="text-lg mb-4">${design.productPrice || "0.00"}</p>

              <div className="space-y-4">
                {design.formFields.name && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={design.formFields.name}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                {design.formFields.email && (
                  <input
                    type="email"
                    placeholder="Email"
                    value={design.formFields.email}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                {design.formFields.phone && (
                  <input type="tel"
                    placeholder="Phone"
                    value={design.formFields.phone}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                {design.formFields.address && (
                  <input
                    type="text"
                    placeholder="Address"
                    value={design.formFields.address}
                    readOnly
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                <button
                  className="w-full p-3 rounded-md text-white font-medium"
                  style={{ backgroundColor: design.primaryColor }}
                >
                  {design.buttonText || "Buy Now"}
                </button>
              </div>
            </div>

            {previewUrl && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Preview URL
                </label>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {previewUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBuilder;