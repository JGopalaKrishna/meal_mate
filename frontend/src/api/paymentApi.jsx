import axios from "axios";

export const CreateOrderPayment_Api = async(data)=>{
  try{
    const res = await axios.post("http://localhost:5000/api/payment/create-order",data);
    console.log(res);
    return res;
  }catch(err){
    alert(err.message);
  }
}
