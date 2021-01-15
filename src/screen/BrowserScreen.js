import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const BrowserScreen = () => {
  return (
    <View>
      <Text>BrowserScreen</Text>
    </View>
  )
}

BrowserScreen.navigationOptions = ({screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent',
    headerShown: false
  }
}

const styles = StyleSheet.create({})

export default BrowserScreen
