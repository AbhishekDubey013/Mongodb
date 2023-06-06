import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import {Routes, Route, Form} from 'react-router-dom'
// import Cart from './components/Cart';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './components/Products';
import Carty from './components/Carty'
import Ree from './components/Ree'
import Form1 from './components/Form1'
//import Re from './components/Re'
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Main />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/carty' element={<Carty />} />
        <Route path='/From1' element={<Form1 />} />
        <Route path='/ree' element={<Ree />} />
      </Routes>
    </div>
  );
}

export default App;

//Define route in routes, always make component starting from capital letter