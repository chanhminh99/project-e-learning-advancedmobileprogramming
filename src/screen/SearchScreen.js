import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const SearchScreen = () => {
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

SearchScreen.navigationOptions = ({screenProps}) => {
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

export default SearchScreen
