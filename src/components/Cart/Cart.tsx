import React, { useContext } from 'react';
import { ProductContext, ProductContextType } from '../../providers/ProductContextProvider/ProductContext';
import { ProductType } from '../../types/types';
import s from './Cart.module.css'
const Cart = () => {

  const {
    cartItems,
    removeItem,
    handleRemoveItem,
    addItem
  } = useContext<ProductContextType>(ProductContext);

  const total = cartItems.reduce((acc, item) => Number((acc + item.price).toFixed(2)), 0);

  const plusItem = (product: ProductType) => {
    addItem(product)
  }

  const delItem = (product: ProductType) => {
    handleRemoveItem(product)
  }

  const removeProduct = (product: ProductType) => {
    removeItem(product);
  };

  return (
    <>
      <table className={s.cartTable}>
        <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {cartItems.map((product) => (
          <tr key={product.id}>
            <td>{product.category.name}</td>
            <td>{product.name}</td>
            <td>{product.count}</td>
            <td>{product.price + "$"}</td>
            <td>
              <div>
                <button onClick={() => delItem(product)}>(-)</button>
                <button onClick={() => removeProduct(product)}>Удалить</button>
                <button onClick={() => plusItem(product)}>(+)</button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className={s.cartTotal}>
        <span>Total amount</span>
        <p>{total === 0 ? 'Shopping cart is empty' : total + '$'}</p>
      </div>
    </>
  );

}

  export default Cart;