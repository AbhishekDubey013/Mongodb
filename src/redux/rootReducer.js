import {combineReducers} from 'redux'
import { cartData } from './reducer'
import {productData} from './productReducer'
import {prodata} from './Prod_reducer'
import {reducera} from './adreducer'
export default combineReducers({
    cartData,
    productData,
    prodata,
    reducera
})

// reducers basically are all the collection in use and we have to combine them, this file is used by store