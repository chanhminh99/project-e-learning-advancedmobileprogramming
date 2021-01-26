import React, {useContext, useEffect} from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  LogBox
} from 'react-native'
import {Button, Card} from 'react-native-elements'
import Container from '../component/common/Container'
import styled from 'styled-components/native'
import Spacer from '../component/common/Spacer'
import TextHeader from '../component/common/TextHeader'

import HeaderWithSeeAll from '../component/common/HeaderWithSeeAll'
//Icon
import {
  Ionicons,
  Entypo,
  FontAwesome,
  Feather,
  MaterialCommunityIcons
} from '@expo/vector-icons'

//Context
import {Context as CoursesContext} from '../context/CoursesContext'
//Hooks
import useUserCourse from '../hooks/useUserCourse'
import {TouchableOpacity} from 'react-native-gesture-handler'
import NoData from '../component/courses/NoData'

//Style

const {width, height} = Dimensions.get('screen')

const WrapperHeaderStyled = styled.View`
  background: ${({theme}) => theme.colors.lightGrey};
`

const WrapperHeaderIcon = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const WrapperHeaderContent = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin: ${({theme}) => theme.spacing.gutterSize}px;
`

const WrapperItemInfoStyled = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const WrapperItemInfo = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-height: ${({theme}) => theme.font.size.largest * 1.5}px;
  border-radius: ${({theme}) => theme.spacing.newGutterSize}px;
  border: 1px solid ${({theme}) => theme.text};
  padding: ${({theme}) => theme.spacing.newGutterSize / 2}px;
  margin-right: ${({theme}) => theme.spacing.newGutterSize * 2}px;
  margin-bottom: ${({theme}) => theme.spacing.newGutterSize * 1.5}px;
`

const WrapperContentStyled = styled.View`
  flex: 1 0 0;
  align-items: flex-start;
  margin: ${({theme}) => theme.spacing.gutterSize}px;
`

const WrapperPaymentContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const WrapperMainInfo = styled.View`
  align-items: flex-start;
  justify-content: center;
  flex: 1 0 0;
`

