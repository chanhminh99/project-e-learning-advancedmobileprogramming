import React from 'react'
import styled from 'styled-components/native'
import {Text} from 'react-native'
import Spacer from './Spacer'
const TitleStyled = styled(Text)`
  font-size: ${({fontSizeText, theme}) =>
    fontSizeText ? fontSizeText : theme.font.size.default * 3}px;
  font-weight: ${({fontWeightText}) => fontWeightText};
  color: ${({theme}) => theme.text};
`

const HeaderTitle = ({
  text,
  fontSizeText,
  fontWeightText = 'normal',
  screenProps
}) => {
  return (
    <Spacer>
      <TitleStyled
        theme={screenProps.theme}
        fontSizeText={fontSizeText}
        fontWeightText={fontWeightText}>
        {text}
      </TitleStyled>
    </Spacer>
  )
}

export default HeaderTitle
