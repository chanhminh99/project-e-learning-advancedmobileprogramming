import React from 'react'
import {Tile} from 'react-native-elements'

const TileCustom = ({title, titleStyle, width, height, imageSrc, onPress}) => {
  return (
    <Tile
      height={height}
      width={width}
      imageSrc={imageSrc}
      title={title}
      titleStyle={titleStyle}
      featured
      onPress={onPress}
    />
  )
}

export default TileCustom
