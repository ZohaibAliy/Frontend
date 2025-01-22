import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../Style/Form.css"; // Import the external CSS
import { 
    GetCategory,
    AddProduct,
    RemoveProduct } from "../Api/Api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Form = () => {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch categories when the component mounts
  useEffect(() => {
    GetCategory()
      .then((response) => {
        if (response) {
          setCategory(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Add product function
  const handleAddProduct = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (!name || !price || !categoryId) {
      toast.error("All fields are required!");
      return;
    }

    AddProduct(name, price, categoryId)
      .then(() => {
        toast.success("Product added successfully!");
        navigate("/table"); // Redirect to the table page after success
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        toast.error("Failed to add product.");
      });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setCategoryId(selectedId);
  };
 

  return (
    <div className="form-container">
      <Toaster /> {/* To display toast notifications */}
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="input-box">
          <span className="label">Category</span>
          <div className="flex-r input">
            <select
              id="category"
              value={categoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select a Category</option>
              {category.map((data, key) => (
                <option key={key} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Form;
