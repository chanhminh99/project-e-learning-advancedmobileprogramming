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
    case 'change_pass':
    case 'send_reset_pass':
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

const forgotPassword = (dispatch) => async ({email}) => {
  try {
    await elearningApi.post('/user/forget-pass/send-email', {email})
    dispatch({type: 'send_reset_pass', payload: 'Send successfully!'})
  } catch (err) {
    console.log(err.response.data)
    dispatch({type: 'add_error', payload: err.response.data.message})
  }
}

const changePassword = (dispatch) => async ({
  id,
  currentPassword,
  newPassword
}) => {
  try {
    const response = await elearningApi.post('/user/change-password', {
      id,
      oldPass: currentPassword,
      newPass: newPassword
    })

    console.log(response.data)

    dispatch({
      type: 'change_pass',
      payload: 'Update new password successfully!'
    })
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with change password'
    })
  }
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
      dispatch({
        type: 'signup',
        payload:
          'Sign up successfully. Please go to email and active your account'
      })
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
      const response = await elearningApi.get('/user/me')
      navigate('Home', {
        avatar: response.data.payload.avatar
      })
    }
  } else {
    navigate('loginFLow')
  }
}

const signinWithGoogle = (dispatch) => async ({email, id, photoUrl}) => {
  try {
    const response = await elearningApi.post('/user/login-google-mobile', {
      user: {email, id}
    })
    console.log('alo', response.data)
    const {token} = response.data
    await AsyncStorage.setItem('token', token)
    dispatch({type: 'signin', payload: token})

    navigate('Home', {
      avatar: photoUrl
    })
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.response.data.message
    })
  }
}

const signin = (dispatch) => async ({email, password}) => {
  try {
    const response = await elearningApi.post('/user/login', {email, password})
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({type: 'signin', payload: response.data.token})
    const avatar = response.data.userInfo.avatar
    navigate('Home', {
      avatar
    })
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
  navigate('loginFLow')
}

export const {Context, Provider} = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    addErrorMessage,
    clearMessage,
    tryLocalSignin,
    changePassword,
    forgotPassword,
    signinWithGoogle
  },
  initialState
)
