import { addToCart, emptyCart, removeToCart, add_q } from '../redux/action';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { productList } from '../redux/productAction';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
function Main() {
    let navigate = useNavigate()
    const [listOfUsers, setListOfUsers] = useState([]);
    useEffect(() => {
        //axios.get(`http://localhost:5001/api/auth/products?email=${localStorage.getItem('userEmail')}`).then((response) => {
        axios.get(`http://localhost:5001/api/auth/products`,{
            headers: {
                'Content-Type': 'application/json'
            },
            params:({
                email:localStorage.getItem('userEmail')
            })
        }).then((response) => {
          setListOfUsers(response.data);
        });
      }, []);

      
      const [listOfOrders, setListOfOrders] = useState([]);

      const dispatch = useDispatch();
      // 4. How we get data from redux store
      let data1 = useSelector((state)=>state.prodata);  
      const createorder = () => {
        const mail = localStorage.getItem('userEmail')
        console.log(mail)
        axios.post("http://localhost:5001/api/auth/addpp", {
          mail,
          data1,
        }).then((response) => {
          setListOfOrders([
            ...listOfOrders,
            {
              mail,
              data1,
            },
          ]);
        });
        navigate("/carty")
      };
      // 5. above we sent whole collection in an entry
      // 6. To send individual entries we require usestate

  return (
    <div>
      <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' ></form>
      <div>
      {/* <button onClick={() => dispatch(emptyCart())}>Empty Cart</button> */}
      </div>
      <div className='product-container'>
        {
          listOfUsers.map((item)=><div className='product-item'>
            <img src={item.photo} alt="" />
            <div>Name : {item.name} </div>
            <div>Color : {item.color} </div>
            <div>Price : {item.price} </div>
            <div>Category : {item.category} </div>
            <div>Brand : {item.brand} </div>
          </div>)
        }
      </div>
      <button onClick={createorder}>submit</button>
      <Link to="/" className="m-3 mx-1 btn btn-danger">cart</Link>
    </div>
  );
}

export default Main;


// 1. For e.preventDefault(); is a synthetic event for the caase of handlesubmit
// 2. let navigate = useNavigate() used for auto taking to a designated path 
// 3. setting and getting
// localStorage.setItem('token', json.authToken)    global.email = localStorage.getItem('userEmail');
