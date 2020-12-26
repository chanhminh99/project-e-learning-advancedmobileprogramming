import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import Button from '../button'
import Input from './input'
import {colors} from '../styles'
import Spacer from '../Spacer'

const AuthForm = ({isFormRegister, onSubmit, submitButtonText}) => {
  const [email, setEmail] = useState('')
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
      {isFormRegister ? _renderFormRegister() : _renderFormLogin()}
      <Spacer />
      <Button
        text={submitButtonText}
        textStyle={styles.textButtonWithBackground}
        style={{backgroundColor: colors.primary}}
        backgroundColor={colors.primary}
        onSubmit={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 10
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

AuthForm.navigationOptions = () => ({
  title: 'Sign in'
})

AuthForm.defaultProps = {
  isFormRegister: false
}

export default AuthForm
