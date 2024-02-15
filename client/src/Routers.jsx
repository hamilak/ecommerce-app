import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import UserList from './pages/UserList'
import ViewProducts from './pages/ViewProducts'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'

const Routers = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<SignUp />}></Route>
            <Route path='/login' element={<Home />}></Route>
            <Route path='/view-all-products' element={<ProductList />}></Route>
            <Route path='/view-products/:userId' element={<ViewProducts />}></Route>
            <Route path='/user-list' element={<UserList />}></Route>
            <Route path='/cart/:userId' element={<Cart />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routers