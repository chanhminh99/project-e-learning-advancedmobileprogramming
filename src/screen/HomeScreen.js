import React, {useContext, useEffect} from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import styled from 'styled-components/native'

//Icon
import {Ionicons} from '@expo/vector-icons'
import {Avatar, Tile} from 'react-native-elements'

import Container from '../component/common/Container'
import Spacer from '../component/common/Spacer'
import HeaderTitle from '../component/common/HeaderTitle'

//Context
import {Context as UserContext} from '../context/UserContext'
import HeaderWithSeeAll from '../component/common/HeaderWithSeeAll'

const {width, height} = Dimensions.get('screen')

//Style
const WrapperContent = styled.View``

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
      <HeaderTitle
        text='Home'
        fontWeightText='bold'
        screenProps={screenProps}
      />
      <WrapperContent>
        <Tile
          height={width * 0.6}
          imageSrc={require('../../assets/images/cover.png')}
          title='Welcome to PluralRez!'
          titleStyle={{
            fontSize: screenProps.theme.font.size.default * 2.5,
            fontWeight: '600',
            alignSelf: 'flex-start'
          }}
          featured
          caption='Get in-demand skills to impress anyone'
          captionStyle={{
            color: screenProps.theme.colors.customLightGrey,
            alignSelf: 'flex-start',
            fontSize: screenProps.theme.font.size.default * 1.2
          }}
        />
        <Spacer />
        <HeaderWithSeeAll
          textHeader='Khoá học của tôi'
          screenProps={screenProps}
          onPressSeeAll={() => {}}
        />
        <HeaderWithSeeAll
          textHeader='Khoá học nổi bật'
          screenProps={screenProps}
          onPressSeeAll={() => {}}
        />
      </WrapperContent>
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
