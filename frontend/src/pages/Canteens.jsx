import { useEffect, useState } from "react"
import VanillaTilt from 'vanilla-tilt';

import { CanteensDataApi } from "../api/canteenApi"
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineReadMore } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import bc1 from '../assets/food_bc1.jpg';


export const CanteensPage = ()=>{
  useEffect(() => {
    const cards = document.querySelectorAll(".canteen_div");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 4,
        speed: 100, 
      }); 
    });
  });

  const [CanteensData,setCanteensData]=useState([]);
  const [ShowItems,setShowItems]=useState(true);
  const [ItemsData,setItemsData]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CanteensDataApi();
      setCanteensData(data || []);
    };
    fetchData();
  }, []);


  return(
    <main className="CanteensPage">
    {ShowItems?
      <section className="CanteensPlace">
        {
         CanteensData.map((data,index)=>{
          return(
           <div className="canteen_div BounceUp" key={index}>
            <div className="canteenImg">
                <img src={bc1} style={{height:"100%",width:"100%"}} />
            </div>
            <div className="canteenName">{data.canteenName}</div>
            <div className="canteenLocation"><CiLocationOn size={16}/>{data.location}</div>
            <div className="canteenItems" onClick={()=>{setShowItems(false);setItemsData(data || [])}}> <div style={{paddingBottom:'10px'}}>Items</div> <div><MdOutlineReadMore size={20}/></div> </div>
           </div>
          )
         })
        }
      </section>
    : <section><Single_CanteenItems_Show ItemsData={ItemsData} setShowItems={setShowItems}/></section>
    }

        
    </main>
  )
}













const Single_CanteenItems_Show = ({ItemsData,setShowItems})=>{
  console.log(ItemsData);
  const canteenName = ItemsData.canteenName;
  ItemsData=ItemsData.items;
  return(
    <main className="ItemsPage">
    <section className="ItemsPageHead">
      <div className="BackToCanteens" onClick={()=>{setShowItems(true);}} >
        <div><IoArrowBack size={28}/></div>
        <div style={{paddingBottom:'6px'}}>Back</div>
      </div>
      <div className="ItemsCanteenName">{canteenName}</div>
      
    </section>
    <section className="ItemsPlace">
    {
      ItemsData.map((data,index)=>{
        return(
         <div className="canteen_div BounceUp" key={index}>
          <div className="canteenImg">
              <img src={bc1} style={{height:"100%",width:"100%"}} />
          </div>
          <div className="ItemInfo">
            <div>{data.name}</div>
            <div>{data.category}</div>
          </div>
          <div className="ItemPrice">₹{data.price}/-</div>
         </div>
        )
      })
    }
    </section>
    </main>
  )
}