import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Button = ({textStyle, text, style, onPress}) => {
  return (
    <TouchableOpacity
      style={{...styles.buttonStyles, ...style}}
      onPress={onPress}>
      <View>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyles: {
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
})

export default Button
