import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/constants";

export function cartReducer(
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };

    /*** end of add items ***/
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
}
