import Order from "../../models/Order";
import { API } from "../../service";
import { ADD_ORDER, SET_ORDERS } from "./actionType";

export const setOrders = () => {
    return async dispatch => {
        // any async code you want!
        try {
            const loadedOrders = [];

            await API.getOrdersListAPI().then((response) => {
                for (const key in response) {
                    loadedOrders.push(
                        new Order(
                            key,
                            response[key].cartItems,
                            response[key].totalAmount,
                            new Date(response[key].date)
                        )
                    );
                }

                dispatch({
                    type: SET_ORDERS,
                    orders: loadedOrders
                });
            }).catch((error) => {
                throw new Error("Something went Wrong !!");
            })
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    }
};

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date();

    return async dispatch => {
        // any async code you want!
        try {
            await API.createOrderAPI(JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })).then((response) => {
                dispatch({
                    type: ADD_ORDER,
                    orderData: {
                        id: response.name,
                        items: cartItems,
                        amount: totalAmount,
                        date: date
                    }
                });
            }).catch((error) => {
                console.log(error)
                throw new Error("Something went wrong !!");
            })
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    }
};