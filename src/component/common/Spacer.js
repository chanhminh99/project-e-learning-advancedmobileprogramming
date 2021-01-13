import React from 'react'
import {View, StyleSheet} from 'react-native'
import {spacing} from '../styles'
const Spacer = ({children}) => {
  return <View style={styles.spacer}>{children}</View>
}

const styles = StyleSheet.create({
  spacer: {
    margin: spacing.gutterSize
  }
})

export default Spacer
