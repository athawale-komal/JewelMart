import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './States/Auth/Reducer'
import productReducer from './States/Products/Reducer'
import cartReducer from './States/Cart/Reducer'
import orderReducer from './States/Order/Reducer'
import wishlistReducer from './States/Wishlist/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export default store