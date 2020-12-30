import React from 'react'
import {ScrollView} from 'react-native'
import {View, StyleSheet} from 'react-native'
import AuthForm from '../component/form/AuthForm'
import TextHeader from '../component/TextHeader'
import KeyboardIntelligent from '../component/KeyboardIntelligent'
import NavLink from '../component/NavLink'
import SafeView from '../component/SafeView'
import Spacer from '../component/Spacer'

const SigninScreen = () => {
  return (
    <SafeView>
      <KeyboardIntelligent>
        <ScrollView>
          <View style={styles.wrapperStyle}>
            <TextHeader text='Sign in for PluralRez' />
            <Spacer>
              <AuthForm submitButtonText='Sign in' />
              <NavLink
                text='Dont have an account? Sign up instead'
                routeName='Signup'
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

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

export default SigninScreen
