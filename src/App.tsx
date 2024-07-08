import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<h3>Main page</h3>} />
      <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
    </Routes>
  </Layout>
);

export default App;
