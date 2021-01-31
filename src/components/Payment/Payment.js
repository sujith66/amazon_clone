import React, { useState,useEffect } from "react";
import BasketItem from "../BasketItem/BasketItem";
import { useStateValue } from "../Context/ContextProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import CurrencyFormat from "react-currency-format";
import { selectBasketTotal } from "../../reducers/reducer";
import baseURL from '../../api';
import {db} from '../../firebase';

const Payment = () => {

    const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
     const fetchSecretAgent = async()=>{
         const url = `${baseURL}/payment/create?total=${selectBasketTotal(basket) * 100}`;
         const response = await fetch(url, {method: 'POST', // or 'PUT'
         mode: 'cors',
         headers: {
           'Content-Type': 'application/json',
         }});
         const res = await response.json();
         setClientSecret(res.client_secret);
     }

     fetchSecretAgent();
  }, [basket]);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);

      await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement)
          }
      }).then(({ paymentIntent}) => {
          console.log(paymentIntent)

          db.collection('users').
          doc(user.uid).
          collection('orders').
          doc(paymentIntent.id).
          set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
          });

          setSucceeded(true);
          setProcessing(false);
          setError(null);

          dispatch({
              type: 'CLEAR_FROM_BASKET'
          });
          history.replace('/orders');
      })
  };

  return (
    <div className="payment">
      <div className="payment__checkout">
        <h1>
          <Link to="/checkout">Checkout ({basket.length} items)</Link>
        </h1>
      </div>
      <section className="payment__section">
        <div className="payment__title">
          <h3>Delivery Address</h3>
        </div>
        <div className="payment__address">
          <p>{user?.email}</p>
          <p>123 ABC street</p>
          <p>LA, CA</p>
        </div>
      </section>
      <section className="payment__section">
        <div>
          <h3>Review items and delivery</h3>
        </div>
        <div className="payment__items">
          {basket.map((item) => (
            <BasketItem
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </section>
      <section className="payment__section">
        <div className="payment__method">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceDetails">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3>
                      Order details: <strong>{value}</strong>
                    </h3>
                  </>
                )}
                decimalScale={2}
                value={selectBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button className="payment__btn" disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Pay now"}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Payment;
