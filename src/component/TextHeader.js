import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {colors} from '../component/styles'
const TextHeader = ({text}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 100
  },
  textStyle: {
    color: colors.textHeader,
    fontSize: 22,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 5,
    textAlign: 'center',
    marginBottom: 20
  }
})

export default TextHeader
