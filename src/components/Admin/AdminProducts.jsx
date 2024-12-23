import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  updateProductStatus,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../API/productsAPI";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminProducts.css";
import EditProductModal from "./EditProductModal";
import CreateProductModal from "./CreateProductModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateProduct = async (productData) => {
    try {
      await createProduct(productData);
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      setShowCreateModal(false);
      toast.success("Product created successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to create product", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products", {
          position: "bottom-right",
          autoClose: 2000,
        });
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleStatusToggle = async (productId, currentStatus) => {
    try {
      await updateProductStatus(productId, !currentStatus);
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, isActive: !currentStatus }
            : product
        )
      );
      toast.success("Product status updated successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to update product status", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleEditSubmit = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setShowEditModal(false);
      setEditingProduct(null);
      toast.success("Product updated successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to update product", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product.id !== productId));
        toast.success("Product deleted successfully", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Failed to delete product", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="admin-products__container">
      <div className="admin-products__header">
        <h2 className="admin-products__title">Products Management</h2>
        <button
          className="admin-products__create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="admin-products__table-container">
        <table className="admin-products__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="admin-products__thumbnail"
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className={`admin-products__status-btn ${
                      product.isActive ? "active" : "inactive"
                    }`}
                    onClick={() =>
                      handleStatusToggle(product.id, product.isActive)
                    }
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="admin-products__actions">
                  <button
                    className="admin-products__edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="admin-products__delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditModal && (
          <EditProductModal
            product={editingProduct}
            onSubmit={handleEditSubmit}
            onClose={() => {
              setShowEditModal(false);
              setEditingProduct(null);
            }}
          />
        )}

        {showCreateModal && (
          <CreateProductModal
            onSubmit={handleCreateProduct}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
