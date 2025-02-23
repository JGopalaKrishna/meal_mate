import axios from "axios";

export const CanteensDataApi = async()=>{
    try{
        const canteensDataSet = await axios.get("http://localhost:5000/api/canteens");
        // console.log(canteensDataSet);
        return canteensDataSet.data;
    }
    catch(err){
      // console.log(err);
      alert(err.message);
    }
}
