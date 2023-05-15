import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from '../Product/ProductList';
import ProductContextProvider from '../../providers/ProductContextProvider/ProductContext';
import Cart from '../Cart/Cart';

const App = () => {
  return (
    <>
      <ProductContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </ProductContextProvider>
    </>
  );
};

export default App;
