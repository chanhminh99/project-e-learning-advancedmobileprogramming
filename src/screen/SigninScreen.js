import React from 'react'
import {View, StyleSheet} from 'react-native'
import AuthForm from '../component/form/AuthForm'
import IconText from '../component/IconText'
import NavLink from '../component/NavLink'
import SafeViewArea from '../component/SafeViewArea'
import Spacer from '../component/Spacer'

const SigninScreen = () => {
  return (
    <SafeViewArea>
      <View style={styles.wrapperStyle}>
        <IconText text='Sign in for PluralRez' />
        <Spacer>
          <AuthForm submitButtonText='Sign in' />
          <NavLink
            text='Dont have an account? Sign up instead'
            routeName='Signup'
          />
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

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

export default SigninScreen
