import {useContext, useEffect} from 'react'
import {Context as CoursesContext} from '../context/CoursesContext'
import {Context as UserContext} from '../context/UserContext'

export default () => {
  const {
    state: {data},
    getUserInfo
  } = useContext(UserContext)
  const {getRecommendedCourses: getRecommended} = useContext(CoursesContext)

  useEffect(() => {
    getUserInfo()
  }, [])

  const userID = data.id

  const getRecommendedCourses = async () => {
    await getRecommended({id: userID, limit: 25, offset: 1})
  }

  return [getRecommendedCourses]
}
