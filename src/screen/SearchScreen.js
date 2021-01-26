import React, {useState, useContext, useEffect} from 'react'
import {
  View,
  FlatList,
  ScrollView,
  LogBox,
  TouchableOpacity
} from 'react-native'
import {SafeAreaView, NavigationEvents} from 'react-navigation'
import Container from '../component/common/Container'
import HeaderTitle from '../component/common/HeaderTitle'
import {Input, ButtonGroup, Text, Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Feather} from '@expo/vector-icons'
import HeaderWithSeeAll from '../component/common/HeaderWithSeeAll'
import NoData from '../component/courses/NoData'
import ItemCourse from '../component/courses/ItemCourse'

//Context
import {Context as AuthContext} from '../context/AuthContext'
import {Context as SearchContext} from '../context/SearchContext'
import Spacer from '../component/common/Spacer'
import ItemInstructor from '../component/courses/ItemInstructor'

const SearchScreen = ({screenProps, navigation}) => {
  const {
    state: {
      data: {courses, instructors},
      history
    },
    search,
    clearData,
    getSearchHistory,
    deleteHistory
  } = useContext(SearchContext)

  const {
    state: {token}
  } = useContext(AuthContext)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  useEffect(() => {
    getSearchHistory()

    const listener = navigation.addListener('didFocus', () => {
      getSearchHistory()
    })

    return () => {
      listener.remove()
    }
  }, [])

  console.log(history)

  const component1 = () => (
    <Text
      style={{
        color: screenProps.theme.text,
        fontSize: screenProps.theme.font.size.largest
      }}>
      All
    </Text>
  )
  const component2 = () => (
    <Text
      style={{
        color: screenProps.theme.text,
        fontSize: screenProps.theme.font.size.largest
      }}>
      Courses
    </Text>
  )
  const component3 = () => (
    <Text
      style={{
        color: screenProps.theme.text,
        fontSize: screenProps.theme.font.size.largest
      }}>
      Authors
    </Text>
  )

  const buttons = [
    {element: component1},
    {element: component2},
    {element: component3}
  ]

  const [keyword, setKeyword] = useState('')
  const [index, setIndex] = useState(0)

  const hasSearchHistory = history.length > 0

  const hasCoursesOnSearch = courses.data.length > 0
  const hasInstructorsOnSearch = instructors.data.length > 0

  let filterCourses
  if (hasCoursesOnSearch) {
    filterCourses = courses.data.filter((value, idx) => idx < 3)
  }

  const flagRender =
    !hasCoursesOnSearch && !hasInstructorsOnSearch && !keyword && index === 0

  const [shouldRenderHistory, setShouldRenderHistory] = useState(flagRender)

  console.log(shouldRenderHistory)

  return (
    <Container theme={screenProps.theme}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => {
            clearData()
            setKeyword('')
            setIndex(0)
            setShouldRenderHistory(true)
          }}
        />
        <ScrollView>
          <HeaderTitle
            text='Search'
            fontWeightText='bold'
            screenProps={screenProps}
          />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={() =>
              search({keyword, token, limit: 10, offset: 1})
            }
            placeholder='Type your keyword ...'
            leftIcon={
              <Icon
                name='search'
                size={screenProps.theme.font.size.largest * 1.15}
                color={screenProps.theme.colors.customLightGrey}
              />
            }
            inputStyle={{
              color: screenProps.theme.text,
              marginLeft: screenProps.theme.spacing.gutterSize,
              fontSize: screenProps.theme.font.size.largest * 1.15
            }}
          />
          {shouldRenderHistory ? (
            <View>
              <HeaderWithSeeAll
                textHeader='History'
                screenProps={screenProps}
                isDisabled
              />
              {hasSearchHistory ? (
                <FlatList
                  data={history}
                  keyExtractor={(history) => history.id}
                  renderItem={({item}) => {
                    const id = item.id
                    return (
                      <Spacer>
                        <TouchableOpacity
                          onPress={() => {
                            search({
                              keyword: item.content,
                              token,
                              limit: 10,
                              offset: 1
                            })
                            setShouldRenderHistory(false)
                          }}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flex: 1,
                              flexDirection: 'row'
                            }}>
                            <Text
                              style={{
                                color: screenProps.theme.text,
                                fontSize:
                                  screenProps.theme.font.size.largest * 1.2
                              }}>
                              {item.content}
                            </Text>
                            <Feather
                              name='delete'
                              size={screenProps.theme.font.size.largest * 1.2}
                              color={screenProps.theme.colors.customRed}
                              onPress={() => deleteHistory({id})}
                            />
                          </View>
                        </TouchableOpacity>
                      </Spacer>
                    )
                  }}
                />
              ) : (
                <NoData text='No search history' screenProps={screenProps} />
              )}
            </View>
          ) : (
            <View>
              <ButtonGroup
                onPress={setIndex}
                selectedIndex={index}
                buttons={buttons}
                containerStyle={{
                  height: screenProps.theme.font.size.largest * 1.5
                }}
                buttonContainerStyle={{
                  backgroundColor: screenProps.theme.background
                }}
              />
              <Spacer />
              {index === 0 && (
                <>
                  <HeaderWithSeeAll
                    textHeader='Courses'
                    screenProps={screenProps}
                    onPressSeeAll={() => setIndex(1)}
                  />
                  {hasCoursesOnSearch ? (
                    <FlatList
                      data={filterCourses}
                      keyExtractor={(course) => course.id}
                      renderItem={({item}) => {
                        return (
                          <Spacer>
                            <ItemCourse
                              screenProps={screenProps}
                              item={item}
                              onLikeCourse={({courseId}) =>
                                likeCourse({courseId})
                              }
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
                    <NoData text='No results' screenProps={screenProps} />
                  )}

                  <HeaderWithSeeAll
                    textHeader='Authors'
                    screenProps={screenProps}
                    onPressSeeAll={() => setIndex(2)}
                  />
                  {hasInstructorsOnSearch ? (
                    <FlatList
                      data={instructors.data}
                      keyExtractor={(instructors) => instructors.id}
                      renderItem={({item}) => {
                        return (
                          <Spacer>
                            <ItemInstructor
                              screenProps={screenProps}
                              item={item}
                            />
                          </Spacer>
                        )
                      }}
                    />
                  ) : (
                    <NoData text='No results' screenProps={screenProps} />
                  )}
                </>
              )}
              {index === 1 && (
                <>
                  {hasCoursesOnSearch ? (
                    <FlatList
                      data={courses.data}
                      keyExtractor={(course) => course.id}
                      renderItem={({item}) => {
                        return (
                          <Spacer>
                            <ItemCourse
                              screenProps={screenProps}
                              item={item}
                              onLikeCourse={({courseId}) =>
                                likeCourse({courseId})
                              }
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
                    <NoData text='No results' screenProps={screenProps} />
                  )}
                </>
              )}
              {index === 2 && (
                <>
                  {hasInstructorsOnSearch ? (
                    <FlatList
                      data={instructors.data}
                      keyExtractor={(instructors) => instructors.id}
                      renderItem={({item}) => {
                        return (
                          <Spacer>
                            <ItemInstructor
                              screenProps={screenProps}
                              item={item}
                              onLikeCourse={({courseId}) =>
                                likeCourse({courseId})
                              }
                            />
                          </Spacer>
                        )
                      }}
                    />
                  ) : (
                    <NoData text='No results' screenProps={screenProps} />
                  )}
                </>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Container>
  )
}

SearchScreen.navigationOptions = ({screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent'
  }
}

export default SearchScreen
