import React,{forwardRef} from "react";
import { useStateValue } from "../Context/ContextProvider";
import "./BasketItem.css";

const BasketItem = forwardRef(({ id, image, title, price, rating ,isButtonVisible},ref) => {

    const [{}, dispatch] = useStateValue();
    const removeFromBasket = ()=>{
        dispatch({
            type: "REMOVE_FROM_BASKET",
            payload: {
                id
            }
        })
    }

  return (
    <div className="basketItem" ref={ref}>
      <img src={image} alt="product" className="basketItem__prodImage" />
      <div className="basketItem__prodInfo">
        <p className="basketItem__prodTitle">{title}</p>
        <p className="basketItem__prodPrice">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="basketItem_prodRating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
        {!isButtonVisible && <button className="basketItem__removeBtn" onClick={removeFromBasket}>Remove from basket</button>}
      </div>
    </div>
  );
});

export default BasketItem;
