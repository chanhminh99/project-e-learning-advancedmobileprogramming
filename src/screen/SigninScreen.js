import React, {useContext} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/TextHeader'
import KeyboardIntelligent from '../component/KeyboardIntelligent'
import NavLink from '../component/NavLink'
import SafeView from '../component/SafeView'
import Spacer from '../component/Spacer'
//Context
import {Context as AuthContext} from '../context/AuthContext'

const SigninScreen = () => {
  const {state, signin, clearMessage, addErrorMessage} = useContext(AuthContext)

  const _onSubmitSigninForm = ({email, password}) => {
    if (!email || !password) {
      addErrorMessage('Please input valid your info')
    } else {
      signin({email, password})
    }
  }
  return (
    <KeyboardIntelligent>
      <ScrollView>
        <View style={styles.wrapperStyle}>
          <NavigationEvents
            onWillFocus={() => {
              clearMessage()
            }}
          />
          <TextHeader text='Sign in for PluralRez' />
          <Spacer>
            <AuthForm
              submitButtonText='Sign in'
              onSubmit={_onSubmitSigninForm}
              errorMessage={state.errorMessage}
            />
            <NavLink
              text='Dont have an account? '
              textRouteName='Sign up instead'
              routeName='Signup'
            />
          </Spacer>
        </View>
      </ScrollView>
    </KeyboardIntelligent>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1
  }
})

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

export default SigninScreen
