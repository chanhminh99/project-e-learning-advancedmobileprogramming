import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  data: {
    courses: {
      data: [],
      total: 0,
      totalInPage: 0
    },
    instructors: {
      data: [],
      total: 0,
      totalInPage: 0
    }
  },
  history: []
}

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'delete_history_search':
      return {
        ...state,
        history: state.history.filter((value) => value.id !== action.payload)
      }
    case 'get_history_search':
      return {...state, history: action.payload}
    case 'clear_data_search':
      return {
        ...state,
        data: {
          courses: {
            data: [],
            total: 0,
            totalInPage: 0
          },
          instructors: {
            data: [],
            total: 0,
            totalInPage: 0
          }
        }
      }
    case 'search':
      return {...state, data: action.payload}
    default:
      return state
  }
}

const deleteHistory = (dispatch) => async ({id}) => {
  try {
    const response = await elearningApi.delete(
      `/course/delete-search-history/${id}`
    )
    if (response.data.message === 'OK') {
      dispatch({type: 'delete_history_search', payload: id})
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const clearData = (dispatch) => () => {
  dispatch({type: 'clear_data_search'})
}

const getSearchHistory = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/course/search-history')
    if (response.data.message === 'OK') {
      dispatch({
        type: 'get_history_search',
        payload: response.data.payload.data
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const search = (dispatch) => async ({
  keyword = '',
  token,
  limit = 10,
  offset = 1
}) => {
  try {
    const response = await elearningApi.post('/course/searchV2', {
      keyword,
      token,
      limit,
      offset
    })
    if (response.data.message === 'OK') {
      dispatch({
        type: 'search',
        payload: response.data.payload
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

export const {Context, Provider} = createDataContext(
  searchReducer,
  {
    search,
    clearData,
    getSearchHistory,
    deleteHistory
  },
  initialState
)
