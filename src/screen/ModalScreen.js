import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import SettingScreen from '../screen/SettingScreen'
import styled from 'styled-components'
import {AntDesign} from '@expo/vector-icons'
import SettingAccount from './SettingAccount'
import ForgotPasswordScreen from './ForgotPasswordScreen'

const ModalWrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`

const ModalHeader = styled.View`
  background-color: ${(props) => props.theme.backgroundInput};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 50px;
`
const TextHeader = styled.Text`
  font-size: ${(props) => props.theme.font.size.largest}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`
const ModalScreen = ({navigation, screenProps}) => {
  const title = navigation.getParam('title')
  const previousScreen = navigation.getParam('preScreen')

  const renderScreen = (title) => {
    switch (title) {
      case 'Settings':
        return <SettingScreen screenProps={screenProps} />
      case 'Settings Account':
        return <SettingAccount screenProps={screenProps} />
      case 'Forgot Password':
        return <ForgotPasswordScreen screenProps={screenProps} />
      default:
        return null
    }
  }

  return (
    <ModalWrapper>
      <ModalHeader>
        <TextHeader>{title}</TextHeader>
        <AntDesign
          style={{
            position: 'absolute',
            right: screenProps.theme.spacing.gutterSize
          }}
          name='close'
          size={24}
          color={screenProps.theme.colors.primary}
          onPress={() =>
            previousScreen && previousScreen !== title
              ? navigation.navigate('MyModal', {
                  title: previousScreen
                })
              : navigation.goBack()
          }
        />
      </ModalHeader>

      {renderScreen(title)}
    </ModalWrapper>
  )
}

const style = StyleSheet.create({
  wrapperStyle: {
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ModalScreen
