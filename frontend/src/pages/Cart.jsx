import React from 'react';
import { useCartState, useCartDispatch } from '../components/ContextReducer';


export default function Cart() {
  const data = useCartState();
  const dispatch = useCartDispatch();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  const handleCheckOut = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch(`${window.location.origin}/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      if (response.status === 200) {
        alert("Order Confim")
        dispatch({ type: "DROP" });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody className='text-white'>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0 text-white" onClick={handleRemove}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
