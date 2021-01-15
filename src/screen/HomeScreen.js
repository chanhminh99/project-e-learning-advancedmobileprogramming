import React, {useContext, useEffect} from 'react'
import {StyleSheet, Switch} from 'react-native'
import styled from 'styled-components/native'
import Container from '../component/common/Container'
//Icon
import {Ionicons} from '@expo/vector-icons'
import {Avatar} from 'react-native-elements'
//Context
import {Context as UserContext} from '../context/UserContext'

import {ThemeContext} from '../themes'
import Spacer from '../component/common/Spacer'

//Style

const WrapperHome = styled.View`
  align-items: center;
`

const Title = styled.Text`
  font-size: ${({theme}) => theme.font.size.largest}px;
  color: ${(props) => props.theme.text};
`

const HomeScreen = ({screenProps}) => {
  const {state: user, getUserInfo} = useContext(UserContext)
  // Hook Theme

  useEffect(() => {
    getUserInfo()
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
          size='medium'
          rounded
          overlayContainerStyle={{
            backgroundColor: screenProps.theme.colors.primary
          }}
          icon={{name: 'user', type: 'font-awesome'}}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
          containerStyle={{flex: 1, marginLeft: 0, marginTop: 0}}
        />
      </Spacer>
    )
  }
}

const styles = StyleSheet.create({})

export default HomeScreen
