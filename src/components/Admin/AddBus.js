import React,{useContext, useState} from "react";
import busContext from "../../context/BusContext/busContext"


const AddBus = () => {
    const context = useContext(busContext);
    const {addBus} = context;

    const [bus, setBus] = useState({owner:"", title: "", route: "", price: ""})

    const handleClick = (e) => {
        e.preventDefault();

        //Add bus to DB
        addBus(bus.owner, bus.title, bus.route, bus.price);
        
        //Reset Add bus component
        setBus({owner:"", title: "", route: "", price: ""});    
    }

    const handleChange = (e) => {
        setBus({...bus, [e.target.name]: e.target.value})
    }

  return (
    <div className="container my-4">
      <h2>Add a Bus</h2>
      <form>
      <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            Owner
          </label>
          <input
            type="text"
            className="form-control"
            id="owner"
            name="owner"
            value={bus.owner}
            required
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={bus.title}
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
            id="route"
            name="route"
            value={bus.route}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
          price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={bus.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
