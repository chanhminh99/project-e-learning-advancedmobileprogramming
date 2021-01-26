import {useContext, useEffect} from 'react'
import {Context as CoursesContext} from '../context/CoursesContext'
import {Context as UserContext} from '../context/UserContext'

export default ({courseId = null}) => {
  const {
    state: {data}
  } = useContext(UserContext)
  const {
    getRecommendedCourses: getRecommended,
    getLatestCourseDetails
  } = useContext(CoursesContext)

  const userID = data.id

  const getRecommendedCourses = async () => {
    await getRecommended({id: userID, limit: 25, offset: 1})
  }

  const getLatestCourseDetailsByUser = async () => {
    await getLatestCourseDetails({courseId, userID})
  }

  return [getRecommendedCourses, getLatestCourseDetailsByUser]
}
