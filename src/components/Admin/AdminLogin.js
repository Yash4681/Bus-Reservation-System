import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserLogin = () => {

  let navigate = useNavigate();

  const [cred, setCred] = useState({email: "", password: ""});

  const handleChange = (e) => {
      setCred({...cred, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
      e.preventDefault();

      //Authenticate using api
      const response = await fetch(`http://localhost:5000/api/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: cred.email, password: cred.password})
        });

        const json = await response.json();
        console.log(json);

        //Allow access to Admin component only if user is a valid admin
        if(json.success){
          localStorage.setItem("token", json.token);
          navigate("/admincom");
        }else{
          console.log("Invalid Details", "danger");
          alert("Not Alowed")
        }
  }

  return (
    <div className='container'>
    <h1 className="mx-4 my-4">Admin Login</h1>
        <form className='my-4'>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email"  className="form-control" id="email" name="email" value={cred.email} onChange={handleChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={cred.password} onChange={handleChange} id="password" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default UserLogin