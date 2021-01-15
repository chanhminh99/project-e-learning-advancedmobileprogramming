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
  errorMessage,
  screenProps
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
          placeholder='Enter email address'
        />
        <Input
          isPassword
          label='Password:'
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
          placeholder='Enter password'
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
          placeholder='Enter username'
        />
        <Input
          label='Email:'
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
          placeholder='Enter email'
        />
        <Input
          isPassword
          label='Password:'
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
          placeholder='Enter password'
        />
        <Input
          isPassword
          label='Confirm Password:'
          onChangeText={(newPassword) => setConfirmPassword(newPassword)}
          value={confirmPassword}
          placeholder='Enter confirm password'
        />
        <Input
          label='Phone Number:'
          onChangeText={(newPhone) => setPhone(newPhone)}
          value={phone}
          placeholder='Enter phone number'
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
        titleStyle={{color: screenProps.theme.colors.white}}
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
    margin: spacing.gutterSize / 2
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
