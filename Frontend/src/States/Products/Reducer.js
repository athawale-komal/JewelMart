
import {
    FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS
} from "./ActionTypes";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };

        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, product: action.payload, error: null };

        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, products: [...state.products, action.payload], error: null };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.map((p) => p._id === action.payload._id ? action.payload : p),
                error: null
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter((p) => p._id !== action.payload),
                error: null
            };

        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case CREATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default productReducer;
