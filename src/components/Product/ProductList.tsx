import React, { useContext, useState } from 'react';
import { ProductType } from '../../types/types';
import { ProductContext, ProductContextType } from '../../providers/ProductContextProvider/ProductContext';
import s from './ProductList.module.css';
import { Link } from 'react-router-dom';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';

const ProductList = () => {
  const {
    products,
    setProducts,
    addItem,
    handleRemoveItem,
  } = useContext<ProductContextType>(ProductContext);

  const [sortOrderPrice, setSortOrderPrice] = useState<'ascending' | 'descending'>('ascending');


  const handleDelItem = (product: ProductType) => {
    handleRemoveItem(product);
  };

  const handleAddProduct = (product: ProductType) => {
    addItem(product);
  };

  // сортировка по цене
  const handleSortClickPrice = () => {
    if (sortOrderPrice === 'ascending') {
      setProducts([...products].sort((a, b) => b.price - a.price));
      setSortOrderPrice('descending');
    } else {
      setProducts([...products].sort((a, b) => a.price - b.price));
      setSortOrderPrice('ascending');
    }
  };


  // сортировка по категории
  const handleSortCategory = () => {
    setProducts([...products].sort((a, b) => {
      if (a.category.id < b.category.id) {
        return -1;
      }
      if (a.category.id > b.category.id) {
        return 1;
      }
      return 0;
    }));
  };


  return (
    <>
      <table className={s.table}>
        <thead>
        <tr className={s.tableHeader}>
          <th className={s.tableHeaderItem}>
            <div className={s.category}>
              Category
              <span
                className={s.sortCategory}
                onClick={handleSortCategory}
              >
                  Sort
                </span>
            </div>
          </th>
          <th className={s.tableHeaderItem}>Name</th>
          <th className={s.tableHeaderItem}>
            <div className={s.price}>
              Price
              <span onClick={handleSortClickPrice}>
                  {sortOrderPrice === 'ascending' ? (
                    <img src={arrowUp} alt='arrow up' />
                  ) : (
                    <img src={arrowDown} alt='arrow down' />
                  )}
                </span>
            </div>
          </th>
          <th className={s.tableHeaderItem}>Actions</th>
          <th className={s.tableHeaderItem}>
            <div>
              <Link to='/cart' className={s.cartItem}>
                Корзина
                <span role='img' aria-label='shopping cart'>
                    {'\uD83D\uDED2'}
                  </span>
              </Link>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.category.name}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <button
                className={s.buttonItemDel}
                onClick={() => handleDelItem(product)}
              >
                (-)
              </button>
              <button
                className={s.buttonItemChoose}
                onClick={() => handleAddProduct(product)}
              >
                Выбрать
              </button>
              <button
                className={s.buttonItemAdd}
                onClick={() => handleAddProduct(product)}
              >
                (+)
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;


