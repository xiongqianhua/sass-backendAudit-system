import {SET_USER_DATA} from '../actions/index'
export const setUserLoginData = (params) => (dispatch) => { 
      dispatch({
        type: SET_USER_DATA,
        data: {userLoginData:params}
      })
}

