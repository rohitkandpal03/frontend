import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProducts,
  listProducts,
  deleteProduct,
} from "../ActionCreater/productAction";

function ProductsScreen(props) {
  const [modleVisible, setModelVisible] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [inStockItems, setInStockItems] = useState("");
  const [description, setDescription] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModelVisible(false);
    }
    dispatch(listProducts());
  }, [successSave, successDelete]);

  const openModel = (product) => {
    setModelVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setCategory(product.category);
    setImage(product.image);
    setInStockItems(product.inStockItems);
    setDescription(product.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveProducts({
        id,
        name,
        price,
        image,
        brand,
        category,
        inStockItems,
        description,
      })
    );
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="content content-margined">
        <div className="product-header">
          <h3> Products</h3>
          <button className="button" onClick={() => openModel({})}>
            Create Products
          </button>
        </div>
      </div>
      {modleVisible ? (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2> Create Product </h2>
              </li>
              <li>
                {loadingSave && <div> Loading ...</div>}
                {errorSave && <div> error...</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>

              <li>
                <label htmlFor="inStockItems">InStockItems</label>
                <input
                  type="text"
                  name="inStockItems"
                  id="inStockItems"
                  value={inStockItems}
                  onChange={(e) => setInStockItems(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
                <button
                  style={{ marginTop: "1rem", padding: "1rem" }}
                  onClick={() => setModelVisible(false)}
                >
                  Cancel
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : null}
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button onClick={() => openModel(product)}>Edit</button>
                  <button
                    style={{ marginLeft: "1rem" }}
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsScreen;
