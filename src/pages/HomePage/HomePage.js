import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider/Slider';
import Category from '../../components/Category/Category';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';

import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories, status: categoryStatus } = useSelector((state) => state.category);
  const { data: products, status: productStatus } = useSelector((state) => state.product);

  const itemsPerPage = 20;
  const totalPages = 5;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(currentPage, itemsPerPage));
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, 'all'));
    dispatch(fetchProductsByCategory(2, 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="home-page">
      <Slider />
      <Category categories={categories} status={categoryStatus} />
      <ProductList products={products} status={productStatus} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default HomePage;
