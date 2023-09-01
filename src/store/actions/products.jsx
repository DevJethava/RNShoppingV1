import Product from "../../models/Product";
import { API } from "../../service";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from "./actionType";

export const deleteproduct = (productId) => {
    return async dispatch => {
        try {
            await API.deleteProductAPI(productId).then(response => {
                dispatch({
                    type: DELETE_PRODUCT,
                    pid: productId
                });
            }).catch((error) => { throw new Error("Something went Wrong !!"); })

        } catch (err) {
            throw err;
        }
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code you want!
        try {
            await API.createProductAPI(JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })).then(response => {
                console.log(response)
                dispatch({
                    type: CREATE_PRODUCT,
                    productData: {
                        id: response.name,
                        title,
                        description,
                        imageUrl,
                        price
                    }
                });
            }).catch(error => {
                throw new Error("Something went wrong !!");
            })
        } catch (err) {
            // Send to custom analytics server
            throw err;
        }
    }
};

export const updateProduct = (productId, title, description, imageUrl) => {
    return async dispatch => {
        try {
            await API.updateProductAPI(productId, JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })).then(response => {
                dispatch({
                    type: UPDATE_PRODUCT,
                    pid: productId,
                    productData: {
                        title,
                        description,
                        imageUrl
                    }
                });
            }).catch(error => {
                throw new Error("Something went wrong !!");
            })
        } catch (err) {
            throw err;
        }
    };
};

export const setProduct = () => {
    return async dispatch => {

        const loadedProducts = [];

        await API.getProductsListAPI().then((result) => {
            for (const key in result) {
                loadedProducts.push(new Product(
                    key,
                    "u1",
                    result[key].title,
                    result[key].imageUrl,
                    result[key].description,
                    result[key].price
                ));
            }
        }, (error) => {
            throw new Error("Something went Wrong !");
        })

        // const response = await fetch(`${API.baseURL}products.json`);

        // const resData = await response.json();

        // for (const key in resData) {
        //     loadedProducts.push(new Product(
        //         key,
        //         "u1",
        //         resData[key].title,
        //         resData[key].imageUrl,
        //         resData[key].description,
        //         resData[key].price
        //     ));
        // }

        dispatch({
            type: SET_PRODUCT,
            products: loadedProducts
        });
    };
};