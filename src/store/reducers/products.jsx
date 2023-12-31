import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from "../actions/actionType";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default productReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === "u1")
            };

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                "u1",
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };

        case UPDATE_PRODUCT:
            const productId = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productId].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                parseFloat(state.userProducts[productId].price)
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productId] = updatedProduct;

            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
            };
    }
    return state;
};