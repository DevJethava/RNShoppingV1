import Order from "../../models/Order";
import { ADD_ORDER, SET_ORDERS } from "../actions/actionType";

const initialState = {
    orders: []
};

export default ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ORDERS:
            return {
                orders: action.orders
            }

        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                parseFloat(action.orderData.amount),
                action.orderData.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
};