import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {colors, font, spacing} from '../styles'
const TextHeader = ({text}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.gutterSize * 5
  },
  textStyle: {
    color: colors.textHeader,
    fontSize: font.size.largest,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: spacing.gutterSize / 2,
    textAlign: 'center',
    marginBottom: spacing.doubleGutterSize
  }
})

export default TextHeader
