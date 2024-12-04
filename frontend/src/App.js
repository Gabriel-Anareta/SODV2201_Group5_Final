import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './Components/Home/Home';
import { LoginPage } from './Components/Login/LoginPage';
import { SignupPage } from './Components/Login/SignupPage';
import { AllBooks } from './Components/Books/AllBooks';
import { BookInfo } from './Components/Books/BookInfo';
import { ErrorPage } from './Components/Error/ErrorPage';
import { SearchBooks } from './Components/Books/Search/SearchBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Home'/>}></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/Signup' element={<SignupPage />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/Error/:message' element={<ErrorPage />}></Route>
        <Route path='/Books' element={<AllBooks />}></Route>
        <Route path='/Books/:id' element={<BookInfo />}></Route>
        <Route path='/Books/Search' element={<SearchBooks />}></Route>
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
