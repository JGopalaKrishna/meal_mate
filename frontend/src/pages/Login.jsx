import { useState } from "react"
import '../styles/AllInOneStyle.css';
import { LogIn } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const Login = ()=>{
  const navigation =useNavigate();
  const [UserData,setUserData]=useState({
    "email":"",
    "password":"",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...UserData, [name]: value });
  };
  const ToLogin = async(event)=>{
    event.preventDefault();
    await LogIn(UserData)
    .then((result)=>{
      // console.log("result",result._id);
      localStorage.setItem("_id", result._id);
      const ele= document.querySelector(".Error_Print");
      ele.textContent ="Login successfully completed";
      ele.style.color="#83ff00"
      setTimeout(()=>{navigation("/")})
    })
    .catch((err)=>{
      console.log(err.response.data.message);
      // Display error message on the screen
      const errorElement = document.querySelector(".Error_Print");
      if (errorElement) {
        errorElement.textContent =err.response.data.message;
        errorElement.style.color="red]"
      }
    })
  }

  return(
    <main className="Login_Page">
        <h1 className='SideHeading' style={{backdropFilter:"blur(5px)"}}><span className='SideHeading_highLet'>L</span>ogin</h1>
      <section className="Login_section">
        <form className="Login_Form" onSubmit={ToLogin}>
          <label className="Label_Field">Email</label>
          <input type="email" name="email" className="Input_Field" onChange={handleInputChange} required/>
          <label className="Label_Field">Password</label>
          <input type="password" name="password" className="Input_Field" onChange={handleInputChange} required minLength={8}/>
          <button type="submit" className="Button1Style shine_white_light">Login</button>
        </form>
        <div className="Error_Print"></div>
        <div className="ToLogin">if you don'thave account please <span className="Login-To-Registration" onClick={()=>navigation("/Registration")}>Registration</span></div>
      </section>
    </main>
  )
}