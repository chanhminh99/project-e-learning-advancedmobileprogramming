import {useContext} from 'react'
import {Context as AuthContext} from '../context/AuthContext'
import {Context as UserContext} from '../context/UserContext'

export default () => {
  const {signin} = useContext(AuthContext)
  const {getUserInfo} = useContext(UserContext)

  const signinAndGetUserInfo = async ({email, password}) => {
    const userInfo = await signin({email, password})
    getUserInfo(userInfo)
  }

  return [signinAndGetUserInfo]
}
