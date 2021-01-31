import React from 'react'
import moment from 'moment';
import './Order.css'
import CurrencyFormat from 'react-currency-format';
import BasketItem from '../BasketItem/BasketItem';
const Order = ({orderData}) => {
    console.log(orderData)
    return (
        <div className="order"> 
            <h2>Order</h2>
            <p>{moment.unix(orderData?.data.created).format('MMMM DD YYYY')}</p>
<div className="order__id">
    <small>{orderData?.id}</small>
</div>
{
    orderData?.data?.basket.map(product => (
        <BasketItem
        id={product.id}
        title={product.title}
        image={product.image}
        price={product.price}
        rating={product.rating}
        isButtonVisible
        />
    ))
}
<CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="orders__details">Order total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={orderData.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
        </div>
    )
}

export default Order
