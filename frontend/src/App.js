import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './Components/Home/Home';
import { LoginPage } from './Components/Login/LoginPage';
import { SignupPage } from './Components/Login/SignupPage';
import { AllBooks } from './Components/Books/AllBooks';
import { BookInfo } from './Components/Books/BookInfo';
import { ErrorPage } from './Components/Error/ErrorPage';
import { SearchBooks } from './Components/Books/Search/SearchBooks';
import { DeleteBook } from './Components/Books/Modify/Delete/DeleteBook';
import { EditBook } from './Components/Books/Modify/Edit/EditBook';
import { AddBook } from './Components/Books/Modify/Add/AddBook';

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
            <Route path='Add' element={<AddBook />}></Route>
            <Route path='Edit/:id' element={<EditBook />}></Route>
            <Route path='Delete/:id' element={<DeleteBook />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
