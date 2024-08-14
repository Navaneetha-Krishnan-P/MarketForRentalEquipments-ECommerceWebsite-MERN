import React, { useState } from 'react';
import "../My_Styles/AdminProducts.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

let server = 'https://marketforrentalequipments-backend-1.onrender.com';

const AdminProducts = () => {
  const [productSearch, setProductSearch] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  const formik = useFormik({
    initialValues: {
      productId: "",
      productCategory: "",
      productName: "",
      productType: "",
      productImage: "",
      productPrice: "",
      productKeywords: "",
      productAvailability: true,
    },
    onSubmit: async (values) => {
      if (values.productId.trim() === "" || values.productCategory.trim() === "" || values.productName.trim() === "" || values.productType.trim() === "" || values.productImage.trim() === "" || values.productPrice.trim() === "" || values.productKeywords.trim() === "") {
        alert("Enter All Fields");
        return;
      }

      let payload = {
        id: values.productId,
        category: values.productCategory,
        name: values.productName,
        type: values.productType,
        image: values.productImage,
        price: values.productPrice,
        search: values.productKeywords,
        available: values.productAvailability
      };

      try {
        let response;
        if (searchedProduct) {
          response = await axios.put(`${server}/product/${values.productId}`, payload);
          alert("Product updated successfully");
          resetForm();
        } else {
          response = await axios.post(`${server}/products`, payload);
          alert("Product added successfully");
          resetForm();
        }
        setSearchedProduct(response.data);
      } catch (error) {
        console.log("Error", error);
        alert("Error adding/updating product");
      }
    },
  });

  const handleProductSearch = async (e) => {
    e.preventDefault();
    if (productSearch.trim() === "") {
      alert("Enter a Product ID");
      return;
    }

    try {
      const response = await axios.get(`${server}/product/${productSearch}`);
      const product = response.data;
      setSearchedProduct(product);
      formik.setValues({
        productId: product.id,
        productCategory: product.category,
        productName: product.name,
        productType: product.type,
        productImage: product.image,
        productPrice: product.price,
        productKeywords: product.search,
        productAvailability: product.available,
      });
    } catch (error) {
      console.log("Error fetching product", error);
      alert("Product not found");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if(confirm("Confirm Delete the Product ?")){
        await axios.delete(`${server}/product/${formik.values.productId}`);
        alert("Product deleted successfully")}
       resetForm();
    } catch (error) {
      console.log("Error deleting product", error);
      alert("Error deleting product");
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setSearchedProduct(null);
  };

  return (
    <div className='login'>
      <div className='addproduct'>
        <button className="btn btn-dark" type="button" onClick={resetForm}>
          {searchedProduct ? "Edit Full Product" : "Add New Product"}
        </button>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline" onSubmit={handleProductSearch}>
            <div className="row">
              <div className="col">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search Product by ID"
                  aria-label="Search"
                />
              </div>
              <div className="col">
                <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
                  <b>Search</b>
                </button>
              </div>
            </div>
          </form>
        </nav>
      </div>
      <div className="login">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="productId"><b>Product Id</b></label><br />
            <input type="text" id="productId" name="productId" value={formik.values.productId} onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productCategory"><b>Product Category</b></label><br />
            <input type="text" id="productCategory" name="productCategory" value={formik.values.productCategory} placeholder="Must be in lowercase" onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productName"><b>Product Name</b></label><br />
            <input type="text" id="productName" name="productName" value={formik.values.productName} onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productType"><b>Product Type</b></label><br />
            <input type="text" id="productType" name="productType" value={formik.values.productType} onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productImage"><b>Product Image URL</b></label><br />
            <input type="text" id="productImage" name="productImage" value={formik.values.productImage} placeholder="Copy Paste your image url here" onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productPrice"><b>Product Price</b></label><br />
            <input type="text" id="productPrice" name="productPrice" value={formik.values.productPrice} placeholder="eg. 3000 / per day" onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productKeywords"><b>Product Search Keywords</b></label><br />
            <input type="text" id="productKeywords" name="productKeywords" value={formik.values.productKeywords} onChange={formik.handleChange} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="productAvailability"><b>Product Availability</b></label><br />
            <select id="productAvailability" name="productAvailability" value={formik.values.productAvailability} onChange={formik.handleChange}>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select><br />
          </div><br /><br/>

          <div>
            <button className="btn btn-success" type="submit">
              {searchedProduct ? "Update Product" : "Add Product"}
            </button>&nbsp;&nbsp;&nbsp;&nbsp;
            {searchedProduct && (
              <button className="btn btn-danger" type="button" onClick={handleDeleteProduct}>Delete Product</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;




