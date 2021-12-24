import {ADD_TO_CART, DELETE_TO_CART} from '../actionTypes'

const initialState =  {
    panier: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const exist = state.panier.findIndex((element) => element.id == action.payload.id) != -1
            if (!exist) {
                return {...state, panier: [...state.panier, action.payload]}
            }
            return state
        case DELETE_TO_CART:
            return {
                ...state,
                panier: state.panier.filter(item => item.id != action.payload.id)
            }
        default:
            return state
    }
}