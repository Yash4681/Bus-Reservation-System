import React, {useContext} from "react";
import userContext from "../../context/UserContext/userContext";

const CartItem = (props) => {
  const usercontext = useContext(userContext);
  const {deleteCart} = usercontext;

  const {title, route, price, item} = props;

  return (
    <div>
        <li className="list-group-item d-flex justify-content-between align-items-start my-2">
                <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {route}
                </div>
                <div className='pe-5'>{price}</div>
                <button className='btn btn-outline-danger' onClick={()=>{deleteCart(item._id);}}><i className="fa-solid fa-trash-can mx-2"></i></button>
            </li>
    </div>
  )
}

export default CartItem