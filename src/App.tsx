import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import NewMeal from './containers/NewMeal/NewMeal';
import Home from './containers/Home/Home';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-meal" element={<NewMeal />} />
        <Route path="/" element={<h3>Main page</h3>} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
    </Layout>
  );
};
export default App;
