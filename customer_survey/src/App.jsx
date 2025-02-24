import { useState } from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './App.css'
import RootLayout from './Layout/RootLayout';
import Main from './Components/Main';
import CustomerPage from './Components/CustomerPage';
import AdminPage from './Components/AdminPage';
import RatingQuestion from './Components/RatingQuestion';

function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/*" element={<RootLayout />}>
          <Route index element={<Main />}></Route>
          <Route path='customer' element={<CustomerPage />}></Route>
          <Route path='admin' element={<AdminPage />}></Route>
          <Route path='rating/:id' element={<RatingQuestion />}></Route>
      </Route>
    )
  )
  return (
    <RouterProvider router={router} className="App">

    </RouterProvider>
  )
}

export default App
