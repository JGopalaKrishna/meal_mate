import axios from 'axios';

export const SignUp = async(UserData)=>{
  try{
    const res = axios.post("http://localhost:5000/api/auth/signup",UserData);
    // console.log("res");
    console.log(res);
    return res;
  }catch(err){
    console.error(err);
    // throw err;
  }
}

export const LogIn = async(UserData)=>{
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login",UserData);
      console.log(res);
      return res.data;
    }catch(err){
      console.error(err);
      throw err;
    }
  }