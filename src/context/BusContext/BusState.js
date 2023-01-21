import React, {useState} from 'react'
import busContext from './busContext';

const BusState = (props) => {
  const host = "http://localhost:5000"
    const busInitial = [];

      const [bus, setBus] = useState(busInitial)
      const[userBus, setUserBus] = useState([]);

      //Get all Bus
      const getBus = async () => {
        //API call
        const response = await fetch(`${host}/api/buses/fetchallbuses`, {
          method: 'GET',
      
          headers: {
            'Content-Type': 'application/json',
            },
        });
        const json = await response.json(); 

        setBus(json);
      }

      //Get user Bus
      const getUserBus = async () => {
        //API call
        const response = await fetch(`${host}/api/buses/fetchbuses`, {
          method: 'GET',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
        });
        const json = await response.json(); 

        setUserBus(json);
      }

      //Add a Bus
      const addBus = async (owner, title, route, price) => {
        //API call
        const response = await fetch(`${host}/api/buses/addbus`, {
          method: 'POST',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
          body: JSON.stringify({owner, title, route, price}) 
        });

        const newBus = await response.json();
        setBus(bus.concat(newBus))
      }

      //Delete a Bus
      const deleteBus = async (id) => {
        //API call
        const response = await fetch(`${host}/api/buses/deletebus/${id}`, {
          method: 'DELETE',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
        });
        const json = await response.json(); 
        console.log(json);

        //rendering
        const newBuses = bus.filter((bus) => {return bus._id !== id});
        setBus(newBuses);
      }

      //Edit a Bus
      const editBus = async (id, title, route, price) => {
          //API call
          const response = await fetch(`${host}/api/buses/updatebus/${id}`, {
            method: 'PUT',
        
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, route, price}) 
          });
          const json = await response.json(); 
          console.log(json);

          //Logic to edit in client
          let newBuses = JSON.parse(JSON.stringify(bus));
          for (let index = 0; index < newBuses.length; index++) {
            const element = newBuses[index];
            if(element._id === id){
              newBuses[index].title = title;
              newBuses[index].route = route;
              newBuses[index].price = price;
              break;
            }
          }
          setBus(newBuses);
      }


    return (
        <busContext.Provider value={{bus, userBus, addBus, deleteBus, editBus, getBus, getUserBus}}>
            {props.children}
        </busContext.Provider>
    )
}


export default BusState;