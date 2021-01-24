import React, {useContext, useEffect} from 'react'
import {View, Text, FlatList} from 'react-native'
import Container from '../component/common/Container'
import Spacer from '../component/common/Spacer'

import ItemCourse from '../component/courses/ItemCourse'
import NoData from '../component/courses/NoData'
import {Context as CoursesContext} from '../context/CoursesContext'

//Hook
import useUserCourse from '../hooks/useUserCourse'
const IndexCourseScreen = ({screenProps, navigation}) => {
  const {
    state: {data, userLike},
    getOwnCourses,
    getTopSellerCourses,
    getTopNewCourses,
    getCoursesWithCategory,
    likeCourse
  } = useContext(CoursesContext)

  const [getRecommendedCourses] = useUserCourse()

  const title = navigation.getParam('title')
  const categoryId = navigation.getParam('categoryId')

  let list = []
  let hasTopSaleCourses
  let hasTopNewCourses
  let hasRecommendCourses
  let hasOwnCourses
  let hasCoursesWithCategory

  if (categoryId) {
    useEffect(() => {
      getCoursesWithCategory(categoryId)

      const listener = navigation.addListener('didFocus', () => {
        getCoursesWithCategory(categoryId)
      })

      return () => {
        listener.remove()
      }
    }, [userLike])
    hasCoursesWithCategory = data.coursesWithCategory.length > 0
    if (hasCoursesWithCategory) {
      list = data.coursesWithCategory || []
    }
  }
  switch (title) {
    case 'My Courses':
      useEffect(() => {
        getOwnCourses()

        const listener = navigation.addListener('didFocus', () => {
          getOwnCourses()
        })

        return () => {
          listener.remove()
        }
      }, [userLike])
      hasOwnCourses = data.ownCourses.length > 0
      if (hasOwnCourses && title === 'My Courses') {
        list = data.ownCourses || []
      }
    case 'Top Seller':
      useEffect(() => {
        getTopSellerCourses()

        const listener = navigation.addListener('didFocus', () => {
          getTopSellerCourses()
        })

        return () => {
          listener.remove()
        }
      }, [userLike])
      hasTopSaleCourses = data.topSaleCourses.length > 0
      if (hasTopSaleCourses && title === 'Top Seller') {
        list = data.topSaleCourses || []
      }
    case 'New':
      useEffect(() => {
        getTopNewCourses()
        const listener = navigation.addListener('didFocus', () => {
          getTopNewCourses()
        })

        return () => {
          listener.remove()
        }
      }, [userLike])
      hasTopNewCourses = data.topNewCourses.length > 0
      if (hasTopNewCourses && title === 'New') {
        list = data.topNewCourses || []
      }
    case 'Recommend For You':
      useEffect(() => {
        getRecommendedCourses()

        const listener = navigation.addListener('didFocus', () => {
          getRecommendedCourses()
        })

        return () => {
          listener.remove()
        }
      }, [userLike])
      hasRecommendCourses = data.recommendedCourses.length > 0
      if (hasRecommendCourses && title === 'Recommend For You') {
        list = data.recommendedCourses || []
      }
    default:
      null
  }

  const hasCourses = list.length > 0

  return (
    <Container theme={screenProps.theme}>
      {hasCourses ? (
        categoryId ? (
          <FlatList
            data={list}
            keyExtractor={(course) => course.id}
            renderItem={({item}) => {
              return (
                <Spacer>
                  <ItemCourse
                    category
                    screenProps={screenProps}
                    item={item}
                    onLikeCourse={({courseId}) => likeCourse({courseId})}
                  />
                </Spacer>
              )
            }}
          />
        ) : (
          <FlatList
            data={list}
            keyExtractor={(course) => course.id}
            renderItem={({item}) => {
              return (
                <Spacer>
                  <ItemCourse
                    screenProps={screenProps}
                    item={item}
                    onLikeCourse={({courseId}) => likeCourse({courseId})}
                  />
                </Spacer>
              )
            }}
          />
        )
      ) : (
        <NoData text='No Courses' screenProps={screenProps} />
      )}
    </Container>
  )
}

IndexCourseScreen.navigationOptions = ({navigation, screenProps}) => {
  return {
    title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: screenProps.theme.text
  }
}

export default IndexCourseScreen
