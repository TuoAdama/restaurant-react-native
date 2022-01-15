import { ADD_TO_COMMANDE } from "../actionTypes";


export const addToCommande = (commande) => ({
    type: ADD_TO_COMMANDE,
    payload: {
      ...commande,
    },
  });