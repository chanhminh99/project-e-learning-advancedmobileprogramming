import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import {navigate} from '../navigationRef'

const instansce = axios.create({
  baseURL: 'http://api.dev.letstudy.org'
})

instansce.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      const decoded = jwt_decode(token)
      if (decoded.exp < Date.now() / 1000) {
        await AsyncStorage.removeItem('token')
        navigate('loginFlow')
      } else {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instansce
