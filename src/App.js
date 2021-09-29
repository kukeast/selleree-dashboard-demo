import './App.scss'
import Header from './view/Header';
import Dashboard from './view/Dashboard';
import { Route } from 'react-router-dom'
import ProductList from './view/ProductList';

function App() {
  return (
    <>
      <Header/>
      <Route path="/" component={Dashboard} exact/>
      <Route path="/product" component={ProductList} exact/>
    </>
  );
}

export default App;
