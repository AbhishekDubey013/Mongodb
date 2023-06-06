import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Cart = () => {
    const [listOfOrders, setListOfOrders] = useState([]);
    let amount = listOfOrders.length && listOfOrders.map(item=>item.price).reduce((prev, next)=>prev+next)
    useEffect(() => {
        axios.get("http://localhost:5001/api/auth/productsi",{
            headers: {
                'Content-Type': 'application/json'
            },
            params:({
                email:localStorage.getItem('userEmail')
            })
        }).then((response) => {
            setListOfOrders(response.data);
            console.log(response.data)
        });
      }, []);

    return (<div>
        <Link to="/" >Go to Products Link</Link>
        <h1>Cart Page</h1>
        <div className="cart-page-container">
            <table>
                <tr>
                    <td>Name</td>
                    <td>Color</td>
                    <td>Price</td>
                    <td>Brand</td>
                    <td>Category</td>
                </tr>
                {
                    listOfOrders.map((item) => <tr key={item.key}>
                        <td>{item.name}</td>
                        <td>{item.color}</td>
                        <td>{item.price}</td>
                        <td>{item.brand}</td>
                        <td>{item.category}</td>
                    </tr>)
                }
            </table>
            <div className="price-details">
                <div className="adjust-price"><span>Amount</span><span>{amount}</span></div>
                <div className="adjust-price"><span>Discount</span><span>{amount/10}</span></div>
                <div className="adjust-price"><span>Tax</span><span>000</span></div>
                <div className="adjust-price"><span>Total</span><span>{amount-(amount/10)}</span></div>

            </div>
        </div>
    </div>)
}

export default Cart;


// 1. For retrieveing data from back end we always use usestate and useeffect, 
// 2. usestate has state and useffect populates data for the first time  
// 3. Header is for data to JSON conversion, params for data to be passed
// 4. Here we have example of mathematical operation as well
// 5. We have format for table as well