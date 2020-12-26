import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import Spacer from './Spacer'
import {withNavigation} from 'react-navigation'
import {colors} from './styles'

const NavLink = ({navigation, text, routeName}) => {
  return (
    <TouchableOpacity
      style={styles.wrapperLink}
      onPress={() => navigation.navigate(routeName)}>
      <Spacer />
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapperLink: {
    alignItems: 'center'
  },
  link: {
    color: colors.white
  }
})

export default withNavigation(NavLink)
