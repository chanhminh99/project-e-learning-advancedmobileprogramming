import React from 'react'
import {SafeAreaView as SafeView} from 'react-navigation'
import {StatusBar} from 'react-native'
import {colors} from '../styles'

const SafeViewCustom = ({children}) => {
  return (
    <SafeView
      style={{flex: 1, backgroundColor: colors.bgDark}}
      forceInset={{top: 'always'}}>
      <StatusBar barStyle='light-content' backgroundColor={colors.bgDark} />
      {children}
    </SafeView>
  )
}

export default SafeViewCustom
