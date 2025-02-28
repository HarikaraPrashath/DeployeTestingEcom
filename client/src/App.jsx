import Home from '../src/page/home.jsx'
import Login from '../src/page/user/login.jsx'
import Register from '../src/page/user/register.jsx'
import AdminDashboard from '../src/page/admin/dashboard.jsx'
import Shop from '../src/page/shopping.jsx'
import Feature from '../src/page/feature.jsx'
import Contact from '../src/page/contact.jsx'
import Products from '../src/page/admin/product.jsx'
import ProductDescShopping from '../src/page/shoppingDescPage.jsx'
import ProductsUpdate from '../src/page/admin/dashboardUpdate.jsx'
import UserProfile from '../src/page/userPage/userProfile.jsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from '../src/hook/useAuthContext.jsx'

import './App.css'
import NavbarOther from './components/navba/navbarOther.jsx'

function App() {
  const { user } = useAuthContext()
  

  return (
    <BrowserRouter>
      <NavbarOther user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/feature' element={<Feature />} />
        <Route
          path="/admin-dashboard"
          element={user?.user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        <Route path='/productsUpdate/:id' element={<ProductsUpdate />} />
        <Route path='/userProfile/:id' element={user ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path='/productDescShopping/:id' element={<ProductDescShopping />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
