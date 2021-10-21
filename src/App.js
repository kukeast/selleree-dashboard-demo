import './App.scss'
import Dashboard from './view/Dashboard';
import { Route, Switch } from 'react-router-dom'
import ProductList from './view/ProductList';
import OrderList from './view/OrderList';
import LogIn from './view/LogIn';
import PrivateRoute from './util/PrivateRoute';
import SellerFunnel from './view/SellerFunnel';
import GlobalStyle from './util/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Switch>
        <PrivateRoute header path="/" component={Dashboard} exact/>
        <PrivateRoute header path="/products" component={ProductList}/>
        <PrivateRoute header path="/orders" component={OrderList}/>
        <PrivateRoute header path="/funnel" component={SellerFunnel}/>
        <Route path="/login" component={LogIn}/>
      </Switch>
    </>
  );
}

export default App;
