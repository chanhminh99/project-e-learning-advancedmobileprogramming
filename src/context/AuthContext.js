import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  token: null,
  errorMessage: '',
  message: ''
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload}
    case 'clear_error_message':
      return {...state, errorMessage: ''}
    case 'signup':
    case 'signin':
      return {errorMessage: '', token: action.payload}
    case 'signout':
      return initialState
    default:
      return state
  }
}

const clearErrormessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'})
}

const signup = (dispatch) => async ({username, email, password, phone}) => {
  try {
    const response = await elearningApi.post('/user/signup', {
      username,
      email,
      password,
      phone
    })
    console.log(response.data)
    // await AsyncStorage.setItem('token', response.data.token)
    // dispatch({type: 'signup', payload: response.data.token})

    // navigate('TrackList')
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    })
    //   console.log(err.response.data)
  }
}

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({type: 'signin', payload: token})
    navigate('Home')
  } else {
    navigate('Signup')
  }
}

const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await elearningApi.post('/signin', {email, password})
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({type: 'signin', payload: response.data.token})

    navigate('Home')
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    })
  }
}

const signout = (dispatch) => async () => {
  //Handle signout
  await AsyncStorage.removeItem('token')
  dispatch({type: 'signout'})

  //   navigate('loginFlow')
}

export const {Context, Provider} = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrormessage,
    tryLocalSignin
  },
  initialState
)
