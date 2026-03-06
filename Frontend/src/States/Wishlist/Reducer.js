
import {
    GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, GET_WISHLIST_FAILURE,
    ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS, ADD_TO_WISHLIST_FAILURE,
    REMOVE_FROM_WISHLIST_REQUEST, REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAILURE
} from "./ActionTypes";

const initialState = {
    wishlist: null,
    loading: false,
    error: null,
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WISHLIST_REQUEST:
        case ADD_TO_WISHLIST_REQUEST:
        case REMOVE_FROM_WISHLIST_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_WISHLIST_SUCCESS:
            return { ...state, loading: false, wishlist: action.payload, error: null };

        case ADD_TO_WISHLIST_SUCCESS:
            return { ...state, loading: false, wishlist: action.payload, error: null };

        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlist: action.payload,
                error: null
            };

        case GET_WISHLIST_FAILURE:
        case ADD_TO_WISHLIST_FAILURE:
        case REMOVE_FROM_WISHLIST_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default wishlistReducer;
