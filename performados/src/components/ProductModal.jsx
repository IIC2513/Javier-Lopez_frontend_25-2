import React from "react";

function Product({
  id,
  OwnerId,
  categoryId,
  condition,
  image,
  description,
  isOfficial,
  isActive,
  name,
  price,
  stock,
}) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h2 className="product-name">{name}</h2>
      <p className="product-description">{description}</p>
      <p className="product-price">${(price / 100).toFixed(2)}</p>
      <p className="product-stock">Stock: {stock}</p>
      {isOfficial && <span className="official-badge">Oficial</span>}
      <p className="product-condition">Condición: {condition}</p>
    </div>
  );
}

export default Product;
