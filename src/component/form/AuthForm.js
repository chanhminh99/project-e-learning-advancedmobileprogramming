import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import Input from './input'
import {colors} from '../styles'
import Spacer from '../Spacer'
import {Button, Text} from 'react-native-elements'

import {NavigationEvents} from 'react-navigation'

const AuthForm = ({
  isFormRegister,
  onSubmit,
  submitButtonText,
  message,
  errorMessage
}) => {
  const [email, setEmail] = useState('chanhchung9@gmail.com')
  const [password, setPassword] = useState('')
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
      {isFormRegister ? _renderFormRegister() : _renderFormLogin()}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : message ? (
        <Text style={styles.successMessage}>{message}</Text>
      ) : null}
      <Spacer />
      <Button
        title={submitButtonText}
        onPress={() =>
          isFormRegister
            ? onSubmit({username, email, password, phone})
            : onSubmit({email, password})
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 10
  },
  errorMessage: {
    fontSize: 16,
    color: colors.customRed,
    marginLeft: 15
  },
  successMessage: {
    fontSize: 16,
    color: colors.customGreen,
    marginLeft: 15
  },
  borderButtonStyle: {
    borderWidth: 1,
    borderColor: colors.primary
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

AuthForm.navigationOptions = () => ({
  title: 'Sign in'
})

AuthForm.defaultProps = {
  isFormRegister: false
}

export default AuthForm
