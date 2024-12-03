import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './Components/Home/Home';
import { LoginPage } from './Components/Login/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Home'/>}></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
