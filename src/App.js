import './App.scss'
import Dashboard from './view/Dashboard';
import { Route, Switch } from 'react-router-dom'
import ProductList from './view/ProductList';
import OrderList from './view/OrderList';
import LogIn from './view/LogIn';
import PrivateRoute from './view/PrivateRoute';
import Test from './view/Test';
import OrderDetail from './view/OrderDetail';

function App() {
  return (
    <>
      {/* <button onClick={ () => localStorage.clear()}>clear localstorage</button> */}
      <Switch>
        <PrivateRoute header path="/" component={Dashboard} exact/>
        <PrivateRoute header path="/products" component={ProductList}/>
        <PrivateRoute header path="/orders" component={OrderList}/>
        <PrivateRoute path="/order/:orderId" component={OrderDetail}/>
        <PrivateRoute header path="/test" component={Test}/>
        <Route path="/login" component={LogIn}/>
      </Switch>
    </>
  );
}

export default App;
