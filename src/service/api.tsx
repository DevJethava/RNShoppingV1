import axios from 'axios';

const baseURL = 'https://rnshoppingv1-default-rtdb.asia-southeast1.firebasedatabase.app/';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        // "content-type": "multipart/form-data",
        Accept: 'application/json',
    },
});

const getProductsListAPI = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.get("products.json");
            resolve(response.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const createProductAPI = (data: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.post(`products.json`, data);
            resolve(response.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const updateProductAPI = (productId: string, data: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.patch(`products/${productId}.json`, data);
            resolve(response.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const deleteProductAPI = (productId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.delete(`products/${productId}.json`);
            resolve(response.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const getOrdersListAPI = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.get('orders/u1.json');
            resolve(response.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const createOrderAPI = (data: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosInstance.post(`orders/u1.json`, data);
            resolve(response.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const API = {
    baseURL,
    axiosInstance,
    getProductsListAPI,
    getOrdersListAPI,
    createProductAPI,
    updateProductAPI,
    deleteProductAPI
};

export default API;