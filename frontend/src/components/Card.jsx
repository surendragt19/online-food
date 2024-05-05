import React, { useEffect, useRef, useState } from "react";
import { useCartState, useCartDispatch } from './ContextReducer';

const Card = (props) => {
  const dispatch = useCartDispatch();
  const data = useCartState();

  const priceRef = useRef();
  const options = props.options;
  const priceOption = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    const finalPrice = qty * parseInt(options[size]);

    let food = data.find(item => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
      }
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
    }
  }

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card mt-3" style={{ minHeight: "400px" }}>
      <img src={props.foodItem.img} style={{ height: '200px', objectFit: 'fill' }} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">{props.foodItem.description}</p>
        <div className="container w-100 mb-10 text-center">
          <select className="h-100 bg-dark rounded text-white" value={qty} onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className="m-2 h-100 bg-dark rounded text-white" ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
            {priceOption.map((ele) => (
              <option key={ele} value={ele}>{ele}</option>
            ))}
          </select>
          <div className="d-inline">Price: {qty * parseInt(options[size])}</div>
        </div>
        <hr />
        <button className="btn bg-warning text-dark mx-1" onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Card;
