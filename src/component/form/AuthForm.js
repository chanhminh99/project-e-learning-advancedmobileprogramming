import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import Input from './input'
import {colors, font, spacing} from '../styles'
import Spacer from '../common/Spacer'
import {Button, Text} from 'react-native-elements'

import {NavigationEvents} from 'react-navigation'

const AuthForm = ({
  isSignupForm,
  onSubmit,
  submitButtonText,
  message,
  errorMessage
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')

  const _renderFormLogin = () => {
    return (
      <>
        <Input
          label='Email or username:'
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
        />
        <Input
          isPassword
          label='Password:'
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
        />
      </>
    )
  }

  const _renderFormRegister = () => {
    return (
      <>
        <Input
          label='Public Username:'
          onChangeText={(newValue) => setUsername(newValue)}
          value={username}
        />
        <Input
          label='Email:'
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
        />
        <Input
          isPassword
          label='Password:'
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
        />
        <Input
          isPassword
          label='Confirm Password:'
          onChangeText={(newPassword) => setConfirmPassword(newPassword)}
          value={confirmPassword}
        />
        <Input
          label='Phone Number:'
          onChangeText={(newPhone) => setPhone(newPhone)}
          value={phone}
        />
      </>
    )
  }

  return (
    <View style={styles.wrapperStyle}>
      <NavigationEvents
        onWillFocus={() => {
          setEmail('')
          setUsername('')
          setPassword('')
          setPhone('')
        }}
      />
      {isSignupForm ? _renderFormRegister() : _renderFormLogin()}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : message ? (
        <Text style={styles.successMessage}>{message}</Text>
      ) : null}
      <Spacer />
      <Button
        title={submitButtonText}
        onPress={() =>
          isSignupForm
            ? onSubmit({username, email, password, confirmPassword, phone})
            : onSubmit({email, password})
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: spacing.gutterSize
  },
  errorMessage: {
    fontSize: font.size.large,
    color: colors.customRed,
    marginLeft: spacing.newGutterSize * 2
  },
  successMessage: {
    fontSize: font.size.large,
    color: colors.customGreen,
    marginLeft: spacing.newGutterSize * 2
  },
  borderButtonStyle: {
    borderWidth: 1,
    borderColor: colors.primary
  },
  textButtonWithNoneBorderStyle: {
    color: colors.primary,
    fontSize: font.size.medium,
    fontWeight: '300'
  },
  textButtonWithBorder: {
    color: colors.primary,
    fontSize: font.size.largest,
    fontWeight: '600'
  }
})

AuthForm.navigationOptions = () => ({
  title: 'Sign in'
})

AuthForm.defaultProps = {
  isSignupForm: false
}

export default AuthForm
