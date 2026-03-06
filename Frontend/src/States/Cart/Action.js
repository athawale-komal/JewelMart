
import api from "../../config/apiConfig";
import {
    GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAILURE,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE
} from "./ActionTypes";

// Always re-fetch the full cart so totals stay accurate
const refetchCart = async (dispatch) => {
    try {
        const { data } = await api.get('/api/jewelmart/cart/get');
        dispatch({ type: GET_CART_SUCCESS, payload: data.data });
    } catch (e) {
        console.error("Cart refetch failed:", e.message);
    }
};

export const getCart = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/cart/get');
        dispatch({ type: GET_CART_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
};

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
        const { data } = await api.put('/api/jewelmart/cart/add', reqData);
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data.data });
        // Re-fetch to get accurate totals
        await refetchCart(dispatch);
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
        throw error;
    }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
        await api.delete(`/api/jewelmart/cart/${cartItemId}`);
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
        // Re-fetch to get accurate totals
        await refetchCart(dispatch);
    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
};

export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
        const { data } = await api.put(`/api/jewelmart/cart/${reqData.cartItemId}`, reqData.data);
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data.data });
        // Re-fetch to get accurate totals
        await refetchCart(dispatch);
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
};
