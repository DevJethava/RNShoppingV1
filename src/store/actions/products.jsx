import Product from "../../models/Product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from "./actionType";

export const deleteproduct = (productId) => {
    return async dispatch => {
        try {
            await fetch(`${API.baseUrl}products/${productId}.json`, {
                method: 'DELETE',
            });

            dispatch({
                type: DELETE_PRODUCT,
                pid: productId
            });

        } catch (err) {
            throw err;
        }
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code you want!
        try {
            const response = await fetch(`${API.baseUrl}products.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price
                })
            });

            if (!response.ok) {
                console.log(response)
                throw new Error("Something went wrong !!");
            }

            const resData = await response.json();

            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    imageUrl,
                    price
                }
            });
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    }
};

export const updateProduct = (productId, title, description, imageUrl) => {

    return async dispatch => {
        try {
            await fetch(`${API.baseUrl}products/${productId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            });

            dispatch({
                type: UPDATE_PRODUCT,
                pid: productId,
                productData: {
                    title,
                    description,
                    imageUrl
                }
            });

        } catch (err) {
            throw err;
        }
    };
};

export const setProduct = () => {
    return async dispatch => {

        const response = await fetch(`${API.baseUrl}products.json`);

        const resData = await response.json();
        const loadedProducts = [];

        for (const key in resData) {
            loadedProducts.push(new Product(
                key,
                "u1",
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price
            ));
        }

        dispatch({
            type: SET_PRODUCT,
            products: loadedProducts
        });
    };
};