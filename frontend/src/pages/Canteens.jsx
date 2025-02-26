import { useEffect, useState } from "react"
import VanillaTilt from 'vanilla-tilt';

import { CanteensDataApi } from "../api/canteenApi"
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineReadMore } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import bc1 from '../assets/food_bc1.jpg';
import item1 from '../../public/item1.jpg';
import { AddCartItem_Api } from "../api/cartApi";

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
  // console.log(ItemsData);
  const [AddedTocart,setAddedTocart] = useState(false)
  const [Quntity,setQuntity] = useState(1)
  const canteenName = ItemsData.canteenName;
  ItemsData=ItemsData.items;
  const ItemAddToCart = async(itemId)=>{
    var data={itemId:itemId,quantity:Quntity};
    const result = await AddCartItem_Api(data);
    // console.log(result);
    // alert("Added successfully");
    setAddedTocart(false);
    setQuntity(1);
  }
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
         <div className="Item_Div BounceUp" key={index}>
          <div className="ItemImg">
              <img src={item1} style={{height:"100%",width:"100%"}} />
          </div>
          <div className="ItemInfo">
            <div>{data.name}</div>
            <div>{data.category}</div>
          </div>
          <div className="ItemPrice">₹{data.price}/-</div>
          {/* <div className="ItemPrice">Quntity: <input type="number" min={1} value={Quntity} onChange={(e)=>setQuntity(e.target.value)} style={{width:"100px",fontSize:"16"}}/></div>
          <div className="Rx3d">
            <div id="dimension1" style={{transform: AddedTocart ? 'rotateX(0deg)' : 'rotateX(-90deg)',bottom: AddedTocart ? '0%' : '60%',}} onClick={()=>{setAddedTocart(false)}}>In Cart</div>
            <div id="dimension2" style={{transform: AddedTocart ? 'rotateX(-90deg)' : 'rotateX(0deg)',top: AddedTocart ? '60%' : '0%',}} onClick={()=>{setAddedTocart(true);ItemAddToCart(data._id)}}>Add to Cart</div>
           </div> */}
         </div>
        )
      })
    }
    </section>
    </main>
  )
}













