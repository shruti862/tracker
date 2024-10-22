import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Assuming firebase.js contains Firebase setup
import { collection, getDocs, where, query } from "firebase/firestore"; // Firestore functions

const ProductPage = () => {
  const [productCode, setProductCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleInputChange = (e) => setProductCode(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Query Firestore for the product where 'code' field matches the entered productCode
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("code", "==", productCode.trim())); // Query by 'code' field
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Extract the first matching product document
        const productData = querySnapshot.docs[0].data();
        const expiryDate = new Date(productData.manufacturingDate);
        expiryDate.setFullYear(
          expiryDate.getFullYear() + productData.usageDuration
        );
        productData.expiryDate = expiryDate.toDateString();

        setSelectedProduct(productData);
      } else {
        alert("Invalid product code. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
      alert("Error fetching product data.");
    }
  };

  const handleCloseModal = () => setSelectedProduct(null);

  return (
    <div className="page-content">
      <h1>Automated Waste Collection System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter product code (e.g., PL001)"
          value={productCode}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Check Product</button>
      </form>
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProduct.name}</h2>
            <p>Usage Duration: {selectedProduct.usageDuration} years</p>
            <p>Origin: {selectedProduct.origin}</p>
            <p>Description: {selectedProduct.description}</p>
            <p>Manufacturing Date: {selectedProduct.manufacturingDate}</p>
            <p>Expiry Date: {selectedProduct.expiryDate}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
