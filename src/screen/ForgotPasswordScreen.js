import React, {useState, useContext} from 'react'
import {Dimensions, View} from 'react-native'
import styled from 'styled-components/native'
import {NavigationEvents} from 'react-navigation'
import TextHeader from '../component/common/TextHeader'
import TextSuccess from '../component/common/TextSuccess'
import TextFailed from '../component/common/TextFailed'
import Button from '../component/common/button'
import Spacer from '../component/common/Spacer'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Input} from 'react-native-elements'
import {AntDesign} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'

//Context
import {Context as AuthContext} from '../context/AuthContext'

const {width, height} = Dimensions.get('screen')

const WrapperOverlay = styled(View)`
  flex-direction: column;
  justify-content: center;
`

const ForgotPasswordScreen = ({screenProps = {}}) => {
  const {
    state: {message, errorMessage},
    forgotPassword,
    clearMessage
  } = useContext(AuthContext)

  const [email, setEmail] = useState('')

  return (
    <WrapperOverlay>
      <NavigationEvents
        onWillFocus={() => {
          clearMessage()
        }}
      />
      <MaskedView
        style={{alignSelf: 'center', marginBottom: 10}}
        maskElement={
          <AntDesign name='mail' size={width * 0.5} color='black' />
        }>
        <LinearGradient
          style={{width: width * 0.5, height: width * 0.5}}
          colors={['#E80A89', '#F15B2A']}></LinearGradient>
      </MaskedView>

      <TextHeader
        text='Is your email correct?'
        textStyle={{
          color: screenProps.theme.colors.black,
          textTransform: 'none'
        }}
      />
      <TextHeader
        text='Please confim the email address you have used for your account creation is correct.'
        textStyle={{
          color: screenProps.theme.colors.black,
          textTransform: 'none',
          fontSize: screenProps.theme.font.size.small,
          letterSpacing: 0
        }}
      />
      <KeyboardIntelligent>
        <Input
          placeholder='abc@gmail.com'
          leftIcon={
            <Icon
              name='envelope'
              size={24}
              color={screenProps.theme.colors.lightGrey}
            />
          }
          value={email}
          onChangeText={setEmail}
        />
      </KeyboardIntelligent>

      {errorMessage ? (
        <TextFailed text={errorMessage} />
      ) : message ? (
        <TextSuccess text={message} />
      ) : null}
      <Spacer />
      <Button
        text='Send'
        textColor={screenProps.theme.colors.primary}
        type='outline'
        onSubmit={() => {
          forgotPassword({email})
        }}
      />
    </WrapperOverlay>
  )
}

export default ForgotPasswordScreen
