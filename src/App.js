import { Route, Switch } from 'react-router-dom'
import GlobalStyle from './util/GlobalStyle';
import PrivateRoute from './util/PrivateRoute';
import Dashboard from './view/Dashboard';
import ProductList from './view/ProductList';
import OrderList from './view/OrderList';
import LogIn from './view/LogIn';
import SellerFunnel from './view/SellerFunnel';

function App() {
  window.localStorage.setItem("theme", "light")
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
