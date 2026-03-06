
import api from "../../config/apiConfig";
import {
    FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE
} from "./ActionTypes";

export const findProducts = () => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/products');
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const findProductById = (id) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/jewelmart/products/${id}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};

export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const { data } = await api.post('/api/jewelmart/products', productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
        throw error;
    }
};

export const updateProduct = (id, productData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const { data } = await api.put(`/api/jewelmart/products/${id}`, productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
        throw error;
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await api.delete(`/api/jewelmart/products/${id}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};
