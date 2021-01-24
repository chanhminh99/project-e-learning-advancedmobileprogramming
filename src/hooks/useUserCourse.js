import {useContext} from 'react'
import {Context as CoursesContext} from '../context/CoursesContext'
import {Context as UserContext} from '../context/UserContext'

export default () => {
  const {
    state: {data}
  } = useContext(UserContext)
  const {getRecommendedCourses: getRecommended} = useContext(CoursesContext)

  const userID = data.id

  const getRecommendedCourses = async () => {
    await getRecommended({id: userID, limit: 25, offset: 1})
  }

  return [getRecommendedCourses]
}
