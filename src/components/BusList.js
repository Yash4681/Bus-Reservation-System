import React, { useContext, useEffect, useState} from "react";
import busContext from "../context/BusContext/busContext";
import Bus from './Bus'
import Cart from "./User/Cart";
import SearchBar from './SearchBar'
import userContext from "../context/UserContext/userContext";


const BusList = (props) => {
  const context = useContext(busContext);
  const { bus, getBus } = context;
  const [newBus, setnewBus] = useState(bus)
  const usercontext = useContext(userContext);
  const {getUserData, user} = usercontext;


  const search = (e) => {
    // Filter Search
    const temp = bus.filter((item) => {return item.route === e});

    if(temp.length === 0){
      alert("Sorry Not Available");
    }

    setnewBus(temp);
  }

  useEffect(() => {
    //Get all bus data
    getBus();
    // Get user Data
    getUserData();

    // eslint-disable-next-line
  }, []);

  return (
    <div className='container my-4' >
      {props.admin==="true" ? null :<SearchBar search = {search} />}

      {/* Show Cart only if user is Logged-in */}
      {props.admin!=="true" && localStorage.getItem("token") && <Cart />}
      
        <ol className="list-group list-group-numbered row">
        {newBus.length===0 ? bus.map((item) => {
          return(
            <Bus key={item._id} title={item.title} route={item.route} price={item.price} user={user} updateBus={props.updateBus} bus={item} button={props.button} />
          )
        }) : newBus.map((item) => {
          return(
            <Bus key={item._id} title={item.title} route={item.route} price={item.price} user={user} updateBus={props.updateBus} bus={item} button={props.button} />
          )
        })}            
            </ol>
    </div>
  )
}

export default BusList
