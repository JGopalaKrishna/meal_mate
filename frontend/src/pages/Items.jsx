import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import { GetItemsList } from "../api/itemsApi"
import item1 from '../../public/item1.jpg';
import { AddCartItem_Api } from "../api/cartApi";

export const ItemsPage = ()=>{
  const location =useLocation();
  const [AddedTocart,setAddedTocart] = useState(false)
  const [Quntity,setQuntity] = useState(1)
  const [ItemsData,setItemsData]=useState([]);
  const [AllItemsDataListOriginal,setAllItemsDataListOriginal]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetItemsList();
      setAllItemsDataListOriginal(data || []);
      setItemsData(data || []);
    };
    fetchData();
  },[]);

  // searching by name and display
  useEffect(() => {
    if (location.state) {
      const searchedValue = location.state.toLowerCase();
      console.log(searchedValue);
      const SearchItem = AllItemsDataListOriginal.filter(data => data.name.toLowerCase().includes(searchedValue));
      setItemsData(SearchItem);
    }
    else{
      setItemsData(AllItemsDataListOriginal);
    }
    
  }, [location.state,AllItemsDataListOriginal]);



  const ItemAddToCart = async(itemId)=>{
    var data={itemId:itemId,quantity:Quntity};
    const result = await AddCartItem_Api(data);
    console.log(result);
    alert("Added to cart");
    setAddedTocart(false);
    setQuntity(1);
  }
  
  return(
    <main className="ItemsPageO">
         <section className="ItemsPlace">
            {
              ItemsData.map((data,index)=>{
                return(
                 <div className="Item_Div BounceUp" key={index}>
                  <div className="ItemImg">
                    <img src={item1} style={{height:"100%",width:"100%"}} />
                  </div>
                  <div className="ItemInfo">{data.name}</div>
                  <div className="ItemInfo">{data.category}</div>
                  <div className="ItemPrice">₹{data.price}/-</div>
                  <div className="ItemPrice">Quntity: <input type="number" min={1} value={Quntity} onChange={(e)=>setQuntity(e.target.value)} style={{width:"100px",fontSize:"16"}}/></div>
                  <div className="Rx3d">
                    <div id="dimension1" style={{transform: AddedTocart ? 'rotateX(0deg)' : 'rotateX(-90deg)',bottom: AddedTocart ? '0%' : '60%',}} onClick={()=>{setAddedTocart(false)}}>In Cart</div>
                    <div id="dimension2" style={{transform: AddedTocart ? 'rotateX(-90deg)' : 'rotateX(0deg)',top: AddedTocart ? '60%' : '0%',}} onClick={()=>{setAddedTocart(true);ItemAddToCart(data._id)}}>Add to Cart</div>
                    </div>
                 </div>
                )
              })
            }
            </section>
    </main>
  )
}