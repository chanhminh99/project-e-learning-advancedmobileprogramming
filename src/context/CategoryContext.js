import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  list: []
}

const catagoryReducer = (state, action) => {
  switch (action.type) {
    case 'get_all_category':
      return {...state, list: action.payload}
    default:
      return state
  }
}

const getAllCategory = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/category/all')
    if (response.data.message === 'OK') {
      dispatch({type: 'get_all_category', payload: response.data.payload})
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

export const {Context, Provider} = createDataContext(
  catagoryReducer,
  {
    getAllCategory
  },
  initialState
)
