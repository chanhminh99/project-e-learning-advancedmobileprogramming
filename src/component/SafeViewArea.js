import React from 'react'
import {SafeAreaView} from 'react-navigation'
import {StatusBar} from 'react-native'
import {colors} from './styles'

export default ({children}) => {
  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
      <StatusBar barStyle='light-content' backgroundColor={colors.bgDark} />
      {children}
    </SafeAreaView>
  )
}
