import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { NavBar } from './NavBar';
import { HomePage } from './Home';
import { CanteensPage } from './Canteens';
import { CartPage } from './Cart';
import { OrdersPage } from './Orders';
import { Registration } from './Register';
import { Login } from './Login';

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
            <Route path='/Cart' element={<CartPage/>}/>
            <Route path='/Orders' element={<OrdersPage/>}/>
            {/* <Route path='/' element={</>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutersFun;