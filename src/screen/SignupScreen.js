import React, {useContext} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/TextHeader'
import NavLink from '../component/NavLink'
import SafeView from '../component/SafeView'
import Spacer from '../component/Spacer'
import KeyboardIntelligent from '../component/KeyboardIntelligent'

//Context
import {Context as AuthContext} from '../context/AuthContext'

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
    <KeyboardIntelligent>
      <ScrollView>
        <View style={styles.wrapperStyle}>
          <NavigationEvents
            onWillFocus={() => {
              clearMessage()
            }}
          />
          <TextHeader text='Sign up for PluralRez' />
          <Spacer>
            <AuthForm
              isSignupForm
              submitButtonText='Sign in'
              onSubmit={_onSubmitSignupForm}
              errorMessage={state.errorMessage}
              message={state.message}
            />
            <NavLink
              text='Already have an account? '
              textRouteName='Sign in'
              routeName='Signin'
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

SignupScreen.navigationOptions = () => ({
  headerShown: false
})

export default SignupScreen
