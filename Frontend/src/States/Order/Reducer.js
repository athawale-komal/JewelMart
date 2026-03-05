
import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAILURE,
    GET_ALL_ORDERS_ADMIN_SUCCESS, UPDATE_ORDER_STATUS_ADMIN_SUCCESS, DELETE_ORDER_ADMIN_SUCCESS,
    CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,
    GET_DELETED_HISTORY_REQUEST, GET_DELETED_HISTORY_SUCCESS, GET_DELETED_HISTORY_FAILURE,
    DELETE_HISTORY_ITEM_REQUEST, DELETE_HISTORY_ITEM_SUCCESS, DELETE_HISTORY_ITEM_FAILURE
} from "./ActionTypes";

const initialState = {
    orders: [],
    deletedHistory: [],
    order: null,
    loading: false,
    error: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_ORDER_HISTORY_REQUEST:
        case CANCEL_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
        case GET_DELETED_HISTORY_REQUEST:
        case DELETE_HISTORY_ITEM_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };

        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };

        case GET_ORDER_HISTORY_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };

        case GET_ALL_ORDERS_ADMIN_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };

        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                orders: state.orders.map((o) => o._id === action.payload._id ? action.payload : o),
                error: null
            };

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter((o) => o._id !== action.payload),
                error: null
            };

        case GET_DELETED_HISTORY_SUCCESS:
            return { ...state, loading: false, deletedHistory: action.payload, error: null };

        case DELETE_HISTORY_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                deletedHistory: state.deletedHistory.filter((i) => i._id !== action.payload),
                error: null
            };

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
        case CANCEL_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
        case GET_DELETED_HISTORY_FAILURE:
        case DELETE_HISTORY_ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default orderReducer;
