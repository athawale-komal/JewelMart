
import api from "../../config/apiConfig";
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
} from "./ActionTypes";

export const createPayment = (orderId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
        const { data } = await api.post(`/api/jewelmart/payment/create/${orderId}`, {});
        if (data.data?.paymentUrl) {
            window.location.href = data.data.paymentUrl;
        }
        dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data.data });
        return data.data; // Return data for local use
    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
        throw error;
    }
};

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });
    try {
        const { data } = await api.get(
            `/api/jewelmart/callback?payment_id=${reqData.paymentId}&payment_link_id=${reqData.paymentLinkId}&payment_link_status=${reqData.status}&orderId=${reqData.orderId}`
        );
        dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message });
    }
};
