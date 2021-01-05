import React, {useContext, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
//Context
import {Context as UserContext} from '../context/UserContext'
const HomeScreen = () => {
  const {state: user, getUserInfo} = useContext(UserContext)
  useEffect(() => {
    getUserInfo()
    console.log(user)
  }, [])
  return (
    <View>
      <Text style={{color: '#fff'}}>HomeScreen</Text>
    </View>
  )
}

HomeScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({tintColor}) => (
      <AntDesign name='home' size={24} color={tintColor} />
    )
  }
}

const styles = StyleSheet.create({})

export default HomeScreen
