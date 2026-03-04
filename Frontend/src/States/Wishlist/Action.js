
import api from "../../config/apiConfig";
import {
    GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, GET_WISHLIST_FAILURE,
    ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS, ADD_TO_WISHLIST_FAILURE,
    REMOVE_FROM_WISHLIST_REQUEST, REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAILURE
} from "./ActionTypes";

export const getWishlist = () => async (dispatch) => {
    dispatch({ type: GET_WISHLIST_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/wishlist/');
        dispatch({ type: GET_WISHLIST_SUCCESS, payload: data.wishlist });
    } catch (error) {
        dispatch({ type: GET_WISHLIST_FAILURE, payload: error.message });
    }
};

export const addToWishlist = (productId) => async (dispatch) => {
    dispatch({ type: ADD_TO_WISHLIST_REQUEST });
    try {
        const { data } = await api.post('/api/jewelmart/wishlist/add', { productId });
        dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: data.wishlist });
    } catch (error) {
        dispatch({ type: ADD_TO_WISHLIST_FAILURE, payload: error.message });
    }
};

export const removeFromWishlist = (productId) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });
    try {
        await api.delete(`/api/jewelmart/wishlist/${productId}`);
        dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({ type: REMOVE_FROM_WISHLIST_FAILURE, payload: error.message });
    }
};
