import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Container from '../component/common/Container'
import HeaderTitle from '../component/common/HeaderTitle'
const SearchScreen = ({screenProps}) => {
  return (
    <Container theme={screenProps.theme}>
      <HeaderTitle text='Search' screenProps={screenProps} />
    </Container>
  )
}

SearchScreen.navigationOptions = ({screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent'
  }
}

const styles = StyleSheet.create({})

export default SearchScreen
