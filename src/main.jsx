import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { UserContextProvider } from './context/UserContext.jsx';
import Userinfo from './components/Userinfo.jsx';
import IncomeExpenses from './components/IncomeExpenses.jsx'
import Summary from './components/Summary.jsx'
import Review from './components/Review.jsx';
import PageNotFound from './components/PageNotFound.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
     <Route path='/' element={<Userinfo/>}/>
    <Route path='/incomeandExpenses' element={<IncomeExpenses/>}/>
    <Route path='/summary' element={<Summary/>}/>
    <Route path='/Review' element={<Review/>}/>
    <Route path='/*' element={<PageNotFound/>}/>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
