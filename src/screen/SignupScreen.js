import React, {useContext} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import styled from 'styled-components'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/common/TextHeader'
import NavLink from '../component/common/NavLink'
import Spacer from '../component/common/Spacer'
import Container from '../component/common/Container'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'

//Context
import {Context as AuthContext} from '../context/AuthContext'

const SignupScreen = ({screenProps}) => {
  const {state, signup, clearMessage, addErrorMessage} = useContext(AuthContext)

  const _onSubmitSignupForm = ({
    username,
    email,
    password,
    confirmPassword,
    phone
  }) => {
    if (!username || !email || !password || !confirmPassword || !phone) {
      addErrorMessage('Please input valid your info')
    } else if (confirmPassword !== password) {
      addErrorMessage('The confirm password is not matching with the password')
    } else {
      signup({username, email, password, phone})
    }
  }
  return (
    <Container theme={screenProps.theme}>
      <KeyboardIntelligent>
        <ScrollView>
          <NavigationEvents
            onWillFocus={() => {
              clearMessage()
            }}
          />
          <Spacer />
          <TextHeader
            text='Create your account'
            textStyle={{color: screenProps.theme.text, textTransform: 'none'}}
          />
          <TextHeader
            text='Please enter your credentials in the form below'
            textStyle={{
              color: screenProps.theme.text,
              textTransform: 'none',
              fontSize: screenProps.theme.font.size.small,
              letterSpacing: 0
            }}
          />
          <AuthForm
            isSignupForm
            submitButtonText='Sign up'
            onSubmit={_onSubmitSignupForm}
            errorMessage={state.errorMessage}
            message={state.message}
            screenProps={screenProps}
          />
          <Spacer />
          <NavLink
            text='Already have an account? '
            textRouteName='Sign in'
            routeName='Signin'
          />
        </ScrollView>
      </KeyboardIntelligent>
    </Container>
  )
}

const styles = StyleSheet.create({})

SignupScreen.navigationOptions = () => ({
  headerShown: false
})

export default SignupScreen
