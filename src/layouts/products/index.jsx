import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductsView from './ProductsView';
import ProductForm from './ProductForm';
import productosIniciales from './productsData';

export default function ProductRoutes() {
  const [products, setProducts] = useState([]);
/*utilizacion del localStorage, no sabia bien donde instanciarlo*/

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || productosIniciales;
    setProducts(storedProducts);
  }, []);

  const saveProducts = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const addProduct = (product) => {
    const newProduct = { ...product, _id: crypto.randomUUID() };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
  };

  const editProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((p) =>
      p._id === id ? { ...p, ...updatedProduct } : p
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p._id !== id);
    saveProducts(updatedProducts);
  };

  return (
    <Routes>
      <Route path="/" element={<ProductsView products={products} deleteProduct={deleteProduct} />} />
      <Route path="/create" element={<ProductForm products={products} addProduct={addProduct} editProduct={editProduct} />} />
      <Route path="/edit/:id" element={<ProductForm products={products} addProduct={addProduct} editProduct={editProduct} />} />
    </Routes>
  );
}
