import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {colors} from '../styles'
import styled from 'styled-components'

const TextInputStyled = styled.TextInput`
  background-color: ${({theme}) => theme.backgroundInput};
  color: ${({theme}) => theme.text};
  flex: 1;
  font-size: ${({theme}) => theme.font.size.medium}px;
  border: 1px;
  border-radius: 5px;
  padding: ${({theme}) => theme.spacing.gutterSize / 2}px;
`

const Input = ({label, placeholder, isPassword, value, onChangeText}) => {
  return (
    <View style={styles.wrapperStyle}>
      <Text style={styles.labelInput}>{label}</Text>
      <View style={styles.wrapperInput}>
        <TextInputStyled
          placeholder={placeholder}
          secureTextEntry={isPassword ? true : false}
          autoCapitalize='none'
          autoCorrect={false}
          value={value}
          onChangeText={(newValue) => onChangeText(newValue)}
        />
      </View>
    </View>
  )
}

const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
  wrapperStyle: {
    marginBottom: 15
  },
  wrapperInput: {
    height: (screenHeight / 10) * 0.6
  },
  labelInput: {
    fontSize: 18,
    color: colors.labelInput,
    marginVertical: 5
  },
  textInputStyle: {
    backgroundColor: colors.backgroundInput,
    color: colors.white,
    flex: 1,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  }
})

export default Input
