import React, {useContext} from 'react'
import {Switch, View} from 'react-native'

import {withNavigation} from 'react-navigation'
import styled from 'styled-components'
import {Card, Text} from 'react-native-elements'
import Button from '../component/common/button'
import Spacer from '../component/common/Spacer'

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
              title: 'ChangePass',
              preScreen: 'Settings'
            })
          }>
          <Card.Title style={textStyle}>Account</Card.Title>
          <AntDesign
            name='arrowright'
            size={screenProps.theme.font.size.medium * 2}
            color={screenProps.theme.colors.customLightGrey}
          />
        </WrapperCard>
        <Card.Divider />
        <WrapperCard>
          <Card.Title style={textStyle}>Dark mode</Card.Title>
          <Switch
            value={theme.mode === 'dark'}
            onValueChange={(value) => {
              theme.setMode(value ? 'dark' : 'light')
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
            1.0.0
          </Text>
        </WrapperCard>
        <Card.Divider />
      </Card>
      <Spacer>
        <Button
          text='Sign out'
          textColor={screenProps.theme.colors.primary}
          type='outline'
          onSubmit={() => {
            signout()
          }}
        />
      </Spacer>
    </View>
  )
}

export default withNavigation(SettingScreen)