const CourseDetailScreen = ({screenProps, navigation}) => {
  const courseId = navigation.getParam('courseId')

  const [dummyFunction, getLatestCourseDetailsByUser] = useUserCourse({
    courseId
  })

  const {
    state: {
      data: {latestCourseDetails},
      userBuyCourse,
      userLike
    },
    likeCourse,
    checkOutCourse
  } = useContext(CoursesContext)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  useEffect(() => {
    getLatestCourseDetailsByUser()

    const listener = navigation.addListener('didFocus', () => {
      getLatestCourseDetailsByUser()
    })

    return () => {
      listener.remove()
    }
  }, [userBuyCourse, userLike])

  return (
    <Container theme={screenProps.theme}>
      {latestCourseDetails && (
        <>
          <WrapperHeaderStyled theme={screenProps.theme}>
            <Spacer>
              <WrapperHeaderIcon>
                <Ionicons
                  name='chevron-back'
                  size={screenProps.theme.font.size.largest * 1.5}
                  color={screenProps.theme.colors.primary}
                  onPress={() => navigation.goBack()}
                />
                <Entypo
                  name='share-alternative'
                  size={screenProps.theme.font.size.largest * 1.2}
                  color={screenProps.theme.colors.primary}
                />
              </WrapperHeaderIcon>
              <Spacer />
              <WrapperHeaderContent theme={screenProps.theme}>
                <TextHeader
                  text={latestCourseDetails.title}
                  textStyle={{
                    color: screenProps.theme.text,
                    textTransform: 'none',
                    fontSize: screenProps.theme.font.size.largest * 2,
                    letterSpacing: 0,
                    fontWeight: '400'
                  }}
                />
                <TextHeader
                  text={latestCourseDetails.subtitle}
                  textStyle={{
                    color: screenProps.theme.text,
                    textTransform: 'none',
                    fontSize: screenProps.theme.font.size.medium,
                    letterSpacing: 0,
                    fontWeight: '400'
                  }}
                />
                <WrapperItemInfoStyled>
                  <WrapperItemInfo>
                    <FontAwesome
                      name='star'
                      size={screenProps.theme.font.size.large}
                      color={screenProps.theme.text}
                    />
                    <Text
                      style={{
                        color: screenProps.theme.text,
                        fontSize: screenProps.theme.font.size.large,
                        letterSpacing: 0,
                        fontWeight: '400',
                        lineHeight: screenProps.theme.font.size.large,
                        padding: screenProps.theme.spacing.newGutterSize / 2
                      }}>
                      {isNaN(latestCourseDetails.averagePoint) ||
                      latestCourseDetails.averagePoint > 5 ||
                      latestCourseDetails.averagePoint === 'NaN' ||
                      typeof latestCourseDetails.averagePoint !== 'number'
                        ? 5
                        : latestCourseDetails.averagePoint}
                    </Text>
                  </WrapperItemInfo>
                  <WrapperItemInfo>
                    <MaterialCommunityIcons
                      name='account'
                      size={screenProps.theme.font.size.large}
                      color={screenProps.theme.text}
                    />
                    <Text
                      style={{
                        color: screenProps.theme.text,
                        fontSize: screenProps.theme.font.size.large,
                        letterSpacing: 0,
                        fontWeight: '400',
                        lineHeight: screenProps.theme.font.size.large,
                        padding: screenProps.theme.spacing.newGutterSize / 2
                      }}>
                      {latestCourseDetails.soldNumber} Enrolled
                    </Text>
                  </WrapperItemInfo>
                  <WrapperItemInfo>
                    <Entypo
                      name='controller-play'
                      size={screenProps.theme.font.size.large}
                      color={screenProps.theme.text}
                    />
                    <Text
                      style={{
                        color: screenProps.theme.text,
                        fontSize: screenProps.theme.font.size.large,
                        letterSpacing: 0,
                        fontWeight: '400',
                        lineHeight: screenProps.theme.font.size.large,
                        padding: screenProps.theme.spacing.newGutterSize / 2
                      }}>
                      {latestCourseDetails.totalHours > 1
                        ? `${latestCourseDetails.totalHours.toFixed(2)} hours`
                        : `${(latestCourseDetails.totalHours * 60).toFixed(
                            2
                          )} minutes`}
                    </Text>
                  </WrapperItemInfo>
                  <WrapperItemInfo>
                    <Text
                      style={{
                        color: screenProps.theme.text,
                        fontSize: screenProps.theme.font.size.large,
                        letterSpacing: 0,
                        fontWeight: '400',
                        lineHeight: screenProps.theme.font.size.large,
                        padding: screenProps.theme.spacing.newGutterSize / 2
                      }}>
                      {`Created by ${
                        latestCourseDetails.instructor
                          ? latestCourseDetails.instructor.name
                          : 'Author A'
                      }`}
                    </Text>
                  </WrapperItemInfo>
                  <WrapperItemInfo>
                    <Text
                      style={{
                        color: screenProps.theme.text,
                        fontSize: screenProps.theme.font.size.large,
                        letterSpacing: 0,
                        fontWeight: '400',
                        lineHeight: screenProps.theme.font.size.large,
                        padding: screenProps.theme.spacing.newGutterSize / 2
                      }}>
                      {`Updated ${new Date(
                        latestCourseDetails['updatedAt']
                      ).toLocaleDateString('en-us', {
                        month: 'short'
                      })} ${new Date(
                        latestCourseDetails['updatedAt']
                      ).getFullYear()}`}
                    </Text>
                  </WrapperItemInfo>
                </WrapperItemInfoStyled>
              </WrapperHeaderContent>
            </Spacer>
          </WrapperHeaderStyled>
          <Spacer />
          <ScrollView>
            <WrapperContentStyled>
              <WrapperPaymentContent>
                <Text
                  style={{
                    color: screenProps.theme.text,
                    fontSize: screenProps.theme.font.size.largest * 1.5,
                    letterSpacing: 0,
                    fontWeight: 'bold'
                  }}>
                  {latestCourseDetails.price === 0
                    ? 'Free'
                    : new Intl.NumberFormat('vn-US', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(latestCourseDetails.price)}
                </Text>
                <Button
                  buttonStyle={{
                    marginHorizontal:
                      screenProps.theme.spacing.gutterSize * 1.2,
                    width: width * 0.4
                  }}
                  title={latestCourseDetails.isOwn ? 'Download' : 'Buy Now'}
                  titleStyle={{
                    fontSize: screenProps.theme.font.size.largest * 1.15,
                    color: screenProps.theme.text,
                    fontWeight: 'bold'
                  }}
                  onPress={() => {
                    latestCourseDetails.isOwn
                      ? console.log('go watch screen')
                      : checkOutCourse({courseId: latestCourseDetails.id})
                  }}
                />
                <View style={{flex: 1, alignSelf: 'center'}}>
                  {latestCourseDetails.likeStatus ? (
                    <FontAwesome
                      name='heart'
                      size={24}
                      color={screenProps.theme.colors.customRed}
                      onPress={() => likeCourse({courseId})}
                    />
                  ) : (
                    <Feather
                      name='heart'
                      size={24}
                      color={screenProps.theme.colors.customRed}
                      onPress={() => likeCourse({courseId})}
                    />
                  )}
                </View>
              </WrapperPaymentContent>
              <Spacer />
              <WrapperMainInfo>
                <HeaderWithSeeAll
                  textHeader='What will I learn?'
                  screenProps={screenProps}
                  isDisabled
                />
                <View
                  style={{
                    flex: 1,
                    borderColor: screenProps.theme.text,
                    borderRadius: screenProps.theme.spacing.gutterSize,
                    borderWidth: 2,
                    padding: screenProps.theme.spacing.gutterSize,
                    margin: 0
                  }}>
                  {latestCourseDetails.learnWhat ? (
                    <FlatList
                      data={latestCourseDetails.learnWhat}
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({item}) => {
                        return (
                          <Text
                            style={{
                              color: screenProps.theme.text
                            }}>{`- ${item}`}</Text>
                        )
                      }}
                    />
                  ) : null}
                </View>
                <HeaderWithSeeAll
                  textHeader='Description'
                  screenProps={screenProps}
                  isDisabled
                />
                <View
                  style={{
                    flex: 1,
                    borderColor: screenProps.theme.text,
                    borderRadius: screenProps.theme.spacing.gutterSize,
                    borderWidth: 2,
                    padding: screenProps.theme.spacing.gutterSize,
                    margin: 0
                  }}>
                  <Text
                    style={{
                      color: screenProps.theme.text
                    }}>
                    {latestCourseDetails.description}
                  </Text>
                </View>
                <HeaderWithSeeAll
                  textHeader='Requirements'
                  screenProps={screenProps}
                  isDisabled
                />
                <View
                  style={{
                    flex: 1,
                    borderColor: screenProps.theme.text,
                    borderRadius: screenProps.theme.spacing.gutterSize,
                    borderWidth: 2,
                    padding: screenProps.theme.spacing.gutterSize,
                    margin: 0
                  }}>
                  {latestCourseDetails.requirement ? (
                    <FlatList
                      data={latestCourseDetails.requirement}
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={({item}) => {
                        return (
                          <Text
                            style={{
                              color: screenProps.theme.text
                            }}>{`- ${item}`}</Text>
                        )
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        color: screenProps.theme.text
                      }}>
                      No
                    </Text>
                  )}
                </View>
                <HeaderWithSeeAll
                  textHeader='Curriculum'
                  screenProps={screenProps}
                  isDisabled
                />
                <View
                  style={{
                    flex: 1,
                    width: width * 0.96,
                    borderColor: screenProps.theme.text,
                    borderRadius: screenProps.theme.spacing.gutterSize,
                    borderWidth: 2,
                    padding: screenProps.theme.spacing.gutterSize,
                    margin: 0
                  }}>
                  {latestCourseDetails.section ? (
                    <FlatList
                      data={latestCourseDetails.section}
                      keyExtractor={(item, idx) => item.id}
                      renderItem={({item: section}) => {
                        return (
                          <>
                            <Text
                              style={{
                                color: screenProps.theme.text,
                                fontWeight: 'bold',
                                fontSize:
                                  screenProps.theme.font.size.largest * 1.2
                              }}>{`${section.name}`}</Text>

                            {section.lesson ? (
                              <Spacer>
                                <FlatList
                                  data={section.lesson}
                                  keyExtractor={(item, idx) => item.id}
                                  renderItem={({item: lesson, index}) => {
                                    return (
                                      <TouchableOpacity>
                                        <Text
                                          style={{
                                            color: screenProps.theme.text,
                                            fontWeight: 'bold',
                                            fontSize:
                                              screenProps.theme.font.size
                                                .largest * 0.8
                                          }}>
                                          {`${index + 1} - ${lesson.name} - ${
                                            lesson.hours > 1
                                              ? `${lesson.hours.toFixed(
                                                  2
                                                )} hours`
                                              : `${(lesson.hours * 60).toFixed(
                                                  2
                                                )} mins`
                                          }`}
                                        </Text>
                                      </TouchableOpacity>
                                    )
                                  }}
                                />
                              </Spacer>
                            ) : null}
                          </>
                        )
                      }}
                    />
                  ) : null}
                </View>
                <HeaderWithSeeAll
                  textHeader='Created by'
                  screenProps={screenProps}
                  isDisabled
                />
                <View style={{flex: 1}}>
                  {latestCourseDetails.instructor ? (
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
                          source={{
                            uri:
                              latestCourseDetails.instructor.avatar ||
                              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs-bsLd6mUlSjhP9DNiVnSa4QfLCa4u9kKbg&usqp=CAU'
                          }}
                        />
                        <View>
                          <Text
                            style={{
                              color: screenProps.theme.text,
                              fontSize: screenProps.theme.font.size.largest,
                              marginLeft: screenProps.theme.spacing.gutterSize
                            }}>
                            {latestCourseDetails.instructor.name}
                          </Text>
                          <Text
                            style={{
                              color: screenProps.theme.text,
                              fontSize: screenProps.theme.font.size.default,
                              marginLeft: screenProps.theme.spacing.gutterSize
                            }}>
                            {latestCourseDetails.instructor.totalCourse} courses
                          </Text>
                        </View>
                      </View>
                    </Card>
                  ) : null}
                </View>
                <HeaderWithSeeAll
                  textHeader='Student feedback'
                  screenProps={screenProps}
                  isDisabled
                />
                <View style={{flex: 1}}>
                  {latestCourseDetails.ratings ? (
                    <FlatList
                      data={latestCourseDetails.ratings.ratingList}
                      keyExtractor={(item) => item.id}
                      renderItem={({item}) => {
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
                                style={{
                                  borderRadius: 50,
                                  width: 50,
                                  height: 50
                                }}
                                resizeMode='cover'
                                source={{
                                  uri:
                                    item.user.avatar ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs-bsLd6mUlSjhP9DNiVnSa4QfLCa4u9kKbg&usqp=CAU'
                                }}
                              />
                              <View>
                                <Text
                                  style={{
                                    color: screenProps.theme.text,
                                    fontSize:
                                      screenProps.theme.font.size.largest,
                                    marginLeft:
                                      screenProps.theme.spacing.gutterSize
                                  }}>
                                  {item.user.name}
                                </Text>

                                <View
                                  style={{
                                    margin:
                                      screenProps.theme.spacing.newGutterSize,
                                    flex: 1,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                  }}>
                                  <Text
                                    style={{
                                      color: screenProps.theme.text,
                                      fontSize:
                                        screenProps.theme.font.size.medium,
                                      marginLeft:
                                        screenProps.theme.spacing.gutterSize
                                    }}>
                                    {`Comment: ${item.content}`}
                                  </Text>
                                  <Spacer />
                                  <Text
                                    style={{
                                      color: screenProps.theme.text,
                                      fontSize:
                                        screenProps.theme.font.size.medium,
                                      marginLeft:
                                        screenProps.theme.spacing.gutterSize
                                    }}>
                                    Rating:
                                  </Text>
                                  <Text
                                    style={{
                                      color: screenProps.theme.text,
                                      fontSize:
                                        screenProps.theme.font.size.medium,
                                      letterSpacing: 0,
                                      fontWeight: '400',
                                      lineHeight:
                                        screenProps.theme.font.size.medium,
                                      padding:
                                        screenProps.theme.spacing
                                          .newGutterSize / 2
                                    }}>
                                    {isNaN(item.averagePoint) ||
                                    item.averagePoint > 5 ||
                                    item.averagePoint === 'NaN' ||
                                    typeof item.averagePoint !== 'number'
                                      ? 5
                                      : item.averagePoint}
                                  </Text>
                                  <FontAwesome
                                    name='star'
                                    size={screenProps.theme.font.size.medium}
                                    color={screenProps.theme.text}
                                  />
                                </View>
                              </View>
                            </View>
                          </Card>
                        )
                      }}
                    />
                  ) : null}
                </View>
                <HeaderWithSeeAll
                  textHeader='Course Related'
                  screenProps={screenProps}
                  isDisabled
                />
                <NoData text='No Course' screenProps={screenProps} />
              </WrapperMainInfo>
            </WrapperContentStyled>
          </ScrollView>
        </>
      )}
    </Container>
  )
}

CourseDetailScreen.navigationOptions = ({navigation, screenProps}) => {
  return {
    headerShown: false,
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    }
  }
}

export default CourseDetailScreen
