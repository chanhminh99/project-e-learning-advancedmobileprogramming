import React from 'react'
import {Text} from 'react-native-elements'
import Spacer from '../common/Spacer'
const NoData = ({text, screenProps}) => {
  return (
    <Spacer>
      <Text
        h3
        h3Style={{
          color: screenProps.theme.colors.customGrey,
          alignSelf: 'center',
          fontWeight: 'bold'
        }}>
        {text}
      </Text>
    </Spacer>
  )
}

export default NoData
