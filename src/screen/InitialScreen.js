import React from 'react'
import {StyleSheet} from 'react-native'
import styled from 'styled-components'
import Button from '../component/common/button'
import {colors, font, spacing} from '../component/styles'
import Spacer from '../component/common/Spacer'
import IconText from '../component/common/IconText'
import Container from '../component/common/Container'

const WrapperContent = styled.View`
  margin: ${(props) => `0px ${props.theme.spacing.newGutterSize * 2}px`};
`

const InitialScreen = ({navigation, screenProps: {theme}}) => {
  // if (Platform.OS === 'android') ToastAndroid.show('hihi', ToastAndroid.SHORT)
  // else {
  //   Alert.alert('Đăng nhập thành công')
  // }
  return (
    <Container theme={theme}>
      <WrapperContent>
        <IconText text='PluralRez' />
        <Button
          text='Sign in'
          onSubmit={() => {
            navigation.navigate('Signin')
          }}
        />
        <Spacer />
        <Button
          text='Subscribe to Pluralrez'
          textColor={colors.primary}
          type='outline'
          onSubmit={() => {
            navigation.navigate('Signup')
          }}
        />
      </WrapperContent>
    </Container>
  )
}

InitialScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: spacing.newGutterSize * 2
  },
  textButtonWithBorder: {
    color: colors.primary,
    fontSize: font.size.largest,
    fontWeight: '500'
  }
})

export default InitialScreen
