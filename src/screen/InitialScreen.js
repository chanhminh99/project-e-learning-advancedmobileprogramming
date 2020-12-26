import React from 'react'
import {View, StyleSheet} from 'react-native'
import Button from '../component/button'
import {colors} from '../component/styles'
import Spacer from '../component/Spacer'
import SafeAreaView from '../component/SafeViewArea'
import IconText from '../component/IconText'
const InitialScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.wrapperStyle}>
        <IconText text='PluralRez' />
        <Button
          text='Sign in'
          textStyle={styles.textButtonWithBackground}
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
    </SafeAreaView>
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
    marginHorizontal: 15
  },
  textButtonWithBackground: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500'
  },
  textButtonWithBorder: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600'
  }
})

export default InitialScreen
