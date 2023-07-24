import './App.css';
import Form from './components/Form';
import { Route, Routes, useParams } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import { useState } from 'react';
import UpdateForm from './components/UpdateForm';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/products/update/:id/" element={<UpdateForm/>} />
      </Routes>
    </div>
  );
}

export default App;
