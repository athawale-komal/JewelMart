
import api from "../../config/apiConfig";
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE,
    GET_ALL_ORDERS_ADMIN_REQUEST, GET_ALL_ORDERS_ADMIN_SUCCESS, GET_ALL_ORDERS_ADMIN_FAILURE,
    UPDATE_ORDER_STATUS_ADMIN_REQUEST, UPDATE_ORDER_STATUS_ADMIN_SUCCESS, UPDATE_ORDER_STATUS_ADMIN_FAILURE,
    DELETE_ORDER_ADMIN_REQUEST, DELETE_ORDER_ADMIN_SUCCESS, DELETE_ORDER_ADMIN_FAILURE,
    CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,
    GET_DELETED_HISTORY_REQUEST, GET_DELETED_HISTORY_SUCCESS, GET_DELETED_HISTORY_FAILURE,
    DELETE_HISTORY_ITEM_REQUEST, DELETE_HISTORY_ITEM_SUCCESS, DELETE_HISTORY_ITEM_FAILURE,
} from "./ActionTypes";

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post('/api/jewelmart/order/create', reqData);
        if (data.data?._id && reqData.navigate) {
            reqData.navigate(`/order/${data.data._id}`);
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.data });
        return data.data; // Return data for local use
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
        throw error;
    }
};

export const getOrderById = (id) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/jewelmart/order/${id}`);
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
    }
};

export const getOrderHistory = () => async (dispatch) => {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/orders/my-orders');
        dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: error.message });
    }
};

export const getAllOrdersAdmin = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_ADMIN_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/orders/admin-orders');
        dispatch({ type: GET_ALL_ORDERS_ADMIN_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_ALL_ORDERS_ADMIN_FAILURE, payload: error.message });
    }
};

export const updateOrderStatusAdmin = (id, status) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_ADMIN_REQUEST });
    try {
        const { data } = await api.put(`/api/jewelmart/order/status/${id}`, { status });
        dispatch({ type: UPDATE_ORDER_STATUS_ADMIN_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_STATUS_ADMIN_FAILURE, payload: error.message });
    }
};

export const deleteOrderAdmin = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_ADMIN_REQUEST });
    try {
        await api.delete(`/api/jewelmart/order/delete/${id}`);
        dispatch({ type: DELETE_ORDER_ADMIN_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_ORDER_ADMIN_FAILURE, payload: error.message });
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/jewelmart/order/cancel/${orderId}`);
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message });
    }
};

export const deleteUserOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
        await api.delete(`/api/jewelmart/order/user-delete/${orderId}`);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
};

export const getDeletedHistory = () => async (dispatch) => {
    dispatch({ type: GET_DELETED_HISTORY_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/orders/history');
        dispatch({ type: GET_DELETED_HISTORY_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_DELETED_HISTORY_FAILURE, payload: error.message });
    }
};

export const deleteHistoryItem = (itemId) => async (dispatch) => {
    dispatch({ type: DELETE_HISTORY_ITEM_REQUEST });
    try {
        await api.delete(`/api/jewelmart/order/history/${itemId}`);
        dispatch({ type: DELETE_HISTORY_ITEM_SUCCESS, payload: itemId });
    } catch (error) {
        dispatch({ type: DELETE_HISTORY_ITEM_FAILURE, payload: error.message });
    }
};
