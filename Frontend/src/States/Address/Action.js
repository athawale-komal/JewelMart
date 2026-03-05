
import api from "../../config/apiConfig";
import {
    GET_USER_ADDRESS_REQUEST,
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_ADDRESS_FAILURE,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
} from "./ActionTypes";

export const getAddresses = () => async (dispatch) => {
    dispatch({ type: GET_USER_ADDRESS_REQUEST });
    try {
        const { data } = await api.get('/api/jewelmart/address/all');
        dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_USER_ADDRESS_FAILURE, payload: error.message });
    }
};

export const createAddress = (addressData) => async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    try {
        const { data } = await api.post('/api/jewelmart/address/create', addressData);
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data.data });
        return data.data;
    } catch (error) {
        dispatch({ type: CREATE_ADDRESS_FAILURE, payload: error.message });
        throw error;
    }
};

export const updateAddress = (id, addressData) => async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    try {
        const { data } = await api.put(`/api/jewelmart/address/update/${id}`, addressData);
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.message });
    }
};

export const deleteAddress = (id) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    try {
        await api.delete(`/api/jewelmart/address/delete/${id}`);
        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
    }
};
