import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from "./constant"



export const cartData = (data = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [action.data, ...data]
            case REMOVE_FROM_CART:
                // data.length= data.length? data.length-1:[]
                const remainingItems= data.filter((item)=>item.id!==action.data)
                return [...remainingItems]
                case EMPTY_CART:
                    data =[]
                    return [...data]
        default:
            return data
    }
}

//Basically every action happens here, we check for cases and load given reducer collection accordingly

