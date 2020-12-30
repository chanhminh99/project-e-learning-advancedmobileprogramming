import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {colors} from './styles'

const CustomButton = ({textStyle, text, type, onSubmit, submitValue}) => {
  let style = {}
  if (type === 'outline') {
    style.backgroundColor = 'none'
    style.borderWidth = 1
    style.borderColor = colors.primary
  }

  if (type === 'clear') {
    style.backgroundColor = 'none'
  }

  if (onSubmit === undefined) {
    onSubmit = () => {}
  }

  return (
    <TouchableOpacity
      style={{...styles.buttonStyles, ...style}}
      onPress={() => onSubmit()}>
      <View>
        <Text style={{...styles.text, ...textStyle}}>{text}</Text>
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
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500'
  }
})

CustomButton.defaultProps = {
  submitValue: {}
}

export default CustomButton
