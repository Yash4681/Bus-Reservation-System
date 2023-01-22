import React, { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/UserContext/userContext";
import CartItem from "./CartItem";

const Cart = () => {

    const context = useContext(userContext);
    const {user, cart, getUserCart, getUserData} = context;
    let navigate = useNavigate();
  
    //Get users items only
    const userCart = cart.filter((item) => {return item.name === user.name})

    //Calculate total price
    let total = 0;
    userCart.forEach(element => {
      total += element.price;
    });

    useEffect(() => {

      //Get users data and cart data if user is Logged-in
      if(localStorage.getItem("token")){
        getUserCart();
        getUserData();
      }else{
        navigate("/userlogin");
      }
      
      // eslint-disable-next-line
    }, []);

  return (
    <div className="position-relative">
        {userCart.length>0 ? <button className="btn btn-primary btn-lg position-absolute end-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Your Bus</button>: null}

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Your Buses</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <h3><div className="badge text-bg-secondary w-100"> Total= {total} Rs. </div></h3>
        <div className="offcanvas-body">
        <ol className="list-group list-group-numbered row">
        {userCart.map((item) => {
          return(
            <CartItem key={item._id} title={item.title} route={item.route} price={item.price} item={item}/>
          )
        })}            
            </ol>
        </div>
        </div>
    </div>
  )
}

export default Cart