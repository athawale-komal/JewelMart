
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

const initialState = {
    addresses: [],
    loading: false,
    error: null,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_ADDRESS_REQUEST:
        case CREATE_ADDRESS_REQUEST:
        case UPDATE_ADDRESS_REQUEST:
        case DELETE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload,
                error: null,
            };
        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: [...state.addresses, action.payload],
                error: null,
            };
        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: state.addresses.map((a) =>
                    a._id === action.payload._id ? action.payload : a
                ),
                error: null,
            };
        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: state.addresses.filter((a) => a._id !== action.payload),
                error: null,
            };
        case GET_USER_ADDRESS_FAILURE:
        case CREATE_ADDRESS_FAILURE:
        case UPDATE_ADDRESS_FAILURE:
        case DELETE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default addressReducer;
