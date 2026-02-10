crud

// To create a React project, you can use Create React App. Run the following commands in your terminal:
// npx create-react-app product-crud-app
// cd product-crud-app
// npm start

// Below is the code for a basic React app that handles CRUD operations for products using the provided DummyJSON API.
// I've structured it with a single main component for simplicity, but you can split it into multiple components as needed.
// Replace the contents of src/App.js with the code below. This uses React hooks for state management and fetch for API calls.

// src/App.js
import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [updateProductId, setUpdateProductId] = useState("");
  const [updateProductTitle, setUpdateProductTitle] = useState("");
  const [deleteProductId, setDeleteProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    if (!newProductTitle) return;
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newProductTitle }),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProductTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    if (!updateProductId || !updateProductTitle) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${updateProductId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: updateProductTitle }),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      const updatedProduct = await response.json();
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setUpdateProductId("");
      setUpdateProductTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    if (!deleteProductId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${deleteProductId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete product");
      const deletedProduct = await response.json();
      setProducts(products.filter((p) => p.id !== deletedProduct.id));
      setDeleteProductId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product CRUD App</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h2>Products List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.id}: {product.title}
          </li>
        ))}
      </ul>

      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="New product title"
        value={newProductTitle}
        onChange={(e) => setNewProductTitle(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>

      <h2>Update Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={updateProductId}
        onChange={(e) => setUpdateProductId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New title"
        value={updateProductTitle}
        onChange={(e) => setUpdateProductTitle(e.target.value)}
      />
      <button onClick={updateProduct}>Update</button>

      <h2>Delete Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={deleteProductId}
        onChange={(e) => setDeleteProductId(e.target.value)}
      />
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
}

export default App;

// Notes:
// - This is a basic implementation. In a real app, add more fields for products (e.g., price, description) as per the API.
// - Error handling is minimal; enhance it for production.
// - The DummyJSON API is for testing; responses might be mocked.
// - To run: After replacing App.js, use 'npm start' in the project directory.
// - For styling, you can add CSS in App.css or use libraries like Material-UI.
