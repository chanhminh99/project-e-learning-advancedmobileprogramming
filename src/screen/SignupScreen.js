import React, {useContext} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import AuthForm from '../component/form/AuthForm'
import IconText from '../component/IconText'
import NavLink from '../component/NavLink'
import SafeView from '../component/SafeViewArea'
import Spacer from '../component/Spacer'
import KeyboardIntelligent from '../component/KeyboardIntelligent'

import {Context as AuthContext} from '../context/AuthContext'

const mockData = {
  username: 'chanhminh99',
  email: 'chungminhchanh1999@gmail.com',
  phone: '09412214444',
  password: 'password'
}
const SignupScreen = () => {
  const {state, signup} = useContext(AuthContext)
  console.log(state)
  return (
    <SafeView>
      <KeyboardIntelligent>
        <ScrollView>
          <View style={styles.wrapperStyle}>
            <IconText text='Sign up for PluralRez' />
            <Spacer>
              <AuthForm
                isFormRegister
                submitButtonText='Sign in'
                onSubmit={(test) => console.log(test)}
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
