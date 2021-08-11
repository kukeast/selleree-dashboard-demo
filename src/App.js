import './App.scss'
import Header from './view/Header';
import SellerStatistics from './view/SellerStatistics';
import RecentProcucts from './view/RecentProcucts';
import { Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Header/>
      <Route path="/" component={RecentProcucts} exact/>
      <Route path="/statistics" component={SellerStatistics} exact/>
    </>
  );
}

export default App;
