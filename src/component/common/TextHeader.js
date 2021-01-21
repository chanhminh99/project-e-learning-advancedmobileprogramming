import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {colors, font, spacing} from '../styles'

const TextHeader = ({text, textStyle}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{...styles.textDefaultStyle, ...textStyle}}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textDefaultStyle: {
    color: colors.textHeader,
    fontSize: font.size.largest * 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: spacing.gutterSize / 2,
    textAlign: 'center',
    marginBottom: spacing.doubleGutterSize
  }
})

export default TextHeader
