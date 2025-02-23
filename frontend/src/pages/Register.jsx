import { useState } from "react"
import '../styles/AllInOneStyle.css';
import { SignUp } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const Registration = ()=>{
  const navigation =useNavigate();
  const [UserData,setUserData]=useState({
    "name":"",
    "email":"",
    "password":"",
    "address":"",
    "phone":""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...UserData, [name]: value });
  };
  const ToRegistration = async(event)=>{
    event.preventDefault();
    await SignUp(UserData)
    .then((result)=>{
      console.log(result.status);
      const ele= document.querySelector(".Error_Print");
      ele.textContent ="Register successfully completed";
      ele.style.color="#83ff00"
      setTimeout(()=>{navigation("/Login")},2000)
    })
    .catch((err)=>{
      console.log(err.response.data.message);
      // Display error message on the screen
      const errorElement = document.querySelector(".Error_Print");
      if (errorElement) {
        errorElement.textContent =err.response.data.message;
      }
    })
  }

  return(
    <main className="Registration_Page">
        <h1 className='SideHeading' style={{backdropFilter:"blur(5px)"}}><span className='SideHeading_highLet'>R</span>egister</h1>
      <section className="Registration_section">
        <form className="Registration_Form" onSubmit={ToRegistration}>
          <label className="Label_Field">Name</label>
          <input type="text" name="name" className="Input_Field" onChange={handleInputChange} required/>
          <label className="Label_Field">Email</label>
          <input type="email" name="email" className="Input_Field" onChange={handleInputChange} required/>
          <label className="Label_Field">Password</label>
          <input type="password" name="password" className="Input_Field" onChange={handleInputChange} required minLength={8}/>
          <label className="Label_Field">Address</label>
          <input type="text" name="address" className="Input_Field" onChange={handleInputChange} required/>
          <label className="Label_Field">Phone</label>
          <input type="text" name="phone" className="Input_Field" onChange={handleInputChange} required minLength={10} maxLength={10}/>
          <button type="submit" className="Button1Style shine_white_light">Register</button>
        </form>
        <div className="Error_Print"></div>
        <div className="ToLogin">if you have account please <span className="Registration-To-Login" onClick={()=>navigation("/Login")}>Login</span></div>
      </section>
    </main>
  )
}