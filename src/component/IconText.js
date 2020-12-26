import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'

const IconText = ({text}) => {
  return (
    <View style={styles.wrapper}>
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
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15
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
  }
})

export default IconText
