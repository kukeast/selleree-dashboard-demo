import './App.scss'
import Header from './view/Header';
import Dashboard from './view/Dashboard';
import { Route } from 'react-router-dom'
import ProductList from './view/ProductList';
import SellerStatistics from './view/SellerStatistics'

function App() {
  return (
    <>
      <Header/>
      <Route path="/" component={Dashboard} exact/>
      <Route path="/product" component={ProductList} exact/>
      <Route path="/statistics" component={SellerStatistics} exact/>
    </>
  );
}

export default App;
