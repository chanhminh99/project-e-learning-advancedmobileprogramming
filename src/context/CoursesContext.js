import createDataContext from './createDataContext'
import elearningApi from '../api/elearning'
import {navigate} from '../navigationRef'

const initialState = {
  data: {
    newCourses: [],
    favoriteCourses: [],
    favoriteCoursesIndex: [],
    ownCourses: [],
    topSaleCourses: [],
    topNewCourses: [],
    recommendedCourses: [],
    coursesWithCategory: [],
    latestCourseDetails: {}
  },
  userLike: false,
  userBuyCourse: false
}

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'user_buy_course':
      return {...state, userBuyCourse: !state.userBuyCourse}
    case 'like_course':
      return {...state, userLike: !state.userLike}
    case 'get_latest_course_details':
      return {
        ...state,
        data: {...state.data, latestCourseDetails: action.payload}
      }
    case 'get_favorite_courses_index':
      return {
        ...state,
        data: {...state.data, favoriteCoursesIndex: action.payload}
      }
    case 'get_favorite_courses':
      return {...state, data: {...state.data, favoriteCourses: action.payload}}
    case 'get_courses_with_category':
      return {
        ...state,
        data: {...state.data, coursesWithCategory: action.payload}
      }
    case 'get_own_courses':
      return {...state, data: {...state.data, ownCourses: action.payload}}
    case 'get_recommend_courses':
      return {
        ...state,
        data: {...state.data, recommendedCourses: action.payload}
      }
    case 'get_top_sale_courses':
      return {...state, data: {...state.data, topSaleCourses: action.payload}}
    case 'get_top_new_courses':
      return {...state, data: {...state.data, topNewCourses: action.payload}}
    default:
      return state
  }
}

const likeCourse = (dispatch) => async ({courseId}) => {
  try {
    const response = await elearningApi.post('/user/like-course', {
      courseId
    })
    console.log('like')
    dispatch({type: 'like_course'})
  } catch (err) {
    console.log(err.response.data)
  }
}

const checkOutCourse = (dispatch) => async ({courseId}) => {
  try {
    const response = await elearningApi.post('/payment/get-free-courses', {
      courseId
    })
    if (response.data.message === 'OK') {
      dispatch({type: 'user_buy_course'})
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const getLatestCourseDetails = (dispatch) => async ({courseId, userId}) => {
  try {
    const response = await elearningApi.get(
      `/course/get-course-detail/${courseId}/${userId}`
    )

    if (response.data.message === 'OK') {
      const course = response.data.payload
      const isLike = await elearningApi.get(
        `/user/get-course-like-status/${course.id}`
      )
      course.likeStatus = isLike.data.likeStatus

      const ownCourse = await elearningApi.get(
        `/user/check-own-course/${course.id}`
      )

      let isOwn = false
      ownCourse.data.message === 'OK' && ownCourse.data.payload.isUserOwnCourse
        ? (isOwn = true)
        : (isOwn = false)
      course.isOwn = isOwn

      dispatch({
        type: 'get_latest_course_details',
        payload: course
      })
    }
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

const getFavoriteCoursesDetails = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/user/get-favorite-courses')

    if (response.data.message === 'OK') {
      const courses = response.data.payload
      Promise.all(
        courses.map(async (course) => {
          const isLike = await elearningApi.get(
            `/user/get-course-like-status/${course.id}`
          )
          const responseFull = await elearningApi.get(
            `course/get-course-info?id=${course.id}`
          )

          const courseFullInfo = responseFull.data.payload
          courseFullInfo.likeStatus = isLike.data.likeStatus
          return courseFullInfo
        })
      ).then((coursesFull) => {
        dispatch({
          type: 'get_favorite_courses_index',
          payload: coursesFull
        })
      })
    }
  } catch (err) {
    console.log(err.response.data)
  }
}

const getFavoriteCourses = (dispatch) => async () => {
  try {
    const response = await elearningApi.get('/user/get-favorite-courses')

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
          type: 'get_favorite_courses',
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
          const responseFull = await elearningApi.get(
            `course/get-course-info?id=${course.id}`
          )

          const courseFullInfo = responseFull.data.payload
          courseFullInfo.likeStatus = isLike.data.likeStatus
          return courseFullInfo
        })
      ).then((coursesFull) => {
        dispatch({
          type: 'get_own_courses',
          payload: coursesFull
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
    getFavoriteCourses,
    getFavoriteCoursesDetails,
    getTopSellerCourses,
    getTopNewCourses,
    getRecommendedCourses,
    getCoursesWithCategory,
    getLatestCourseDetails,
    likeCourse,
    checkOutCourse
  },
  initialState
)
