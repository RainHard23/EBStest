import React, { createContext, useEffect, useState } from 'react';
import { CategoryType, ProductType } from '../../types/types';



// Создание контекста с начальным значением по умолчанию

export type ProductContextType = {
  products: ProductType[],
  categories: CategoryType[]
  setProducts: (products: ProductType[]) => void,
  setCategories: (categories: CategoryType[]) => void,
  cartItems: ProductType[]
  addItem: (product: ProductType)=> void
  removeItem: (product: ProductType)=> void
  handleRemoveItem: (product: ProductType)=> void
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  categories: [],
  setProducts: () => {},
  setCategories: () => {},
  cartItems: [],
  addItem: (product: ProductType)=> {},
  removeItem: (product: ProductType)=> {},
  handleRemoveItem: (product: ProductType)=> {},
});

const ProductContextProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);


  // Удалить полностью товар
  const removeItem = (product: ProductType) => {
    const updateItems = cartItems.filter((el) => el.id !== product.id)
    setCartItems(updateItems)
  }


  // Добавить с каталога в корзину/увеличить
  const addItem = (product: ProductType ) => {
    setCartItems(prev =>
      prev.find(item => item.id === product.id)
        ? prev.map(item => ({
          ...item,
          count: item.id === product.id ? item.count + 1 : item.count,
          price: item.id === product.id ? Number((item.price + product.price/product.count).toFixed(2)) : item.price,
        }))
        : [...prev, {...product, count: 1}],
    );
  };

  // Сделать на 1 меньше
  const handleRemoveItem = (product: ProductType) => {

    const delCartItems=cartItems.map(item=>{
      if(item.id !=product.id){
        return item
      } else {

        return{
          ...item,
          count:item.count - 1,
          price:Number((item.price - product.price/product.count).toFixed(2))
        }
      }
    }).filter(item=>item.count>0)

    setCartItems(delCartItems)
  };


  useEffect(() => {
    fetch('http://localhost:3001/api/products/')
      .then((response) => response.json())
      .then((data) => {
        const dataWithId = data.map((t:any)=>({...t,id: window.crypto.randomUUID(), count: 1}))
        console.log(dataWithId);
        setProducts(dataWithId)
      })
    fetch('http://localhost:3001/api/product/categories/')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  

  // Значение контекста, которое передается вниз по иерархии компонент
  const contextValue = {
    products,
    categories,
    setProducts,
    setCategories,
    cartItems,
    addItem,
    removeItem,
    handleRemoveItem,
  };


  return (
    <div>
      <ProductContext.Provider value={contextValue}>
        {children}
      </ProductContext.Provider>
    </div>


  );
};

export default ProductContextProvider;
