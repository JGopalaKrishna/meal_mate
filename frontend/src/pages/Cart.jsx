import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import { GetCartData } from "../api/cartApi"
import bc1 from '../assets/food_bc1.jpg';
import { RemoveCartItem_Api } from "../api/cartApi";
import { CheckOutOrder_Api } from "../api/orderApi";

export const CartPage = ()=>{
  const [ForPageLoad,setForPageLoad]=useState(false);
  useEffect(() => {
    const cards = document.querySelectorAll(".Cart_Div");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 4,
        speed: 100, 
      }); 
    });
  });

  const [CartData,SetCartData]= useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetCartData();
      SetCartData(data || []);
    };
    fetchData();
  },[ForPageLoad]);

  const ToRemoveAnItem = async(id)=>{
    const data = { itemId:id };
    const result = await RemoveCartItem_Api(data);
    alert(result.data.message);
    setForPageLoad(!ForPageLoad);
  }
  const TakeAOrder = async()=>{
    const result = await CheckOutOrder_Api();
    alert(result.data.message);
  }

  return(
    <main className="CartPage">
        <section className="CartPlace">
          {
            CartData.map((data,index)=>{
              return(
                <div className="Cart_Div" key={index}>
                  <div className="CartImg">
                    <img src={bc1} style={{height:"100%",width:"100%"}} />
                  </div>
                  <div className="CartCanteenName">{data.item?.canteen}</div>|
                  <div className="CartItemName">{data.item?.name}</div>|
                  <div className="CartItemquantity">{data.quantity}</div>|
                  <div className="CartItemPrice">₹{data.item?.price}/-</div>|
                  <div className="CartItemDel" onClick={()=>{ToRemoveAnItem(data.item._id)}}><MdDeleteForever size={28} color="red"/></div>
                </div>
              )
            })
          }
        </section>
        <section>
          <div><button className="Button1Style shine_white_light" onClick={TakeAOrder}>Place the Order</button></div>
        </section>
    </main>
  )
}