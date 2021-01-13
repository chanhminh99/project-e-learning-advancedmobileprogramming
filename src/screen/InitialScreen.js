import React from 'react'
import {View, StyleSheet} from 'react-native'
import Button from '../component/common/button'
import {colors, font, spacing} from '../component/styles'
import Spacer from '../component/common/Spacer'
import IconText from '../component/common/IconText'

const InitialScreen = ({navigation}) => {
  // if (Platform.OS === 'android') ToastAndroid.show('hihi', ToastAndroid.SHORT)
  // else {
  //   Alert.alert('Đăng nhập thành công')
  // }
  return (
    <View style={styles.wrapperStyle}>
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
        textStyle={styles.textButtonWithBorder}
        type='outline'
        onSubmit={() => {
          navigation.navigate('Signup')
        }}
      />
    </View>
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
  textButtonWithBackground: {
    color: colors.white,
    fontSize: font.size.largest,
    fontWeight: '500'
  },
  textButtonWithBorder: {
    color: colors.primary,
    fontSize: font.size.largest,
    fontWeight: '600'
  }
})

export default InitialScreen
