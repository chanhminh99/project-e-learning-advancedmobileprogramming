import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import Button from '../component/button'
import SignIn from '../component/signin'
import {colors} from '../component/styles'
import {LinearGradient} from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'
const HomeScreen = (props) => {
  console.log(props.navigation)
  return (
    <View style={styles.wrapperStyle}>
      <MaskedView
        style={{alignSelf: 'center', marginBottom: 10}}
        maskElement={
          <Image
            style={styles.iconStyle}
            source={require('../../assets/images/icon_pluralsight.png')}
          />
        }>
        <LinearGradient
          style={styles.iconStyle}
          colors={['#E80A89', '#F15B2A']}></LinearGradient>
      </MaskedView>
      <Text style={styles.textStyle}>PluralRez</Text>
      <View>
        <Button
          text='Sign in'
          textStyle={styles.textButtonWithBackground}
          style={{backgroundColor: colors.primary}}
          backgroundColor={colors.primary}
          onPress={() => props.navigation.navigate('SignIn')}
        />
        <Button
          text='Subscribe to Pluralrez'
          textStyle={styles.textButtonWithBorder}
          style={{...styles.borderButtonStyle}}
        />
        <Button
          text='Explore without a subscription'
          textStyle={styles.textButtonWithBorder}
          style={{...styles.borderButtonStyle}}
        />
      </View>
    </View>
  )
}

HomeScreen.navigationOptions = () => ({
  title: 'Home'
})

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 100,
    marginHorizontal: 20
  },
  textStyle: {
    color: 'rgba(138, 153, 168, 1)',
    fontSize: 22,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 5,
    textAlign: 'center',
    marginBottom: 40
  },
  iconStyle: {
    width: 60,
    height: 60
  },
  borderButtonStyle: {
    borderWidth: 1,
    borderColor: colors.primary
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

export default HomeScreen
