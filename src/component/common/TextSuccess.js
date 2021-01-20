import React from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {colors, font, spacing} from '../styles'
const TextSuccess = ({text}) => {
  return <Text style={styles.successMessage}>{text}</Text>
}

const styles = StyleSheet.create({
  successMessage: {
    fontSize: font.size.large,
    color: colors.customGreen,
    marginLeft: spacing.newGutterSize * 2
  }
})

export default TextSuccess
