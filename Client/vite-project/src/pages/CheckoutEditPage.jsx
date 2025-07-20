// CheckoutEditPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState({
    title: "",
    productname: "",
    productprice: 0,
    productimages: [],
    buttonText: "Buy Now",
    colors: {
      primary: "#4f46e5",
      secondary: "#ffffff",
    },
    font: "Arial",
    formFields: {
      name: true,
      email: true,
      phone: true,
      address: false,
    },
  });

  console.log(checkout, "checkoutcheckout");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const response = await axios.get(
          `https://task-dashbaord.onrender.com/admin/checkout/${id}`
        );
        setCheckout(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch checkout page");
        setLoading(false);
      }
    };

    fetchCheckout();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCheckout((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setCheckout((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e, index) => {
    const newImages = [...checkout.productimages];
    newImages[index] = e.target.value;
    setCheckout((prev) => ({
      ...prev,
      productimages: newImages,
    }));
  };

  const addImageField = () => {
    setCheckout((prev) => ({
      ...prev,
      productimages: [...prev.productimages, ""],
    }));
  };

  const removeImageField = (index) => {
    const newImages = checkout.productimages.filter((_, i) => i !== index);
    setCheckout((prev) => ({
      ...prev,
      productimages: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://task-dashbaord.onrender.com/admin/checkout/${id}`,
        checkout
      );
      navigate(`/admin/checkout/${id}`);
    } catch (err) {
      setError("Failed to update checkout page");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Checkout Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={checkout.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={checkout.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productname"
                value={checkout.productname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Price
              </label>
              <input
                type="number"
                name="productprice"
                value={checkout.productprice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            {checkout.productimages.map((img, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(e, index)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Image
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Design Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="colors.primary"
                  value={checkout.colors.primary}
                  onChange={handleChange}
                  className="w-12 h-12"
                />
                <span className="ml-2">{checkout.colors.primary}</span>
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
                  value={checkout.colors.secondary}
                  onChange={handleChange}
                  className="w-12 h-12"
                />
                <span className="ml-2">{checkout.colors.secondary}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font
              </label>
              <select
                name="font"
                value={checkout.font}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Form Fields</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="formFields.name"
                checked={checkout.formFields.name}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Name Field</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="formFields.email"
                checked={checkout.formFields.email}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Email Field</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="formFields.phone"
                checked={checkout.formFields.phone}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Phone Field</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="formFields.address"
                checked={checkout.formFields.address}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Address Field</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/checkout/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutEditPage;
