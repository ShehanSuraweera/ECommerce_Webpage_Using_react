import React, {useEffect,useState} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link } from 'react-router-dom';
import "./CategoryPage.scss";
import Pagination from '../../components/Pagination/Pagination';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    catProductSingle: products,
    catProductSingleStatus: status,
    catProductSingleTotalPages: totalPages,
  } = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, 'single', currentPage));
  }, [id, currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            {/* Your breadcrumb items */}
          </ul>
        </div>
      </div>

      <ProductList products={products} status={status} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryPage;