import {useContext} from 'react'
import {Context as AuthContext} from '../context/AuthContext'
import {Context as UserContext} from '../context/UserContext'

export default () => {
  const {
    state: {data}
  } = useContext(UserContext)
  const {changePassword} = useContext(AuthContext)

  const userID = data.id

  const updatePassword = async ({currentPassword, newPassword}) => {
    changePassword({id: userID, currentPassword, newPassword})
  }

  return [updatePassword]
}
