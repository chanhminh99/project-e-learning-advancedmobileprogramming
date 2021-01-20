import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  data: {
    id: '',
    email: '',
    avatar: '',
    name: '',
    favoriteCategories: [],
    phone: ''
  },
  msg: ''
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'clear_message':
      return {...state, msg: ''}
    case 'update_info':
      return action.payload
    case 'get_info':
      return {...state, data: action.payload}
    default:
      return state
  }
}

const clearMessage = (dispatch) => () => {
  dispatch({type: 'clear_message'})
}

const updateProfile = (dispatch) => async ({name, avatar, phone}) => {
  try {
    const response = await elearningApi.put('/user/update-profile', {
      name,
      avatar,
      phone
    })

    if (response.data.message === 'OK') {
      const {
        id,
        email,
        avatar,
        name,
        phone,
        favoriteCategories
      } = response.data.payload
      dispatch({
        type: 'update_info',
        payload: {
          data: {
            id,
            email,
            avatar,
            name,
            phone,
            favoriteCategories
          },
          msg: 'Update successfully!'
        }
      })
    }
  } catch (err) {
    console.log('err', err.response.data)
  }
}

const getUserInfo = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/user/me')
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
    getUserInfo,
    updateProfile,
    clearMessage
  },
  initialState
)
