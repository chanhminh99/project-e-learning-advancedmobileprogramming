import React, {useContext} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/TextHeader'
import NavLink from '../component/NavLink'
import SafeView from '../component/SafeView'
import Spacer from '../component/Spacer'
import KeyboardIntelligent from '../component/KeyboardIntelligent'

import {Context as AuthContext} from '../context/AuthContext'
import {colors} from '../component/styles'

const SignupScreen = () => {
  const {state, signup, clearMessage} = useContext(AuthContext)
  console.log(state)
  return (
    <SafeView>
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
                isFormRegister
                submitButtonText='Sign in'
                onSubmit={({username, email, password, phone}) =>
                  signup({username, email, password, phone})
                }
                errorMessage={state.errorMessage}
                message={state.message}
              />
              <NavLink
                text='Already have an account? Sign in'
                routeName='Signin'
              />
            </Spacer>
          </View>
        </ScrollView>
      </KeyboardIntelligent>
    </SafeView>
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
