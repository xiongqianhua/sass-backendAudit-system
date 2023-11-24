
import {combineReducers} from "redux"
import {SET_USER_DATA,GET_USER_DATA} from '../actions/index'
const initState = {}
const userDataReducer = (state = initState, action)=>{
    switch (action.type) {
		case SET_USER_DATA:
            return action.data
        case GET_USER_DATA:
            return action.data    
        default:
            return state  
        } 
}
const reducer = combineReducers({
	userDataReducer,
})
export default reducer