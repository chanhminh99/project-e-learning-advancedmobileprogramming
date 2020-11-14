import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {colors} from '../styles/'

const Input = ({label}) => {
  const [term, setTerm] = useState('')
  return (
    <View style={styles.wrapperStyle}>
      <Text style={styles.labelInput}>{label}</Text>
      <View style={styles.wrapperInput}>
        <TextInput
          autoCapitalize='none'
          autoCompleteType='off'
          style={styles.textInputStyle}
          value={term}
          onChangeText={(newTerm) => setTerm(newTerm)}
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
    paddingVertical: 5
  }
})

export default Input
