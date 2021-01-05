import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
const DownloadsScreen = () => {
  return (
    <View>
      <Text>DownloadsScreen</Text>
    </View>
  )
}

DownloadsScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons
        name='download-circle-outline'
        size={24}
        color={tintColor}
      />
    )
  }
}

const styles = StyleSheet.create({})

export default DownloadsScreen
