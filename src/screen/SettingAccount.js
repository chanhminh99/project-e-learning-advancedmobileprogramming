import React, {useEffect, useContext, useState} from 'react'
import {Button, Dimensions, Platform, ScrollView} from 'react-native'
import styled from 'styled-components/native'
import {withNavigation} from 'react-navigation'
import Container from '../component/common/Container'
import TextSuccess from '../component/common/TextSuccess'
import TextFailed from '../component/common/TextFailed'
import KeyboardIntelligent from '../component/common/KeyboardIntelligent'
import Spacer from '../component/common/Spacer'
import Overlay from '../component/common/Overlay'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {Card, Input, Text} from 'react-native-elements'
//Context
import {Context as UserContext} from '../context/UserContext'
import {Context as AuthContext} from '../context/AuthContext'
import ForgotPasswordScreen from './ForgotPasswordScreen'
//styled

const {width} = Dimensions.get('screen')

const WrapperCard = styled(Card)`
  flex: 1;
`

const AvatarStyled = styled(Avatar)`
  width: ${width / 2.15}px;
  height: ${width / 2.15}px;
  align-self: center;
`

const TitleCard = styled(Card.Title)`
  color: ${({color}) => color};
  font-size: ${({fontSize}) => fontSize}px;
`

const SettingAccount = ({navigation, screenProps}) => {
  const {
    state: {data, msg},
    getUserInfo,
    updateProfile,
    clearMessage
  } = useContext(UserContext)
  const {
    state: {message, errorMessage},
    clearMessage: clearAuthMessage,
    changePassword,
    addErrorMessage
  } = useContext(AuthContext)

  const userID = data.id
  const [name, setName] = useState(data.name)
  const [phone, setPhone] = useState(data.phone)
  const [image, setImage] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visibleForgot, setVisibleForgot] = useState(false)

  //Edit here if have api upload avatar
  // const avatar = image || data.avatar

  const avatar = data.avatar
  useEffect(() => {
    getUserInfo()

    const listener = navigation.addListener('didFocus', () => {
      getUserInfo()
      clearMessage()
      clearAuthMessage()
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    })

    return () => {
      listener.remove()
    }
  }, [])

  useEffect(() => {
    const subscriber = async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    }
    subscriber()
  }, [])

  const toggleOverlay = () => {
    setVisibleForgot(!visibleForgot)
  }

  const onSubmitChangePass = ({
    id,
    currentPassword,
    newPassword,
    confirmPassword
  }) => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addErrorMessage('Please input valid your info')
      return
    }
    if (newPassword !== confirmPassword) {
      addErrorMessage('The confirm password is not matching with new password')
    } else {
      changePassword({id, currentPassword, newPassword})
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <Container theme={screenProps.theme}>
      <WrapperCard
        containerStyle={{flex: 1, margin: 0, padding: 0, borderWidth: 0}}
        wrapperStyle={{
          backgroundColor: screenProps.theme.background,
          flex: 1
        }}>
        <ScrollView>
          <Card.Divider />
          <AvatarStyled
            size='xlarge'
            rounded
            source={{
              uri: image || data.avatar
            }}>
            <Avatar.Accessory size={width / 10} onPress={pickImage} />
          </AvatarStyled>
          <Spacer />
          <Input
            label='Email'
            inputStyle={{color: screenProps.theme.text}}
            disabled
            value={data.email}
          />
          <Input
            label='Name'
            inputStyle={{color: screenProps.theme.text}}
            onChangeText={(value) => setName(value)}
            value={name}
            placeholder={data.name ? '' : 'Update your name'}
          />
          <Input
            label='Phone'
            inputStyle={{color: screenProps.theme.text}}
            value={phone}
            onChangeText={(value) => setPhone(value)}
          />
          {msg ? <TextSuccess text={msg} /> : null}
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title='Update Profile'
            onPress={() => updateProfile({name, phone, avatar})}
          />
          <Card.Divider />
          <KeyboardIntelligent>
            <Spacer>
              <TitleCard
                style={{alignSelf: 'flex-start'}}
                color={screenProps.theme.text}
                fontSize={screenProps.theme.font.size.largest}>
                Password
              </TitleCard>
              <Spacer />

              <Input
                secureTextEntry
                label='Current password'
                inputStyle={{color: screenProps.theme.text}}
                value={currentPassword}
                onChangeText={(value) => setCurrentPassword(value)}
              />

              <Text
                style={{
                  color: screenProps.theme.colors.primary,
                  alignSelf: 'flex-end',
                  fontSize: screenProps.theme.font.size.large,
                  marginRight: screenProps.theme.spacing.gutterSize * 2
                }}
                onPress={toggleOverlay}>
                Forgot Password
              </Text>

              <Input
                secureTextEntry
                label='New password'
                inputStyle={{color: screenProps.theme.text}}
                onChangeText={(value) => setNewPassword(value)}
                value={newPassword}
              />
              <Input
                secureTextEntry
                label='Confirm password'
                inputStyle={{color: screenProps.theme.text}}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
              />
              {errorMessage ? (
                <TextFailed text={errorMessage} />
              ) : message ? (
                <TextSuccess text={message} />
              ) : null}
              <Button
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title='Update Password'
                onPress={() =>
                  onSubmitChangePass({
                    userID,
                    currentPassword,
                    newPassword,
                    confirmPassword
                  })
                }
              />
            </Spacer>
          </KeyboardIntelligent>
        </ScrollView>
      </WrapperCard>
      <Overlay
        screenProps={screenProps}
        visible={visibleForgot}
        toggleOverlay={toggleOverlay}
        component={<ForgotPasswordScreen screenProps={screenProps} />}
      />
    </Container>
  )
}

SettingAccount.navigationOptions = ({navigation, screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    }
  }
}

export default withNavigation(SettingAccount)
