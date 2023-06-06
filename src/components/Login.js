import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      global.email = localStorage.getItem('userEmail');
      console.log(global.email)
      navigate("/");

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{backgroundImage: 'url("https://mdbootstrap.com/img/Photos/Others/images/76.jpg")', height: '100vh', backgroundSize: 'cover' }}>
  <div className='d-flex align-items-center justify-content-center' style={{ height: '100%' }}>
    <form className='w-50 p-4 border bg-dark text-light rounded align-items-center' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control mt-3" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control mt-3" value={credentials.password} onChange={onChange} name='password' />
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
      <Link to="/signup" className="btn btn-danger">New User</Link>
    </form>
  </div>
</div>




  )
}




 