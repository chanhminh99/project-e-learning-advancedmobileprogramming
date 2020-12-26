import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {colors} from './styles'

const Button = ({textStyle, text, type, onSubmit}) => {
  let style = {}
  if (type === 'outline') {
    style.backgroundColor = 'none'
    style.borderWidth = 1
    style.borderColor = colors.primary
  }

  if (type === 'clear') {
    style.backgroundColor = 'none'
  }

  return (
    <TouchableOpacity
      style={{...styles.buttonStyles, ...style}}
      onPress={onSubmit}>
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
    backgroundColor: colors.primary
  }
})

export default Button
