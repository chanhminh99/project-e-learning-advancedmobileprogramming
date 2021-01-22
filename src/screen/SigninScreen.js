import React, {useContext, useState} from 'react'
import {ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/common/TextHeader'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'
import NavLink from '../component/common/NavLink'
import Spacer from '../component/common/Spacer'
import Container from '../component/common/Container'

//Context
import {Context as AuthContext} from '../context/AuthContext'

const SigninScreen = ({screenProps}) => {
  const {state, signin, clearMessage, addErrorMessage} = useContext(AuthContext)
  const [visibleForgot, setVisibleForgot] = useState(false)

  const toggleOverlay = () => {
    setVisibleForgot(!visibleForgot)
  }

  const _onSubmitSigninForm = ({email, password}) => {
    if (!email || !password) {
      addErrorMessage('Please input valid your info')
    } else {
      signin({email, password})
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
