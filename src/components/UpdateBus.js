import React, { useContext, useRef, useState} from "react";
import busContext from "../context/BusContext/busContext";


const UpdateBus = () => {

    
  const context = useContext(busContext);
  const {editBus } = context;

    const [bus, setBus] = useState({id:"", etitle: "", eroute: "", eprice: ""})

    const handleClick = () => {
      editBus(bus.id, bus.etitle, bus.eroute, bus.eprice);
      refClose.current.click();
    }
  
    const updateBus = (currbus) => {
        ref.current.click();
        setBus({id: currbus._id, etitle:currbus.title, eroute:currbus.route, eprice:currbus.price});
      };
      
    const handleChange = (e) => {
        setBus({...bus, [e.target.name]: e.target.value})
    }

    
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
    </div>
  )
}

export default UpdateBus