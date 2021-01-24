import React from 'react'
import styled from 'styled-components/native'
import {Text} from 'react-native-elements'
import HeaderTitle from './HeaderTitle'

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`

const HeaderWithSeeAll = ({textHeader, screenProps, onPressSeeAll}) => {
  return (
    <HeaderWrapper>
      <HeaderTitle
        text={textHeader}
        screenProps={screenProps}
        fontWeightText='bold'
        fontSizeText={screenProps.theme.font.size.default * 1.5}
      />
      <Text
        style={{
          color: screenProps.theme.colors.primary,
          alignSelf: 'flex-end',
          fontSize: screenProps.theme.font.size.large,
          marginRight: screenProps.theme.spacing.gutterSize * 2,
          lineHeight: screenProps.theme.font.size.small * 5
        }}
        onPress={onPressSeeAll}>
        See all
      </Text>
    </HeaderWrapper>
  )
}

export default HeaderWithSeeAll
