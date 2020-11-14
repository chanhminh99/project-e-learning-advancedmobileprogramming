import React from 'react'
import {View, StyleSheet} from 'react-native'
import Button from '../component/button'
import Input from '../component/form/input'
import {colors} from '../component/styles'

const SignIn = () => {
  return (
    <View style={styles.wrapperStyle}>
      <Input label='Email or username:' />
      <Input label='Password:' />
      <Button
        text='Sign in'
        textStyle={styles.textButtonWithBackground}
        style={{backgroundColor: colors.primary}}
        backgroundColor={colors.primary}
      />
      <Button
        text='Need help?'
        textStyle={styles.textButtonWithNoneBorderStyle}
        style={{marginTop: 0, marginBottom: 5}}
      />
      <Button
        text='Use Single Sign-On (SSO)'
        textStyle={styles.textButtonWithBorder}
        style={{...styles.borderButtonStyle}}
      />
      <Button
        text='Subscribe to PluraRez'
        textStyle={styles.textButtonWithBorder}
        style={{...styles.borderButtonStyle}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 100,
    marginHorizontal: 20
  },
  borderButtonStyle: {
    borderWidth: 1,
    borderColor: colors.primary
  },
  textButtonWithBackground: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500'
  },
  textButtonWithNoneBorderStyle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '300'
  },
  textButtonWithBorder: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600'
  }
})

SignIn.navigationOptions = () => ({
  title: 'Sign in'
})

export default SignIn
