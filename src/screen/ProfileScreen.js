import React, {useEffect, useContext, useState} from 'react'
import {Button, Dimensions, Platform} from 'react-native'
import styled from 'styled-components/native'
import Container from '../component/common/Container'
import TextSuccess from '../component/common/TextSuccess'
import Spacer from '../component/common/Spacer'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {Card, Input, Text} from 'react-native-elements'
//Context
import {Context as UserContext} from '../context/UserContext'

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

const ProfileScreen = ({navigation, screenProps}) => {
  const {
    state: {data, msg},
    getUserInfo,
    updateProfile,
    clearMessage
  } = useContext(UserContext)

  const [name, setName] = useState(data.name)
  const [phone, setPhone] = useState(data.phone)
  const [image, setImage] = useState(null)
  //Edit here if have api upload avatar
  // const avatar = image || data.avatar

  const avatar = data.avatar
  useEffect(() => {
    getUserInfo()

    const listener = navigation.addListener('didFocus', () => {
      getUserInfo()
      clearMessage()
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
        <TitleCard
          color={screenProps.theme.text}
          fontSize={screenProps.theme.font.size.largest}>
          User's Profile
        </TitleCard>
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
          title='Update'
          onPress={() => updateProfile({name, phone, avatar})}
        />
      </WrapperCard>
    </Container>
  )
}

ProfileScreen.navigationOptions = ({navigation, screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    }
  }
}

export default ProfileScreen
