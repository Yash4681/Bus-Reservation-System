import React, {useState} from 'react'
import userContext from './userContext';


const UserState = (props) => {

    const host = "http://localhost:5000"

      const [user, setUser] = useState([]);
      const [cart, setCart] = useState([]);

    //Get all Users
    const getUsers = async () => {
        //API call
        const response = await fetch(`${host}/api/users/fetchallusers`, {
          method: 'GET',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token"),
            },
        });
        const json = await response.json(); 
        setUser(user.concat(json));
      }

    //Get  User
    const getUserData = async () => {
      //API call
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
    
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
          },
      });
      const json = await response.json(); 

      setUser(json);
    }

        //Delete a user
        const deleteUser = async (id) => {
          //API call
          const response = await fetch(`${host}/api/users/deleteuser/${id}`, {
            method: 'DELETE',
        
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
          });
          const json = await response.json(); 
          console.log(json);
  
          //rendering
          const newUsers = user.filter((user) => {return user._id !== id});
          setUser(newUsers);
        }

      //Add a Cart
      const addCart = async (name, email, owner, title, route, price) => {
        //API call
        const response = await fetch(`${host}/api/users/addcart`, {
          method: 'POST',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
          body: JSON.stringify({name, email, owner, title, route, price}) 
        });

        const newCart = await response.json();
        setCart(cart.concat(newCart));
      }

      //Get user cart
      const getUserCart = async () => {
        //API call
        const response = await fetch(`${host}/api/users/fetchcart`, {
          method: 'GET',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
        });
        const json = await response.json(); 

        setCart(json);
      }

      //Delete a cart
      const deleteCart = async (id) => {
        //API call
        const response = await fetch(`${host}/api/users/deletecart/${id}`, {
          method: 'DELETE',
      
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
        });
        const json = await response.json(); 
        console.log(json);

        //rendering
        const newCart = cart.filter((item) => {return item._id !== id});
        setCart(newCart);
      }

      return (
        <userContext.Provider value={{user, cart, getUsers, deleteUser, addCart, getUserCart, getUserData, deleteCart}}>
            {props.children}
        </userContext.Provider>
    )
}



export default UserState
