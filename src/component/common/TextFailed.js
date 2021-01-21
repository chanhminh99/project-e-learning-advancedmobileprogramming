import React from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {colors, font, spacing} from '../styles'
const TextFailed = ({text}) => {
  return <Text style={styles.failedMessage}>{text}</Text>
}

const styles = StyleSheet.create({
  failedMessage: {
    fontSize: font.size.large,
    color: colors.customRed,
    marginLeft: spacing.newGutterSize * 2
  }
})

export default TextFailed
