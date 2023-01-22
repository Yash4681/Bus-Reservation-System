import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  
  let navigate = useNavigate();

  const [cred, setCred] = useState({name:"", email: "", password: "", cpassword: ""});
  const [isOwner, setIsOwner] = useState(false);

  const handleChange = (e) => {
      setCred({...cred, [e.target.name] : e.target.value})
  }

  //For setting owner
  const toggle = () => {
    if(isOwner === false){
      setIsOwner(true);
    }else{
      setIsOwner(false);
    }
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
      const{name, email, password} = cred;

      //Create new user using api
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password, isOwner})
        });

        const json = await response.json();

        //If user already exist return alert
        if(json.success){
          localStorage.setItem("token", json.token);
          console.log(json);
          navigate("/buslist");
        }else{
          alert("Invalid Credentials");
        }
  }

  return (
    <div className="container mt-4">
    <h1 className="my-3">Create a account to use fakeBus</h1>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={handleChange}
          value = {cred.name}
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={handleChange}
          value = {cred.email}
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={cred.password}
          onChange={handleChange}
          id="password"
          minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name="cpassword"
          value={cred.cpassword}
          onChange={handleChange}
          id="cpassword"
          minLength={5}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" onClick={toggle} id="isOwner" />
        <label className="form-check-label" htmlFor="isOwner">Are you owner</label>
      </div>
      <button type="submit" className="btn btn-primary" >
        Submit
      </button>
    </form>
  </div>
  )
}

export default Register