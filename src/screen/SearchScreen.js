import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
const SearchScreen = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

SearchScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({tintColor}) => (
      <Ionicons name='search' size={24} color={tintColor} />
    )
  }
}

const styles = StyleSheet.create({})

export default SearchScreen
