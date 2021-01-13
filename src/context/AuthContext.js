import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
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
      return {...state, message: '', errorMessage: action.payload}
    case 'clear_message':
      return {...state, message: '', errorMessage: ''}
    case 'signup':
      return {...state, message: action.payload, errorMessage: ''}
    case 'signin':
      return {message: '', errorMessage: '', token: action.payload}
    case 'signout':
      return initialState
    default:
      return state
  }
}

const addErrorMessage = (dispatch) => (error) => {
  dispatch({type: 'add_error', payload: error})
}

const clearMessage = (dispatch) => () => {
  dispatch({type: 'clear_message'})
}

const signup = (dispatch) => async ({username, email, password, phone}) => {
  try {
    const response = await elearningApi.post('/user/register', {
      username,
      email,
      password,
      phone
    })
    if (response.data.message === 'OK') {
      try {
        await elearningApi.post('/user/send-activate-email', {
          email
        })

        dispatch({
          type: 'signup',
          payload:
            'Sign up successfully. Please go to email and active your account'
        })
      } catch (e) {
        console.log(e.message)
        dispatch({
          type: 'add_error',
          payload: 'Something went wrong with sign up'
        })
      }
    } else {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      })
    }
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.response.data.message
    })
  }
}

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    // Check if token is expiration
    const decoded = jwt_decode(token)
    if (decoded.exp < Date.now() / 1000) {
      await AsyncStorage.removeItem('token')
      navigate('loginFlow')
    } else {
      dispatch({type: 'signin', payload: token})
      navigate('mainFlow')
    }
  } else {
    navigate('loginFLow')
  }
}

const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await elearningApi.post('/user/login', {email, password})
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({type: 'signin', payload: response.data.token})
    console.log(response.data)
    navigate('mainFlow')
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.response.data.message
    })
  }
}

const signout = (dispatch) => async () => {
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
    addErrorMessage,
    clearMessage,
    tryLocalSignin
  },
  initialState
)
