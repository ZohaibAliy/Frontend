import React, { useState, useEffect } from "react";
import { Getproduct, RemoveProduct, UpdateProduct,GetCategory } from "../Api/Api";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../Style/table.css"; // Add your CSS file path

Modal.setAppElement("#root"); // Accessibility for react-modal

const Table = () => {
  const [product, setProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [categories,setcatagories]=useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    price: "",
    categoryId: "",
  }); // Store the selected product for editing

  // Fetch product list
  useEffect(() => {
    Getproduct()
      .then((response) => {
        if (response) {
          setProduct(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [refresh]); // Trigger refresh on changes
useEffect(()=>{
  GetCategory()
  .then((response)=>{
    if(response){
      setcatagories(response);
    }
  })
  .catch((error)=>{
    console.error("Error in fateching Categories",error);
  });
},[refresh]);
  // Delete a product
  const DeactivateProduct = (id) => {
    RemoveProduct(id).then((response) => {
      if (response) {
        toast.success("Product deleted!");
        setRefresh(!refresh); // Refresh product list
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  // Open the modal and populate the form with the selected product
  const openModal = (product) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId || "",
    });
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProduct({ id: "", name: "", price: "", categoryId: "" }); // Clear selected product
  };

  // Update the product
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const { id, name, price, categoryId } = selectedProduct;

    if (!name || !price || !categoryId) {
      toast.error("All fields are required!");
      return;
    }

    UpdateProduct(id, name, price, categoryId)
      .then(() => {
        toast.success("Product updated successfully!");
        setRefresh(!refresh); // Refresh the product list
        closeModal(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Failed to update product.");
      });
  };

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="table-container">
      <Toaster /> {/* Toast notifications */}

      {/* Add New Entry Button */}
      <button className="add-button">
  <Link to="/Form" >+ Add</Link>
</button>

      {/* Product Table */}
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((data, key) => (
            <tr key={key}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>
                <button
                  className="action-button edit-button"
                  onClick={() => openModal(data)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => DeactivateProduct(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Product Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="form-container">
          <h2>Edit Product</h2>
          <form onSubmit={handleUpdateProduct}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={selectedProduct.name}
                onChange={handleChange}
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
                value={selectedProduct.price}
                onChange={handleChange}
                placeholder="Enter product price"
                required
              />
            </div>
            <div>
  <label htmlFor="categoryId">Category</label>
  <select
    id="categoryId"
    name="categoryId"
    value={selectedProduct.categoryId}
    onChange={handleChange}
    required
  >
    <option value="" disabled>
      Select a category
    </option>
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
</div>

            <div className="modal-actions">
              <button className="btn" type="submit">
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
