import React, {useContext, useState, useEffect} from 'react'
import {ScrollView, Platform, Text} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import Button from '../component/common/button'
import TextHeader from '../component/common/TextHeader'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'
import NavLink from '../component/common/NavLink'
import Spacer from '../component/common/Spacer'
import Container from '../component/common/Container'
import * as Google from 'expo-google-app-auth'
//Context
import {Context as AuthContext} from '../context/AuthContext'

const SigninScreen = ({screenProps}) => {
  const {
    state,
    signin,
    clearMessage,
    addErrorMessage,
    signinWithGoogle
  } = useContext(AuthContext)
  const [visibleForgot, setVisibleForgot] = useState(false)

  const _onSubmitSigninForm = ({email, password}) => {
    if (!email || !password) {
      addErrorMessage('Please input valid your info')
    } else {
      signin({email, password})
    }
  }
  const toggleOverlay = () => {
    setVisibleForgot(!visibleForgot)
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '398808999006-gq1llh40al0s53fnqdh985ghsfe70418.apps.googleusercontent.com',
        iosClientId:
          '398808999006-6vlg1ih8gcf9dhn3ofrhkdjfnadbqca9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        const {
          user: {email, id, photoUrl}
        } = result
        signinWithGoogle({email, id, photoUrl})
      } else {
        return {cancelled: true}
      }
    } catch (e) {
      addErrorMessage('Some thing when wrong')
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
          <Spacer>
            <TextHeader
              text='Welcome back'
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
          </Spacer>
          <Spacer>
            <AuthForm
              submitButtonText='Sign in'
              onSubmit={_onSubmitSigninForm}
              errorMessage={state.errorMessage}
              screenProps={screenProps}
              toggleOverlay={toggleOverlay}
              visibleForgot={visibleForgot}
            />
            <Spacer />
            <Button
              text='Sign in with Google'
              textColor={screenProps.theme.colors.primary}
              type='outline'
              onSubmit={async () => {
                await signInWithGoogleAsync()
              }}
            />
            <Spacer />
            <NavLink
              text='Dont have an account? '
              textRouteName='Sign up now'
              routeName='Signup'
            />
          </Spacer>
        </ScrollView>
      </KeyboardIntelligent>
    </Container>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

export default SigninScreen
