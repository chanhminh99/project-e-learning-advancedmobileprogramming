import React, {useContext, useEffect} from 'react'
import {StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native'
import styled from 'styled-components/native'

//Icon
import {Ionicons} from '@expo/vector-icons'
import {Avatar, Tile, Card, AirbnbRating} from 'react-native-elements'

import Container from '../component/common/Container'
import Spacer from '../component/common/Spacer'
import HeaderTitle from '../component/common/HeaderTitle'
import HeaderWithSeeAll from '../component/common/HeaderWithSeeAll'
//Context
import {Context as UserContext} from '../context/UserContext'
import {Context as CoursesContext} from '../context/CoursesContext'
import CardCourse from '../component/courses/CardCourse'
import NoData from '../component/courses/NoData'

const {width, height} = Dimensions.get('screen')

//Style
const WrapperContent = styled.View``

const WrapperContentCourses = styled.View`
  width: ${width * 0.7}px;
  max-height: ${width * 0.5}px;
  background-color: ${({theme}) => theme.colors.backgroundInput};
  flex: 1;
  padding: ${({theme}) => theme.spacing.newGutterSize}px;
  border-bottom-left-radius: ${({theme}) => theme.spacing.gutterSize}px;
  border-bottom-right-radius: ${({theme}) => theme.spacing.gutterSize}px;
`
const RatingAndDateCourses = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`

const HomeScreen = ({screenProps, navigation}) => {
  const {state: userData, getUserInfo} = useContext(UserContext)
  const {
    state: {
      data: {topSaleCourses}
    },
    getTopSellerCourses,
    likeCourse
  } = useContext(CoursesContext)
  // Hook Theme

  useEffect(() => {
    getUserInfo()

    const listener = navigation.addListener('didFocus', () => {
      getUserInfo()
    })

    return () => {
      listener.remove()
    }
  }, [])

  useEffect(() => {
    getTopSellerCourses()

    const listener = navigation.addListener('didFocus', () => {
      getTopSellerCourses()
    })

    return () => {
      listener.remove()
    }
  }, [])

  const hasTopSaleCourses = topSaleCourses.length > 0
  let filterTopSaleCourses
  if (hasTopSaleCourses) {
    filterTopSaleCourses = topSaleCourses.filter((value, idx) => {
      return idx < 5
    })
  }

  console.log(filterTopSaleCourses)

  return (
    <Container theme={screenProps.theme}>
      <ScrollView>
        <HeaderTitle
          text='Home'
          fontWeightText='bold'
          screenProps={screenProps}
        />
        <WrapperContent>
          <Tile
            height={width * 0.6}
            imageSrc={require('../../assets/images/cover.png')}
            title='Welcome to PluralRez!'
            titleStyle={{
              fontSize: screenProps.theme.font.size.default * 2.5,
              fontWeight: '600',
              alignSelf: 'flex-start'
            }}
            featured
            caption='Get in-demand skills to impress anyone'
            captionStyle={{
              color: screenProps.theme.colors.customLightGrey,
              alignSelf: 'flex-start',
              fontSize: screenProps.theme.font.size.default * 1.2
            }}
          />
          <Spacer />
          <HeaderWithSeeAll
            textHeader='My Favourite Courses'
            screenProps={screenProps}
            onPressSeeAll={() => {}}
          />
          <NoData text='No Courses' screenProps={screenProps} />
          <HeaderWithSeeAll
            textHeader='Top Seller Courses'
            screenProps={screenProps}
            onPressSeeAll={() => {}}
          />
          {hasTopSaleCourses ? (
            <FlatList
              data={filterTopSaleCourses}
              keyExtractor={(course) => course.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <Spacer>
                    <CardCourse
                      screenProps={screenProps}
                      item={item}
                      onLikeCourse={(courseId) => likeCourse({courseId})}
                    />
                  </Spacer>
                )
              }}
            />
          ) : (
            <NoData text='No Courses' screenProps={screenProps} />
          )}
        </WrapperContent>
      </ScrollView>
    </Container>
  )
}

HomeScreen.navigationOptions = ({navigation, screenProps}) => {
  const avatar = navigation.getParam('avatar')
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent',
    headerLeft: () => (
      <Spacer>
        <Ionicons
          name='settings-outline'
          size={24}
          color={screenProps.theme.colors.primary}
          onPress={() =>
            navigation.navigate('MyModal', {
              title: 'Settings'
            })
          }
        />
      </Spacer>
    ),
    headerRight: () => (
      <Spacer>
        <Avatar
          size='large'
          rounded
          source={{
            uri: avatar
          }}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
          avatarStyle={{width: 30, height: 30, marginTop: 25, marginLeft: 45}}
        />
      </Spacer>
    )
  }
}

const styles = StyleSheet.create({})

export default HomeScreen
