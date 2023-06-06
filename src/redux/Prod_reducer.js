import { ADD_Q} from "./constant"

export const prodata = (data = [], action) => {
    switch (action.type) {
        case ADD_Q:
            console.log(data)
            return [action.data, ...data]
        default:
            return data
    }
}

