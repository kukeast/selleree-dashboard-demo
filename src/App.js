import './App.scss'
import Header from './view/Header';
import Dashboard from './view/Dashboard';
import { Route } from 'react-router-dom'
import ProductList from './view/ProductList';
import OrderList from './view/OrderList';

function App() {
  return (
    <>
      <Header/>
      <Route path="/" component={Dashboard} exact/>
      <Route path="/products" component={ProductList} exact/>
      <Route path="/orders" component={OrderList} exact/>
    </>
  );
}

export default App;
