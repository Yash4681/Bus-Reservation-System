import React from "react";
// import userContext from "../../context/UserContext/userContext";
import User from "./User";

const UserList = (props) => {
  // const context = useContext(userContext);
  // const { user, getUsers } = context;
    const {user} = props;

  // useEffect(() => {
  //   getUsers();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className='container my-4' >
        <ol className="list-group list-group-numbered row">
        {user.map((item) => {
          return(
            <User key={item._id} name={item.name} email={item.email} user={item}/>
          )
        })}            
            </ol>
    </div>
  )
}

export default UserList
