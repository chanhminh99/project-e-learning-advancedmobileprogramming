import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Container from '../component/common/Container'
import HeaderTitle from '../component/common/HeaderTitle'
const BrowserScreen = ({screenProps}) => {
  return (
    <Container theme={screenProps.theme}>
      <HeaderTitle text='Browser' screenProps={screenProps} />
    </Container>
  )
}

BrowserScreen.navigationOptions = ({screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent'
  }
}

const styles = StyleSheet.create({})

export default BrowserScreen
