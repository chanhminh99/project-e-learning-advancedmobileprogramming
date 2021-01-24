import React from 'react'
import {Dimensions} from 'react-native'
import {Card, AirbnbRating} from 'react-native-elements'
import styled from 'styled-components/native'
import {Feather} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'
import Spacer from '../common/Spacer'
const {width, height} = Dimensions.get('screen')

const WrapperContentCourses = styled.View`
  width: ${width * 0.7}px;
  max-height: ${width * 0.5}px;
  background-color: ${({theme}) => theme.background};
  flex: 1;
  margin-left: ${({theme}) => theme.spacing.gutterSize * 1.5}px;
  border-bottom-left-radius: ${({theme}) => theme.spacing.gutterSize}px;
  border-bottom-right-radius: ${({theme}) => theme.spacing.gutterSize}px;
`
const RowWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`

const RatingWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const ItemCourse = ({screenProps, item, onLikeCourse, category = false}) => {
  let averagePoint

  const presentationPoint = item.presentationPoint
    ? parseFloat(item.presentationPoint.toFixed(2))
    : 5.0

  const contentPoint = item.contentPoint
    ? parseFloat(item.contentPoint.toFixed(2))
    : 5.0
  const formalityPoint = item.formalityPoint
    ? parseFloat(item.formalityPoint.toFixed(2))
    : 5.0
  averagePoint = (presentationPoint + contentPoint + formalityPoint) / 3

  const courseId = item.id

  return (
    <Card
      containerStyle={{
        padding: 0,
        margin: 0,
        borderWidth: 0
      }}
      wrapperStyle={{
        backgroundColor: screenProps.theme.background,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
      }}>
      <Card.Image
        source={{uri: item.imageUrl}}
        containerStyle={{
          maxHeight: width * 0.2,
          width: width * 0.2,
          borderRadius: 10
        }}></Card.Image>
      <WrapperContentCourses theme={screenProps.theme}>
        <Card.FeaturedTitle style={{color: screenProps.theme.text}}>
          {item.title}
        </Card.FeaturedTitle>
        <Card.FeaturedSubtitle style={{color: screenProps.theme.text}}>
          {category ? item['name'] : item['instructor.user.name']}
        </Card.FeaturedSubtitle>
        <RowWrapper>
          <RatingWrapper>
            <AirbnbRating
              defaultRating={averagePoint || 5}
              isDisabled
              size={screenProps.theme.font.size.largest}
              showRating={false}
            />
            <Card.FeaturedSubtitle
              style={{bottom: -5, color: screenProps.theme.text}}>
              {`(${item.ratedNumber})`}
            </Card.FeaturedSubtitle>
          </RatingWrapper>

          <Card.FeaturedSubtitle style={{color: screenProps.theme.text}}>
            {category
              ? `${new Date(item['updatedAt']).toLocaleDateString('en-us', {
                  month: 'short'
                })} ${new Date(item['updatedAt']).getFullYear()}`
              : `${new Date(item['createdAt']).toLocaleDateString('en-us', {
                  month: 'short'
                })} ${new Date(item['createdAt']).getFullYear()}`}
          </Card.FeaturedSubtitle>
        </RowWrapper>
        <RowWrapper>
          <Card.FeaturedTitle style={{color: screenProps.theme.text}}>
            {item.price === 0
              ? 'Free'
              : new Intl.NumberFormat('vn-US', {
                  style: 'currency',
                  currency: 'VND'
                }).format(item.price)}
          </Card.FeaturedTitle>
          {item.likeStatus ? (
            <FontAwesome
              name='heart'
              size={24}
              color={screenProps.theme.colors.customRed}
              onPress={() => onLikeCourse({courseId})}
            />
          ) : (
            <Feather
              name='heart'
              size={24}
              color={screenProps.theme.colors.customRed}
              onPress={() => onLikeCourse({courseId})}
            />
          )}
        </RowWrapper>
      </WrapperContentCourses>
    </Card>
  )
}

export default ItemCourse
