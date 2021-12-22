import { Switch } from 'react-router-dom'
import GlobalStyle from './util/GlobalStyle';
import PrivateRoute from './util/PrivateRoute';
import Dashboard from './view/Dashboard';
import ProductList from './view/ProductList';
import OrderList from './view/OrderList';
import SellerFunnel from './view/SellerFunnel';
import PaymentSetting from './view/PaymentSetting';
import Seller from './view/Seller';
import Search from './view/Search';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Switch>
        <PrivateRoute header path="/" component={Dashboard} exact/>
        <PrivateRoute header path="/products" component={ProductList}/>
        <PrivateRoute header path="/orders" component={OrderList}/>
        <PrivateRoute header path="/funnel" component={SellerFunnel}/>
        <PrivateRoute header path="/payment-setting" component={PaymentSetting}/>
        <PrivateRoute path="/seller/:id" component={Seller}/>
        <PrivateRoute path="/search" component={Search}/>
      </Switch>
    </>
  );
}

export default App;
