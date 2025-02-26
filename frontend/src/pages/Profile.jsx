import { useNavigate } from "react-router-dom";
export const ProfilePage = ()=>{
  const navigation =useNavigate();  return(
    <main style={{padding:70}}>
        <section>
            <button className="Button1Style shine_white_light" style={{backgroundColor:"red",fontSize:"40px"}} onClick={()=>{localStorage.removeItem("token");navigation("/")}}>Logout</button>
        </section>
    </main>
  )    
}