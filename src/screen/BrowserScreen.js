import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Foundation} from '@expo/vector-icons'
const BrowserScreen = () => {
  return (
    <View>
      <Text>BrowserScreen</Text>
    </View>
  )
}

BrowserScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({tintColor}) => (
      <Foundation name='page-multiple' size={24} color={tintColor} />
    )
  }
}

const styles = StyleSheet.create({})

export default BrowserScreen
