import React from "react";
import BasketItem from "../BasketItem/BasketItem";
import { useStateValue } from "../Context/ContextProvider";
import Subtotal from "../Subtotal/Subtotal";
import FlipMove from 'react-flip-move';
import "./Checkout.css";

const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <section className="checkout__left">
        <img
          className="checkout__banner"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon2._CB423692699_.jpg"
          alt="checkout banner"
        />
        <div className="">
          <h2 className="checkout__title">Your shopping basket</h2>
          <FlipMove>
          {basket.map((basketItem) => (
            <BasketItem
              id={basketItem.id}
              title={basketItem.title}
              image={basketItem.image}
              price={basketItem.price}
              rating={basketItem.rating}
            />
          ))}
          </FlipMove>
        </div>
      </section>
      <section className="checkout__right">
        <Subtotal></Subtotal>
      </section>
    </div>
  );
};

export default Checkout;
