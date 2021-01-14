import React from 'react'
import {TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'
import styled from 'styled-components'

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TextStyled = styled.Text`
  color: ${({theme}) => theme.text};
  margin-bottom: ${({theme}) => theme.spacing.newGutterSize / 2}px;
`

const LinkTextStyled = styled.Text`
  color: ${({theme}) => theme.text};
  font-weight: 600;
  font-size: ${({theme}) => theme.font.size.large}px;
`

const NavLink = ({navigation, text, textRouteName, routeName}) => {
  return (
    <Wrapper>
      <TextStyled>{text}</TextStyled>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <LinkTextStyled>{textRouteName.toUpperCase()}</LinkTextStyled>
      </TouchableOpacity>
    </Wrapper>
  )
}

export default withNavigation(NavLink)
