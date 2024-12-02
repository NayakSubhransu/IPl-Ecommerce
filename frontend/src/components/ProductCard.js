// src/components/ProductCard.js

import React from 'react';

// A functional component that takes in product details as props
const ProductCard = ({ product, teamStyles }) => {
  const { name, description, price, imageUrl } = product;

  // Using the assigned team for styling (for example, based on user team color)
  const teamStyle = teamStyles || teamStyles.Neutral; // Default to neutral if no team is provided

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg"
      style={{ borderColor: teamStyle.primaryColor, borderWidth: '2px' }}
    >
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Product Information */}
      <div className="mt-4">
        <h3
          className="text-xl font-semibold"
          style={{ color: teamStyle.primaryColor }}
        >
          {name}
        </h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span
            className="text-lg font-bold"
            style={{ color: teamStyle.secondaryColor }}
          >
            ₹{price}
          </span>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg"
            style={{ backgroundColor: teamStyle.primaryColor }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
