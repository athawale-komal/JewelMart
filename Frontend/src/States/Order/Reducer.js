
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE,
    GET_ALL_ORDERS_ADMIN_SUCCESS, UPDATE_ORDER_STATUS_ADMIN_SUCCESS, DELETE_ORDER_ADMIN_SUCCESS
} from "./ActionTypes";

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_ORDER_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };

        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };

        case GET_ORDER_HISTORY_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };

        case GET_ALL_ORDERS_ADMIN_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };

        case UPDATE_ORDER_STATUS_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map((o) => o._id === action.payload._id ? action.payload : o),
                error: null
            };

        case DELETE_ORDER_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter((o) => o._id !== action.payload),
                error: null
            };

        case CREATE_ORDER_FAILURE:
        case GET_ORDER_BY_ID_FAILURE:
        case GET_ORDER_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default orderReducer;
