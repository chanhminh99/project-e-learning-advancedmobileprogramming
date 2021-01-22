import React, {useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Switch, View} from 'react-native'
import {withNavigation} from 'react-navigation'
import styled from 'styled-components'
import {Card, Text} from 'react-native-elements'
import Button from '../component/common/button'
import {APP_VERSION} from '../component/constants/index'
//Context
import {ThemeContext} from '../themes'
import {Context as AuthContext} from '../context/AuthContext'
//Icon
import {AntDesign} from '@expo/vector-icons'

const WrapperCard = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
const SettingScreen = ({screenProps, navigation}) => {
  const theme = useContext(ThemeContext)
  const {state, signout} = useContext(AuthContext)

  const textStyle = {
    color: screenProps.theme.text,
    alignSelf: 'flex-start',
    fontSize: screenProps.theme.font.size.large,
    fontWeight: 'normal'
  }

  return (
    <View style={{flex: 1}}>
      <Card
        containerStyle={{
          backgroundColor: screenProps.theme.background,
          borderWidth: 0
        }}>
        <WrapperCard
          onPress={() =>
            navigation.navigate('MyModal', {
              title: 'Settings Account',
              preScreen: 'Settings'
            })
          }>
          <Card.Title style={textStyle}>Account</Card.Title>
          <AntDesign
            name='arrowright'
            size={screenProps.theme.font.size.small * 2}
            color={screenProps.theme.colors.customLightGrey}
          />
        </WrapperCard>
        <Card.Divider />
        <WrapperCard
          onPress={() =>
            navigation.navigate('MyModal', {
              title: 'Change Language',
              preScreen: 'Settings'
            })
          }>
          <Card.Title style={textStyle}>Change Language</Card.Title>
          <AntDesign
            name='arrowright'
            size={screenProps.theme.font.size.small * 2}
            color={screenProps.theme.colors.customLightGrey}
          />
        </WrapperCard>
        <Card.Divider />
        <WrapperCard>
          <Card.Title style={textStyle}>Dark mode</Card.Title>
          <Switch
            value={theme.mode === 'dark'}
            onValueChange={async (value) => {
              const themeStore = value ? 'dark' : 'light'
              theme.setMode(themeStore)
              await AsyncStorage.setItem('theme', themeStore)
            }}
          />
        </WrapperCard>
        <Card.Divider />
        <WrapperCard>
          <Card.Title style={textStyle}>App version</Card.Title>
          <Text
            style={{
              color: screenProps.theme.text,
              alignSelf: 'flex-start',
              fontSize: screenProps.theme.font.size.large,
              fontWeight: 'normal'
            }}>
            {APP_VERSION}
          </Text>
        </WrapperCard>
        <Card.Divider />
        <WrapperCard>
          <Card.Title style={textStyle}>Contact support</Card.Title>
          <AntDesign
            name='arrowright'
            size={screenProps.theme.font.size.small * 2}
            color={screenProps.theme.colors.customLightGrey}
          />
        </WrapperCard>
        <Card.Divider />
        <WrapperCard>
          <Card.Title style={textStyle}>About us</Card.Title>
          <AntDesign
            name='arrowright'
            size={screenProps.theme.font.size.small * 2}
            color={screenProps.theme.colors.customLightGrey}
          />
        </WrapperCard>
        <Card.Divider />
        <Button
          text='Sign out'
          textColor={screenProps.theme.colors.primary}
          type='outline'
          onSubmit={() => {
            signout()
          }}
        />
      </Card>
    </View>
  )
}

export default withNavigation(SettingScreen)
