// CheckoutViewPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CheckoutViewPage = () => {
  const { id } = useParams();
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const response = await axios.get(`http://localhost:7002/admin/checkout/${id}`);
        setCheckout(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch checkout page');
        setLoading(false);
      }
    };
    
    fetchCheckout();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!checkout) return <div>Checkout page not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{checkout.title}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <p className="mb-2"><span className="font-medium">Name:</span> {checkout.productname}</p>
        <p className="mb-2"><span className="font-medium">Price:</span> ${checkout.productprice}</p>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Product Images:</h3>
          <div className="flex space-x-4">
            {checkout.productimages.map((img, index) => (
              <img key={index} src={img} alt={`Product ${index}`} className="h-24 w-24 object-cover rounded" />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Form Fields</h2>
        <ul className="list-disc pl-5">
          {checkout.formFields.name && <li>Name</li>}
          {checkout.formFields.email && <li>Email</li>}
          {checkout.formFields.phone && <li>Phone</li>}
          {checkout.formFields.address && <li>Address</li>}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Design Settings</h2>
        <p className="mb-2"><span className="font-medium">Primary Color:</span> 
          <span className="inline-block ml-2 w-6 h-6 rounded-full" style={{ backgroundColor: checkout.colors.primary }}></span>
        </p>
        <p className="mb-2"><span className="font-medium">Secondary Color:</span> 
          <span className="inline-block ml-2 w-6 h-6 rounded-full" style={{ backgroundColor: checkout.colors.secondary }}></span>
        </p>
        <p className="mb-2"><span className="font-medium">Font:</span> {checkout.font}</p>
        <p className="mb-2"><span className="font-medium">Button Text:</span> {checkout.buttonText}</p>
      </div>
    </div>
  );
};

export default CheckoutViewPage;