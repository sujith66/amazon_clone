import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../Context/ContextProvider";
import { selectBasketTotal } from "../../reducers/reducer";
import { useHistory, Link } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input className="subtotal__input" type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={selectBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button className="subtotal__btn"><Link to='/payment'>Proceed to Checkout</Link></button>
    </div>
  );
}

export default Subtotal;