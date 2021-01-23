import React from 'react'

import Container from '../component/common/Container'
import HeaderTitle from '../component/common/HeaderTitle'
const DownloadsScreen = ({screenProps}) => {
  return (
    <Container theme={screenProps.theme}>
      <HeaderTitle text='Downloads' screenProps={screenProps} />
    </Container>
  )
}

DownloadsScreen.navigationOptions = ({screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent'
  }
}

export default DownloadsScreen
