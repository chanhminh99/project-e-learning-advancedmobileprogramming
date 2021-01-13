import React, {useContext, useEffect} from 'react'
import {StyleSheet, Switch} from 'react-native'
import styled from 'styled-components/native'
import {AntDesign} from '@expo/vector-icons'
//Context
import {Context as UserContext} from '../context/UserContext'

import {ThemeContext} from '../themes'

//Style
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  font-size: ${({theme}) => theme.font.size.largest}px;
  color: ${(props) => props.theme.text};
`

const HomeScreen = ({screenProps}) => {
  const {state: user, getUserInfo} = useContext(UserContext)
  // Hook Theme
  const theme = useContext(ThemeContext)
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <Container>
      <Title>Chanh Test</Title>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={(value) => {
          theme.setMode(value ? 'dark' : 'light')
        }}
      />
    </Container>
  )
}

HomeScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({tintColor}) => (
      <AntDesign name='home' size={24} color={tintColor} />
    )
  }
}

const styles = StyleSheet.create({})

export default HomeScreen
