import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { NavBar } from './Header';
import { HomePage } from '../pages/Home';
import { CanteensPage } from '../pages/Canteens';
import { ItemsPage } from '../pages/Items';
import { CartPage } from '../pages/Cart';
import { OrdersPage } from '../pages/Orders';
import { Registration } from '../pages/Register';
import { Login } from '../pages/Login';
import { ProfilePage } from '../pages/Profile';

const RoutersFun = ()=>{
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Registration' element={<Registration/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/' element={<NavBar/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/canteens' element={<CanteensPage/>}/>
            <Route path='/Items' element={<ItemsPage/>}/>
            <Route path='/Cart' element={<CartPage/>}/>
            <Route path='/Orders' element={<OrdersPage/>}/>
            <Route path='/Profile' element={<ProfilePage/>}/>
            {/* <Route path='/' element={</>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutersFun;