import './App.scss'
import Dashboard from './view/Dashboard';
import { Route } from 'react-router-dom'
import ProductList from './view/ProductList';
import OrderList from './view/OrderList';
import LogIn from './view/LogIn';
import PrivateRoute from './view/PrivateRoute';

function App() {
  return (
    <>
      <button onClick={ () => localStorage.clear()}>ddd</button>
      <PrivateRoute path="/" component={Dashboard} exact/>
      <PrivateRoute path="/products" component={ProductList} exact/>
      <PrivateRoute path="/orders" component={OrderList} exact/>
      <Route path="/login" component={LogIn} exact/>
    </>
  );
}

export default App;
