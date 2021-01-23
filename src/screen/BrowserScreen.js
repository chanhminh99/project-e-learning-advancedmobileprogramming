import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import styled from 'styled-components/native'
import {Tile} from 'react-native-elements'
import Container from '../component/common/Container'
import Spacer from '../component/common/Spacer'
import HeaderTitle from '../component/common/HeaderTitle'

const {width, height} = Dimensions.get('screen')

const WrapperContent = styled.View`
  align-items: center;
`

const BrowserScreen = ({screenProps}) => {
  return (
    <Container theme={screenProps.theme}>
      <HeaderTitle
        text='Browser'
        fontWeightText='bold'
        screenProps={screenProps}
      />
      <WrapperContent>
        <Tile
          height={width * 0.28}
          width={width * 0.95}
          imageSrc={require('../../assets/images/new_release.jpg')}
          imageProps={{resizeMode: 'cover'}}
          title='New Releases'
          titleStyle={{
            fontSize: screenProps.theme.font.size.default * 2.5,
            fontWeight: '600',
            textTransform: 'uppercase',
            paddingBottom: screenProps.theme.spacing.newGutterSize,
            marginBottom: -screenProps.theme.spacing.newGutterSize
          }}
          featured
        />
        <Spacer />
        <Tile
          height={width * 0.28}
          width={width * 0.95}
          imageSrc={require('../../assets/images/recommend.jpg')}
          title='Recommend for you'
          titleStyle={{
            fontSize: screenProps.theme.font.size.default * 2.5,
            fontWeight: '600',
            textTransform: 'uppercase',
            paddingBottom: screenProps.theme.spacing.newGutterSize,
            marginBottom: -screenProps.theme.spacing.newGutterSize
          }}
          featured
        />
      </WrapperContent>
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
