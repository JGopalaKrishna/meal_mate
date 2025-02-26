import axios from "axios";
const token = localStorage.getItem("token");
const _id = localStorage.getItem("_id");

export const CheckOutOrder_Api = async()=>{
  try{
    const res  = await axios.post("http://localhost:5000/api/orders/checkout",
      {},
      {
        headers:{
            "authorization":`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      }
    )
    return res;
  }catch(err){
    alert(err.message);
  }
}

export const GetUserOrder_Api = async()=>{
  try{
    const res = await axios.get(`http://localhost:5000/api/orders/user/${_id}`,
      {
        headers:{
          "authorization":`Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(res);
    return res;
  }
  catch(err){
    alert(err.message);
  }
}