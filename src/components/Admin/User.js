import React, { useContext } from "react";
import userContext from "../../context/UserContext/userContext";

const User = (props) => {
  const context = useContext(userContext);
  const {deleteUser} = context;
  const {name, email, user} = props;

  return (
      <li className="list-group-item d-flex justify-content-between align-items-start my-2 col-md-9">
                <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>
                {email}
                </div>
                <button className="btn btn-outline-danger"><i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteUser(user._id);}}></i></button>
            </li>
  )
}

export default User
