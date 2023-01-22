import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import busContext from "../context/BusContext/busContext";
import userContext from "../context/UserContext/userContext";

const Bus = (props) => {

  const { title, route, price, updateBus, bus, button, user, disable, client} = props;
  const context = useContext(busContext);
  const usercontext = useContext(userContext);
  const {deleteBus} = context;
  const {addCart} = usercontext;

  const navigate = useNavigate();

  const handleClick = () => {
    //Booking is not allowed if user is not logged-in
    if(!localStorage.getItem("token")){
      navigate("/userlogin");
      alert("Please Login first");
    }else{
      //Add item to cart
      addCart(user.name, user.email, bus.owner, title, route, price);
    }
  }

  return (
      <li className="list-group-item d-flex justify-content-between align-items-start my-2 col-md-9">
                <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {props.route}
                </div>
                {client && <div>
                <div className="fw-bold">Client</div>
                <div className='pe-5'> Name: {bus.name}</div>
                <div className='pe-5'> email: {bus.email}</div>
                </div>
                }
                <div className='pe-5'>{price} Rs.</div>
                
                {/* Different buttons for different component */}
                {button === "book" || button==="booked" ? <button disabled={disable} className="btn btn-outline-light" onClick={handleClick}><span className="badge bg-primary rounded-pill">{button}</span></button> : 
                (<div> <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteBus(bus._id);}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateBus(bus);}}></i> </div>)}
          
            </li>
  )
}

export default Bus
