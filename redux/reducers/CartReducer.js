const INI_STATE = {
    carts: []
}

export const cartReducers = (state = INI_STATE, action) => {

    switch (action.type) {
        case "ADD_CART": {
            return {
                carts: [...state.carts, action.payload]
            }
        }
        default: return state
    }
}