import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Spacer from './Spacer'
import {withNavigation} from 'react-navigation'
import {colors, font} from '../styles'

const NavLink = ({navigation, text, textRouteName, routeName}) => {
  return (
    <Spacer>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
          <Text style={styles.link}>{textRouteName}</Text>
        </TouchableOpacity>
      </View>
    </Spacer>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    color: colors.white
  },
  link: {
    color: colors.white,
    fontWeight: '600',
    fontSize: font.size.medium
  }
})

export default withNavigation(NavLink)
