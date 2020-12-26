import React from 'react'
import {View, StyleSheet} from 'react-native'
import AuthForm from '../component/form/AuthForm'
import IconText from '../component/IconText'
import NavLink from '../component/NavLink'
import SafeViewArea from '../component/SafeViewArea'
import Spacer from '../component/Spacer'

const SignupScreen = () => {
  return (
    <SafeViewArea>
      <View style={styles.wrapperStyle}>
        <IconText text='Sign up for PluralRez' />
        <Spacer>
          <AuthForm isFormRegister submitButtonText='Sign in' />
          <NavLink text='Already have an account? Sign in' routeName='Signin' />
        </Spacer>
      </View>
    </SafeViewArea>
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
