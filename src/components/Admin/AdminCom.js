import React, { useContext, useEffect, useRef, useState} from "react";
import busContext from "../../context/BusContext/busContext";
import userContext from "../../context/UserContext/userContext";
import BusList from '../BusList'
import AddBus from './AddBus'
import UserList from "./UserList";

const AdminCom = () => {
  const context = useContext(busContext);
  const {editBus } = context;
  const usercontext = useContext(userContext);
  const { user, getUsers } = usercontext;

  useEffect(() => {
    getUsers();

    // eslint-disable-next-line
  }, []);
  
  const [bus, setBus] = useState({id:"", etitle: "", eroute: "", eprice: ""})
  const [on, setOn] = useState(false)
  const [busList, setBusList] = useState(false)
  const [userList, setUserList] = useState(false)
  const handleClick = () => {
    editBus(bus.id, bus.etitle, bus.eroute, bus.eprice);
    refClose.current.click();
  }

  const handleChange = (e) => {
      setBus({...bus, [e.target.name]: e.target.value})
  }

  const toggleOn = () => {
      if(on === false){
        setOn(true);
      }else{
        setOn(false);
      }
  }
  const toggleBusList = () => {
    if(busList === false){
      setBusList(true);
    }else{
      setBusList(false);
    }
}
const toggleUserList = () => {
  if(userList === false){
    setUserList(true);
  }else{
    setUserList(false);
  }
}

  const updateBus = (currbus) => {
    ref.current.click();
    setBus({id: currbus._id, etitle:currbus.title, eroute:currbus.route, eprice:currbus.price});
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <div className="container">
    <button
    type="button"
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    ref={ref}
  >
    Launch demo modal
  </button>

  <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Edit bus
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                value={bus.etitle}
                minLength={5}
                required
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="route" className="form-label">
                Route
              </label>
              <input
                type="text"
                className="form-control"
                id="eroute"
                name="eroute"
                value={bus.eroute}
                minLength={5}
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="eprice"
                name="eprice"
                value={bus.eprice}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref={refClose}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={handleClick}>
            Update bus
          </button>
        </div>
      </div>
    </div>
  </div>
    <div>
    <button className="btn btn-primary mx-4 my-4" onClick={toggleOn}> {on ? "close" : "Add Bus"}</button>
    <button className="btn btn-primary mx-4 my-4" onClick={toggleUserList}> {userList ? "close" : "Get UserList"}</button>
    <button className="btn btn-primary mx-4 my-4" onClick={toggleBusList}> {busList ? "close" : "Get BusList"}</button>
    {on && <AddBus />}
    {busList && <BusList updateBus={updateBus} admin="true"/>}
    {userList && <UserList user={user} />}
    </div>
    </div>
  )
}

export default AdminCom
