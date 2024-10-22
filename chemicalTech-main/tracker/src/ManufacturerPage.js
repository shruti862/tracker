import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Assuming firebase.js contains Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

const ManufacturerPage = () => {
  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    usageDuration: "",
    origin: "",
    description: "",
    manufacturingDate: "",
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      // Add product data to Firestore
      await addDoc(collection(db, "products"), {
        code: newProduct.code,
        name: newProduct.name,
        usageDuration: parseFloat(newProduct.usageDuration),
        origin: newProduct.origin,
        description: newProduct.description,
        manufacturingDate: newProduct.manufacturingDate,
      });
      alert("Product added successfully!");

      // Reset form after submission
      setNewProduct({
        code: "",
        name: "",
        usageDuration: "",
        origin: "",
        description: "",
        manufacturingDate: "",
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="page-content">
      <h1>Manufacturer Page</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="code"
          placeholder="Product Code"
          value={newProduct.code}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="usageDuration"
          placeholder="Usage Duration (years)"
          value={newProduct.usageDuration}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin (e.g., Recycled, Virgin, Sustainable)"
          value={newProduct.origin}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="manufacturingDate"
          value={newProduct.manufacturingDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ManufacturerPage;
