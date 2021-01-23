import React from 'react'
import styled from 'styled-components/native'
import {Text} from 'react-native'
import Spacer from './Spacer'
const TitleStyled = styled(Text)`
  font-size: ${({theme}) => theme.font.size.default * 3}px;
  font-weight: bold;
  color: ${({theme}) => theme.text};
`

const HeaderTitle = ({text, screenProps}) => {
  return (
    <Spacer>
      <TitleStyled theme={screenProps.theme}>{text}</TitleStyled>
    </Spacer>
  )
}

export default HeaderTitle
