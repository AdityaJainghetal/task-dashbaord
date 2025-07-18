import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutBuilder = () => {
  const [design, setDesign] = useState({
    pageTitle: '',
    productName: '',
    productPrice: '',
    productImage: '',
    buttonText: 'Buy Now',
    primaryColor: '#3b82f6',
    secondaryColor: '#ffffff',
    fontStyle: 'Arial',
    formFields: {
      name: true,
      email: true,
      phone: false
    },
    utmParams: {
      source: '',
      medium: '',
      campaign: '',
      term: '',
      content: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesign(prev => ({ ...prev, [name]: value }));
  };

  // Toggle form fields
  const handleFormFieldToggle = (field) => {
    setDesign(prev => ({
      ...prev,
      formFields: { ...prev.formFields, [field]: !prev.formFields[field] }
    }));
  };

  // Handle UTM parameter changes
  const handleUtmChange = (e) => {
    const { name, value } = e.target;
    setDesign(prev => ({
      ...prev,
      utmParams: { ...prev.utmParams, [name]: value }
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign(prev => ({ ...prev, productImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate preview URL
  const generatePreviewUrl = () => {
    const params = new URLSearchParams();
    Object.entries(design.utmParams).forEach(([key, value]) => {
      if (value) params.append(`utm_${key}`, value);
    });
    return `${window.location.origin}/checkout/preview?${params.toString()}`;
  };

  // Save design to API
  const handleSave = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem("token");

const response = await fetch("http://localhost:7002/api/checkout-pages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ Add this line
  },
  body: JSON.stringify({
    title: design.pageTitle,
    product: {
      name: design.productName,
      price: design.productPrice,
      image: design.productImage,
    },
    buttonText: design.buttonText,
    colors: {
      primary: design.primaryColor,
      secondary: design.secondaryColor,
    },
    font: design.fontStyle,
    formFields: design.formFields,
    utmParameters: design.utmParams,
  }),

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save design');
      }

      // Update preview URL after save
      setPreviewUrl(generatePreviewUrl());
      alert('Design saved successfully!');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      setDesign({
        pageTitle: '',
        productName: '',
        productPrice: '',
        productImage: '',
        buttonText: 'Buy Now',
        primaryColor: '#3b82f6',
        secondaryColor: '#ffffff',
        fontStyle: 'Arial',
        formFields: {
          name: true,
          email: true,
          phone: false
        },
        utmParams: {
          source: '',
          medium: '',
          campaign: '',
          term: '',
          content: ''
        }
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
                <label className="block text-sm font-medium mb-1">Page Title</label>
                <input
                  type="text"
                  name="pageTitle"
                  value={design.pageTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={design.productName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Price</label>
                <input
                  type="number"
                  name="productPrice"
                  value={design.productPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
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
                  <label className="block text-sm font-medium mb-1">Primary Color</label>
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
                  <label className="block text-sm font-medium mb-1">Secondary Color</label>
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
                <label className="block text-sm font-medium mb-1">Font Style</label>
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
                <label className="block text-sm font-medium mb-2">Form Fields</label>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(design.formFields).map(([field, enabled]) => (
                    <label key={field} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => handleFormFieldToggle(field)}
                        className="h-4 w-4"
                      />
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">UTM Parameters</label>
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
                  {loading ? 'Saving...' : 'Save Design'}
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
              <h1 className="text-2xl font-bold mb-4" style={{ color: design.primaryColor }}>
                {design.pageTitle || 'Checkout Page'}
              </h1>
              
              {design.productImage && (
                <img 
                  src={design.productImage} 
                  alt="Product" 
                  className="w-full h-48 object-cover mb-4 rounded" 
                />
              )}
              
              <h2 className="text-xl font-semibold mb-2">{design.productName || 'Product Name'}</h2>
              <p className="text-lg mb-4">${design.productPrice || '0.00'}</p>
              
              <div className="space-y-4">
                {design.formFields.name && (
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                
                {design.formFields.email && (
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                
                {design.formFields.phone && (
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="p-2 w-full border rounded-md"
                    style={{ borderColor: design.primaryColor }}
                  />
                )}
                
                <button
                  className="w-full p-3 rounded-md text-white font-medium"
                  style={{ backgroundColor: design.primaryColor }}
                >
                  {design.buttonText || 'Buy Now'}
                </button>
              </div>
            </div>
            
            {previewUrl && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Preview URL</label>
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