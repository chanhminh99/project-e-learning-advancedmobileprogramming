import React from 'react'

import Container from '../component/common/Container'
import HeaderTitle from '../component/common/HeaderTitle'
import NoData from '../component/courses/NoData'
const DownloadsScreen = ({screenProps}) => {
  return (
    <Container theme={screenProps.theme}>
      <HeaderTitle
        text='Downloads'
        fontWeightText='bold'
        screenProps={screenProps}
      />
      <NoData text='No Courses Downloaded' screenProps={screenProps} />
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
