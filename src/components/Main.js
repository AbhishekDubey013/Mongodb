import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="text-center">
        <h1>Welcome to Your App</h1>
        <Link to="/ree" className="btn btn-danger">Ree</Link>
        <Link to="/From1" className="btn btn-danger">Form</Link>
      </div>
    </div>
  );
}

export default Main;

