import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const DownloadsScreen = () => {
  return (
    <View>
      <Text>DownloadsScreen</Text>
    </View>
  )
}

DownloadsScreen.navigationOptions = ({screenProps}) => {
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

export default DownloadsScreen
