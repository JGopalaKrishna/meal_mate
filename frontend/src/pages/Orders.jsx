import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { GetUserOrder_Api } from "../api/orderApi";
import { CreateOrderPayment_Api } from "../api/paymentApi";
import item1 from '../../public/item1.jpg';

export const OrdersPage = ()=>{
  const [AllOrders,setAllOrders]=useState([]);
  const [PaymetOrders,setPaymetOrders]=useState(null);
  useEffect(() => {
    if (PaymetOrders) {
      document.body.classList.add("no-scroll"); // Disable scrolling
    } else {
      document.body.classList.remove("no-scroll"); // Enable scrolling
    }
  }, [PaymetOrders]);

  useEffect(()=>{
    const featch = async()=>{
      const result = await GetUserOrder_Api();
      setAllOrders(result.data.reverse());
    }
    featch();
  },[])
  const CreateOrderPayment = async(money)=>{
    const data ={ 
      "amount":money,
      "currency":"INR" 
    }
    const result = await CreateOrderPayment_Api(data);
    setPaymetOrders(result.data);
  }
  console.log(AllOrders);
  return(
    <main className="OrderPage">
      <section className="OrdersPlace">
        {
          AllOrders.map((Order,index)=>{
            return(
              <div className="SingleOrder" key={index}>
                <div className="OrderHeader">
                  <div>{Order.updatedAt.replace("T", "  Time: ")} </div>
                  <div>Status: {Order.status}</div>
                </div>
                <div className="OrderItems">
                  {
                    Order.items.map((data,index)=>{
                      return( 
                        <div className="OrderItem_div" key={index}>
                          {/* <div className="ItemImg">
                            <img src={item1} style={{height:"100%",width:"100%"}} />
                          </div> */}
                          <div className="ItemInfo">{data.name}</div>
                          <div className="ItemInfo">{data.quantity}</div>
                          <div className="ItemPrice">₹{data.price}/-</div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="OrderMoney">
                  <div><span style={{color:"black"}}>TotalAmount =</span> ₹{Order.totalAmount}/-</div>
                  <div className="Button1Style shine_white_light" onClick={()=>{CreateOrderPayment(Order.totalAmount)}}>Creat a Order Payment</div>
                </div>
              </div>
            )
          })
        }
      </section>
      {PaymetOrders ?<PaymetOrdersShow data={PaymetOrders} closeDetails={() => setPaymetOrders(null)} /> : <></>}

    </main>
  )
}

const PaymetOrdersShow = (props)=>{
  const PaymentInfo = props.data;
  return(
    <section className="PaymentInfo_Area">
      <div className="PaymentInfo_div">
        <div className="PaymentInfo_Header">
          <div></div>
          <div>To Paymet</div>
          <div onClick={props.closeDetails}><IoClose size={40} color='red' /></div>
        </div>
        <div>
        <table>
          <tbody>
            <tr><td style={{fontWeight:"bold"}}>Id</td>:<td>{PaymentInfo.id}</td></tr>
            <tr><td style={{fontWeight:"bold"}}>Receipt</td>:<td>{PaymentInfo.receipt}</td></tr>
            <tr><td style={{fontWeight:"bold"}}>Amount</td>:<td>₹ {PaymentInfo.amount/100} /-</td></tr>
            <tr><td style={{fontWeight:"bold"}}>Amount_paid</td>:<td>₹ {PaymentInfo.amount_paid/100} /-</td></tr>
            <tr><td style={{fontWeight:"bold"}}>Amount_due</td>:<td>₹ {PaymentInfo.amount_due/100} /-</td></tr>
            <tr><td style={{fontWeight:"bold"}}>Currency</td>:<td>{PaymentInfo.currency}</td></tr>
            <tr><td style={{fontWeight:"bold"}}>Offer_Id</td>:<td>{PaymentInfo.offer_id ? PaymentInfo.offer_id:"no offer"}</td></tr>
          </tbody>
        </table>
        </div>
      </div>
    </section>
  )

}