import React from "react";
import book1 from "../../images/book1.jpg";
import { useStateValue } from "../Context/ContextProvider";
import "./Product.css";


const Product = ({ id,title, price, rating, image }) => {
    const [state, dispatch] = useStateValue();

    const addToBasket = ()=>{
        dispatch({
            type: "ADD_TO_BASKET",
            payload: {
                id,
                title,
                price,
                rating,
                image
            }
        })
    }
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} className="product__image" />
      <button className="product__addBtn" onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default Product;
