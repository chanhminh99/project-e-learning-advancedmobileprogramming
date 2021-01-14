import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {colors} from '../styles'
import styled from 'styled-components'

const TextButtonStyled = styled.Text`
  color: ${({theme, textColorStyle}) =>
    textColorStyle ? textColorStyle : theme.text};
  font-size: ${({theme}) => theme.font.size.largest}px;
  font-weight: 500;
`

const CustomButton = ({textColor, text, type, onSubmit = () => {}}) => {
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
        <TextButtonStyled textColorStyle={textColor}>{text}</TextButtonStyled>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyles: {
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  }
})

export default CustomButton
