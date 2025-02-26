import axios from "axios"

const token = localStorage.getItem("token");

export const GetCartData = async()=>{
  // console.log(token);
  try{
    const res = await axios.get("http://localhost:5000/api/cart/",{
        headers:{
            "authorization":`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    // console.log(res.data.items);
    return res.data.items;
  }
  catch(err){
    alert(err.message);
  }
}

export const AddCartItem_Api = async(data)=>{
  console.log(data);
  try{
    const res = await axios.post("http://localhost:5000/api/cart/add",
      data,
      {
        headers:{
            "authorization":`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      }
    );
    return res;
  }
  catch(err){
    alert(err.message);
  }
}

export const RemoveCartItem_Api = async(data)=>{
  console.log(data);
  try{
    const res = await axios.post("http://localhost:5000/api/cart/remove",
      data,
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