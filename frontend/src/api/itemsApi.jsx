import axios from "axios";

export const GetItemsList = async()=>{
  try{
    const res = await axios.get("http://localhost:5000/api/items/");
    // console.log(res.data);
    return res.data;
  }
  catch(err){
    alert(err.message);
  }
}