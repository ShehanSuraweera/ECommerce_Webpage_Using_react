import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible, setModalData } from '../../store/modalSlice';
import { formatPrice } from '../../utils/helpers';
import SingleProduct from '../SingleProduct/SingleProduct';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import { STATUS } from "../../utils/status";
import Pagination from '../../components/Pagination/Pagination'; // Import your Pagination component here

const SingleCategory = ({ products, status }) => {
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state) => state.modal);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products to display per page

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  }

  if (status === STATUS.ERROR) return (<Error />);
  if (status === STATUS.LOADING) return (<Loader />);

  return (
    <section className='cat-single py-5 bg-ghost-white'>
      {isModalVisible && <SingleProduct />}

      <div className='container'>
        <div className='cat-single-content'>
          <div className='section-title'>
            <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>{products[0].category.name}</h3>
          </div>
          <div className='product-items grid'>
            {displayedProducts.map((product) => (
              <div className='product-item bg-white' key={product.id} onClick={() => viewModalHandler(product)}>
                <div className='product-item-img'>
                  <img src={product.images[0]} alt="" />
                  <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                </div>
                <div className='product-item-body'>
                  <h6 className="product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
                  <div className="product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={setCurrentPage}
      />
    </section>
  )

}

export default SingleCategory;
