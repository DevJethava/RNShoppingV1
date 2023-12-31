import API from "../../constants/API";
import Order from "../../models/Order";
import { ADD_ORDER, SET_ORDERS } from "./actionType";

export const setOrders = () => {
    return async dispatch => {
        // any async code you want!
        try {
            const response = await fetch(`${API.baseUrl}orders/u1.json`);

            if (!response) {
                throw new Error("Something went Wrong !!");
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }

            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            });
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
            const response = await fetch(`${API.baseUrl}orders/u1.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            });

            if (!response.ok) {
                console.log(response)
                throw new Error("Something went wrong !!");
            }

            const resData = await response.json();

            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: resData.name,
                    items: cartItems,
                    amount: totalAmount,
                    date: date
                }
            });
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    }
};