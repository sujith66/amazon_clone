export const initialState = {
  basket: [],
  user: null,
};
export const selectBasketTotal = (basket) => {
  let value = basket?.reduce((sum, item) => item.price + sum, 0);
  console.log(value);
  return value;
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
      case "CLEAR_FROM_BASKET":
      return {
        ...state,
        basket: []
      };
    case "REMOVE_FROM_BASKET":
      let copyOfBasket = [...state.basket];
      let index = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );
      index >= 0
        ? copyOfBasket.splice(index, 1)
        : console.error(
            `Could not find the element with ${index} from the basket`
          );
      return {
        ...state,
        basket: [...copyOfBasket],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
