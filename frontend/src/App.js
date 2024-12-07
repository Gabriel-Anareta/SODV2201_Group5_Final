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
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/Login'/>}></Route>
          <Route path='/Login' element={<LoginPage />}></Route>
          <Route path='/Signup' element={<SignupPage />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/Error/:message' element={<ErrorPage />}></Route>
          <Route path='/Books'>
            <Route path='' element={<AllBooks />}></Route>
            <Route path=':id' element={<BookInfo />}></Route>
            <Route path='Search' element={<SearchBooks />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
