import {
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_TO_CART,
  CLEAR_CART,
  ADD_TO_COMMANDE,
} from "./actionTypes";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: {
    ...item,
  },
});

export const updateQuantite = (cartItem, quantite) => ({
  type: UPDATE_QUANTITY,
  payload: {
    id: cartItem.id,
    quantite: quantite,
  },
});

export const removeCartItem = (id) => ({
  type: REMOVE_TO_CART,
  payload: {
    id,
  },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const addToCommande = (commande) => ({
  type: ADD_TO_COMMANDE,
  payload: {
    ...commande,
  },
});
