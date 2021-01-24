import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  data: {
    newCourses: [],
    ownCourses: [],
    topSaleCourses: [],
    topNewCourses: [],
    recommendedCourses: [],
    coursesWithCategory: []
  }
}

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'get_courses_with_category':
      return {data: {...state.data, coursesWithCategory: action.payload}}
    case 'get_own_courses':
      return {data: {...state.data, ownCourses: action.payload}}
    case 'get_recommend_courses':
      return {data: {...state.data, recommendedCourses: action.payload}}
    case 'get_top_sale_courses':
      return {data: {...state.data, topSaleCourses: action.payload}}
    case 'get_top_new_courses':
      return {data: {...state.data, topNewCourses: action.payload}}
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

const getCoursesWithCategory = (dispatch) => async (id) => {
  try {
    const response = await elearningApi.post('/course/search', {
      keyword: '',
      category: [id],
      limit: 25,
      offset: 1
    })

    if (response.data.message === 'OK') {
      let courses = response.data.payload.rows
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
          type: 'get_courses_with_category',
          payload: courses
        })
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const getOwnCourses = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/user/get-process-courses')

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
          type: 'get_own_courses',
          payload: courses
        })
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const getRecommendedCourses = (dispatch) => async ({id, limit, offset}) => {
  try {
    const response = await elearningApi.get(
      `/user/recommend-course/${id}/${limit}/${offset}`
    )

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
          type: 'get_recommend_courses',
          payload: courses
        })
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const getTopNewCourses = (dispatch) => async () => {
  try {
    const response = await elearningApi.post('/course/top-new', {
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
          type: 'get_top_new_courses',
          payload: courses
        })
      })
    }
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
          type: 'get_top_sale_courses',
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
    getOwnCourses,
    getTopSellerCourses,
    getTopNewCourses,
    getRecommendedCourses,
    getCoursesWithCategory,
    likeCourse
  },
  initialState
)
