import { useState } from 'react';
import { Link,Outlet } from "react-router-dom";

import '../styles/AllInOneStyle.css';
import { CgMenu } from "react-icons/cg";
import { RiCloseLargeFill } from "react-icons/ri";

export const NavBar = ()=>{
  const [show_menu,setshow_menu]=useState(false);
  const _id = localStorage.getItem("_id");
  return(
    <>
      <nav className='Navbar ComeFromTop'>
        <section><p className='MyName'>Meal Mate</p></section>
        <section className='MenuItemsList'>
            <Link to="/" className='MenuItem UnderLine'>Home</Link>
            <Link to="/canteens" className='MenuItem UnderLine'>Canteen</Link>
            <Link to="/Cart" className='MenuItem UnderLine'>Cart</Link>
            <Link to="/Orders" className='MenuItem UnderLine'>Orders</Link>
            {/* <Link to="/Certificates" className='MenuItem UnderLine'>Certificates</Link> */}
            {/* <Link to="/Experience" className='MenuItem UnderLine'>Experience</Link> */}
            {_id == null ? 
            <Link to="/Registration" className='MenuItem UnderLine'>Registration</Link>
            :
            <Link to="/Profile" className='MenuItem UnderLine'>Profile</Link>
            }
        </section>
        <section className='MenuItemsList_Phone_Icon' onClick={()=>{setshow_menu(!show_menu)}}>{show_menu ?<RiCloseLargeFill size={30}/>:<CgMenu size={30}/> }</section>
          <section className={show_menu ? 'MenuItemsList_Phone Animation1' : 'MenuItemsList_Phone'} >
            <Link to="/" className='MenuItem_Phone UnderLine'>Home</Link>
            <Link to="/canteens" className='MenuItem_Phone UnderLine'>Canteen</Link>
            <Link to="/Cart" className='MenuItem_Phone UnderLine'>Cart</Link>
            <Link to="/Orders" className='MenuItem_Phone UnderLine'>Orders</Link>
            {/* <Link to="/Certificates" className='MenuItem_Phone UnderLine'>Certificates</Link> */}
            {/* <Link to="/Experience" className='MenuItem_Phone UnderLine'>Experience</Link> */}
            {_id == null ? 
            <Link to="/Registration" className='MenuItem UnderLine'>Registration</Link>
            :
            <Link to="/Profile" className='MenuItem UnderLine'>Profile</Link>
            }         
          </section>
      </nav>
      <Outlet/>
    </>
  )
}
