import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  id: '',
  email: '',
  avatar: '',
  name: '',
  favoriteCategories: [],
  phone: ''
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'get_info':
      return action.payload
    default:
      return state
  }
}

const getUserInfo = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/user/me')
    console.log(response.data)
    const {
      id,
      email,
      avatar,
      name,
      favoriteCategories,
      phone
    } = response.data.payload
    dispatch({
      type: 'get_info',
      payload: {id, email, avatar, name, favoriteCategories, phone}
    })
  } catch (err) {
    console.log(err.response.data)
  }
}

export const {Context, Provider} = createDataContext(
  userReducer,
  {
    getUserInfo
  },
  initialState
)
