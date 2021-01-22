import React from 'react'
import {Dimensions} from 'react-native'
import {Overlay} from 'react-native-elements'
import Spacer from './Spacer'
const {width, height} = Dimensions.get('screen')

const OverlayCustom = ({
  screenProps = {},
  visible = false,
  toggleOverlay = () => {},
  component
}) => {
  return (
    <>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          borderWidth: 1,
          borderRadius: 50,
          position: 'absolute',
          bottom: height * 0.15,
          height: height * 0.769,
          left: screenProps.theme.spacing.newGutterSize * 2,
          right: screenProps.theme.spacing.newGutterSize * 2
        }}>
        <Spacer>{component}</Spacer>
      </Overlay>
    </>
  )
}

export default OverlayCustom
