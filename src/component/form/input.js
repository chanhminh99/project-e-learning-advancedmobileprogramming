import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {colors} from '../styles'

const Input = ({label, isPassword, value, onChangeText}) => {
  return (
    <View style={styles.wrapperStyle}>
      <Text style={styles.labelInput}>{label}</Text>
      <View style={styles.wrapperInput}>
        <TextInput
          secureTextEntry={isPassword ? true : false}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.textInputStyle}
          value={value}
          onChangeText={(newValue) => onChangeText(newValue)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginBottom: 15
  },
  wrapperInput: {
    height: 50
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
