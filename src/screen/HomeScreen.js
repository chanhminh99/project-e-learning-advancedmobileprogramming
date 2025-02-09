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

const HomeScreen = ({screenProps, navigation}) => {
  const {getUserInfo} = useContext(UserContext)
  const {
    state: {
      data: {topSaleCourses, ownCourses, favoriteCourses},
      userLike
    },
    getTopSellerCourses,
    getOwnCourses,
    getFavoriteCourses,
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
    getOwnCourses()

    const listener = navigation.addListener('didFocus', () => {
      getOwnCourses()
    })

    return () => {
      listener.remove()
    }
  }, [userLike])

  useEffect(() => {
    getFavoriteCourses()

    const listener = navigation.addListener('didFocus', () => {
      getFavoriteCourses()
    })

    return () => {
      listener.remove()
    }
  }, [userLike])

  useEffect(() => {
    getTopSellerCourses()

    const listener = navigation.addListener('didFocus', () => {
      getTopSellerCourses()
    })

    return () => {
      listener.remove()
    }
  }, [userLike])

  const hasOwnCourses = ownCourses.length > 0
  const hasTopSaleCourses = topSaleCourses.length > 0
  const hasFavoriteCourses = favoriteCourses.length > 0

  let filterOwnCourses
  if (hasOwnCourses) {
    filterOwnCourses = ownCourses.filter((value, idx) => {
      return idx < 5
    })
  }

  let filterTopSaleCourses
  if (hasTopSaleCourses) {
    filterTopSaleCourses = topSaleCourses.filter((value, idx) => {
      return idx < 5
    })
  }

  let filterFavoriteCourses
  if (hasFavoriteCourses) {
    filterFavoriteCourses = favoriteCourses.filter((vallue, idx) => idx < 5)
  }

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
            textHeader='Top Seller Courses'
            screenProps={screenProps}
            onPressSeeAll={() =>
              navigation.navigate('IndexCourse', {
                title: 'Top Seller'
              })
            }
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
                      onLikeCourse={({courseId}) => likeCourse({courseId})}
                      onPressCourse={() =>
                        navigation.navigate('DetailsCourse', {
                          courseId: item.id
                        })
                      }
                    />
                  </Spacer>
                )
              }}
            />
          ) : (
            <NoData text='No Courses' screenProps={screenProps} />
          )}
          <HeaderWithSeeAll
            textHeader='My Courses'
            screenProps={screenProps}
            onPressSeeAll={() =>
              navigation.navigate('IndexCourse', {
                title: 'My Courses'
              })
            }
          />
          {hasOwnCourses ? (
            <FlatList
              data={filterOwnCourses}
              keyExtractor={(course) => course.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <Spacer>
                    <CardCourse
                      screenProps={screenProps}
                      item={item}
                      onLikeCourse={({courseId}) => likeCourse({courseId})}
                      onPressCourse={() =>
                        navigation.navigate('DetailsCourse', {
                          courseId: item.id
                        })
                      }
                    />
                  </Spacer>
                )
              }}
            />
          ) : (
            <NoData text='No Courses' screenProps={screenProps} />
          )}
          <HeaderWithSeeAll
            textHeader='My Favorite Courses'
            screenProps={screenProps}
            onPressSeeAll={() =>
              navigation.navigate('IndexCourse', {
                title: 'My Favorite Courses'
              })
            }
          />
          {hasFavoriteCourses ? (
            <FlatList
              data={filterFavoriteCourses}
              keyExtractor={(course) => course.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <Spacer>
                    <CardCourse
                      screenProps={screenProps}
                      item={item}
                      onLikeCourse={({courseId}) => likeCourse({courseId})}
                      isFavorite
                      onPressCourse={() =>
                        navigation.navigate('DetailsCourse', {
                          courseId: item.id
                        })
                      }
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
