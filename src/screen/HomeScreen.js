import React, {useContext, useEffect} from 'react'
import {StyleSheet, Switch} from 'react-native'
import styled from 'styled-components/native'
import Container from '../component/common/Container'

//Icon
import {Ionicons} from '@expo/vector-icons'
import {Avatar} from 'react-native-elements'
//Context
import {Context as UserContext} from '../context/UserContext'

import Spacer from '../component/common/Spacer'

//Style

const WrapperHome = styled.View`
  align-items: center;
`

const Title = styled.Text`
  font-size: ${({theme}) => theme.font.size.largest}px;
  color: ${(props) => props.theme.text};
`

const HomeScreen = ({screenProps, navigation}) => {
  const {state, getUserInfo} = useContext(UserContext)
  // Hook Theme

  useEffect(() => {
    getUserInfo()

    const listener = navigation.addListener('didFocus', () => {
      getUserInfo()
    })

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <Container theme={screenProps.theme}>
      <WrapperHome>
        <Title>Chanh Test</Title>
      </WrapperHome>
    </Container>
  )
}

HomeScreen.navigationOptions = ({navigation, screenProps}) => {
  const avatar = navigation.getParam('avatar')
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent',
    headerLeft: () => (
      <Spacer>
        <Ionicons
          name='settings-outline'
          size={24}
          color={screenProps.theme.colors.primary}
          onPress={() =>
            navigation.navigate('MyModal', {
              title: 'Settings'
            })
          }
        />
      </Spacer>
    ),
    headerRight: () => (
      <Spacer>
        <Avatar
          size='large'
          rounded
          source={{
            uri: avatar
          }}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
          avatarStyle={{width: 30, height: 30, marginTop: 25, marginLeft: 45}}
        />
      </Spacer>
    )
  }
}

const styles = StyleSheet.create({})

export default HomeScreen
