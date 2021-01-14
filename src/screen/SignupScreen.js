import React, {useContext} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import styled from 'styled-components'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/common/TextHeader'
import NavLink from '../component/common/NavLink'
import Spacer from '../component/common/Spacer'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'

//Context
import {Context as AuthContext} from '../context/AuthContext'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`

const SignupScreen = () => {
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
    <Container>
      <KeyboardIntelligent>
        <ScrollView>
          <NavigationEvents
            onWillFocus={() => {
              clearMessage()
            }}
          />
          <TextHeader text='Sign up to PluralRez' />
          <Spacer>
            <AuthForm
              isSignupForm
              submitButtonText='Sign up'
              onSubmit={_onSubmitSignupForm}
              errorMessage={state.errorMessage}
              message={state.message}
            />
            <Spacer />
            <NavLink
              text='Already have an account? '
              textRouteName='Sign in'
              routeName='Signin'
            />
          </Spacer>
        </ScrollView>
      </KeyboardIntelligent>
    </Container>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1
  }
})

SignupScreen.navigationOptions = () => ({
  headerShown: false
})

export default SignupScreen
