import {
  ADD_TO_CART,
  ADD_TO_COMMANDE,
  CLEAR_CART,
  REMOVE_TO_CART,
  UPDATE_QUANTITY,
} from "../actionTypes";

const initialState = {
  panier: [],
  commandes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const exist =
        state.panier.findIndex((element) => element.id == action.payload.id) !=
        -1;
      if (!exist) {
        return { ...state, panier: [...state.panier, action.payload] };
      }
      return state;
    case REMOVE_TO_CART:
      return {
        ...state,
        panier: state.panier.filter((item) => item.id != action.payload.id),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        panier: state.panier.map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, quantite: action.payload.quantite }
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        panier: [],
      };
    case ADD_TO_COMMANDE:
      return {
        ...state,
        commandes: [...state.commandes, action.payload],
      };
    default:
      return state;
  }
}
