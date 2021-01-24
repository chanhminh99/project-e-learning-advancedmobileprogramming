import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  data: {
    newCourses: [],
    ownCourses: [],
    topSaleCourses: [],
    topNewCourses: [],
    recommendedCourses: []
  }
}

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'get_top_sale_coures':
      return {data: {...state.data, topSaleCourses: action.payload}}
    default:
      return state
  }
}

const likeCourse = (dispatch) => async (courseId) => {
  try {
    const response = await elearningApi.post('/user/like-course', {courseId})
    console.log(response)
  } catch (err) {
    console.log(err.response.data)
  }
}

const getTopSellerCourses = (dispatch) => async () => {
  try {
    const response = await elearningApi.post('/course/top-sell', {
      page: 1,
      limit: 25
    })

    if (response.data.message === 'OK') {
      let courses = response.data.payload
      Promise.all(
        courses.map(async (course) => {
          const isLike = await elearningApi.get(
            `/user/get-course-like-status/${course.id}`
          )
          return isLike.data
        })
      ).then((rs) => {
        rs.map((flag, idx) => {
          courses[idx].likeStatus = flag.likeStatus
        })
        dispatch({
          type: 'get_top_sale_coures',
          payload: courses
        })
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

export const {Context, Provider} = createDataContext(
  courseReducer,
  {
    getTopSellerCourses,
    likeCourse
  },
  initialState
)
