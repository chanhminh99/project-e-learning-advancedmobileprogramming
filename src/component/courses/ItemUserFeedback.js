import React from 'react'
import {View, Text, Image} from 'react-native'
import {Card} from 'react-native-elements'

const ItemUserFeedback = ({screenProps, item}) => {
  return (
    <Card
      containerStyle={{
        backgroundColor: screenProps.theme.background,
        borderWidth: 0
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center'
        }}>
        <Image
          style={{borderRadius: 50, width: 50, height: 50}}
          resizeMode='cover'
          source={{uri: item.avatar}}
        />
        <View>
          <Text
            style={{
              color: screenProps.theme.text,
              fontSize: screenProps.theme.font.size.largest,
              marginLeft: screenProps.theme.spacing.gutterSize
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: screenProps.theme.text,
              fontSize: screenProps.theme.font.size.default,
              marginLeft: screenProps.theme.spacing.gutterSize
            }}>
            {item.numcourses} courses
          </Text>
        </View>
      </View>
    </Card>
  )
}

export default ItemUserFeedback
