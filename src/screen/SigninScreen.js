import React, {useContext} from 'react'
import {ScrollView} from 'react-native'
import styled from 'styled-components'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/common/TextHeader'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'
import NavLink from '../component/common/NavLink'
import Spacer from '../component/common/Spacer'
//Context
import {Context as AuthContext} from '../context/AuthContext'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`

const SigninScreen = ({screenProps}) => {
  const {state, signin, clearMessage, addErrorMessage} = useContext(AuthContext)

  const _onSubmitSigninForm = ({email, password}) => {
    if (!email || !password) {
      addErrorMessage('Please input valid your info')
    } else {
      signin({email, password})
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
          <TextHeader text='Sign in to PluralRez' />
          <Spacer>
            <AuthForm
              submitButtonText='Sign in'
              onSubmit={_onSubmitSigninForm}
              errorMessage={state.errorMessage}
              screenProps={screenProps}
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
