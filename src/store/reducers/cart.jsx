import CartItem from '../../models/CartItem';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    items: {},
    totalAmount: 0,
};

export default cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProducet = action.product;
            const prodPrice = parseFloat(addedProducet.price);
            const prodTitle = addedProducet.title;

            let cartItem;

            if (state.items[addedProducet.id]) {
                // All ready have Item in Cart
                cartItem = new CartItem(
                    state.items[addedProducet.id].quantity + 1,
                    prodTitle,
                    prodPrice,
                    state.items[addedProducet.id].sum + prodPrice,
                );
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProducet.id]: cartItem,
                    },
                    totalAmount: state.totalAmount + prodPrice,
                };
            } else {
                cartItem = new CartItem(1, prodTitle, prodPrice, prodPrice);
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProducet.id]: cartItem,
                    },
                    totalAmount: state.totalAmount + prodPrice,
                };
            }

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;

            if (currentQty > 1) {
                // Reduce Quantity
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productTitle,
                    parseFloat(selectedCartItem.productPrice),
                    parseFloat(selectedCartItem.sum) -
                    parseFloat(selectedCartItem.productPrice),
                );

                updatedCartItems = {
                    ...state.items,
                    [action.productId]: updatedCartItem,
                };
            } else {
                updatedCartItems = {
                    ...state.items,
                };
                delete updatedCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice,
            };

        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = {
                ...state.items,
            };
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid];
            return {
                ...state,
                items: updatedItems,
                totalAmount: parseFloat(state.totalAmount) - parseFloat(itemTotal),
            };
    }
    return state;
};
