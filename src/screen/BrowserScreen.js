import React, {useContext, useEffect} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native'
import styled from 'styled-components/native'
import Tile from '../component/common/Tile'
import Container from '../component/common/Container'
import Spacer from '../component/common/Spacer'
import HeaderWithSeeAll from '../component/common/HeaderWithSeeAll'
import HeaderTitle from '../component/common/HeaderTitle'
//Context

import {Context as CategoryContext} from '../context/CategoryContext'

const {width, height} = Dimensions.get('screen')

const WrapperContent = styled.View``

const BrowserScreen = ({screenProps, navigation}) => {
  const {
    state: {list: listCategories},
    getAllCategory
  } = useContext(CategoryContext)

  useEffect(() => {
    getAllCategory()
    const listener = navigation.addListener('didFocus', () => {
      getAllCategory()
    })

    return () => {
      listener.remove()
    }
  }, [])

  let indexEven = []

  const listCategoriesWithIndexEven = listCategories.filter((val, idx) => {
    if (idx % 2 === 0) {
      indexEven.push(idx)
      return idx % 2 === 0
    }
  })

  return (
    <Container theme={screenProps.theme}>
      <ScrollView>
        <HeaderTitle
          text='Browser'
          fontWeightText='bold'
          screenProps={screenProps}
        />
        <WrapperContent>
          <Spacer>
            <Tile
              height={width * 0.28}
              width={width * 0.95}
              imageSrc={require('../../assets/images/new_release.jpg')}
              title='New Releases'
              titleStyle={{
                fontSize: screenProps.theme.font.size.default * 2.5,
                fontWeight: '600',
                textTransform: 'uppercase',
                paddingBottom: screenProps.theme.spacing.newGutterSize,
                marginBottom: -screenProps.theme.spacing.newGutterSize
              }}
              onPress={() =>
                navigation.navigate('IndexCourse', {
                  title: 'New'
                })
              }
            />
            <Spacer />
            <Tile
              height={width * 0.28}
              width={width * 0.95}
              imageSrc={require('../../assets/images/recommend.jpg')}
              title='Recommend for you'
              titleStyle={{
                fontSize: screenProps.theme.font.size.default * 2.5,
                fontWeight: '600',
                textTransform: 'uppercase',
                paddingBottom: screenProps.theme.spacing.newGutterSize,
                marginBottom: -screenProps.theme.spacing.newGutterSize
              }}
              onPress={() =>
                navigation.navigate('IndexCourse', {
                  title: 'Recommend For You'
                })
              }
            />
          </Spacer>
          <Spacer />
          <HeaderWithSeeAll
            textHeader='Categories'
            screenProps={screenProps}
            isDisabled
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={listCategoriesWithIndexEven}
            keyExtractor={(category) => category.id}
            renderItem={({item, index}) => {
              return (
                <Spacer>
                  <Tile
                    height={width * 0.22}
                    width={width * 0.5}
                    imageSrc={require('../../assets/images/category1.jpg')}
                    title={item.name}
                    titleStyle={{
                      fontSize: screenProps.theme.font.size.default * 1.5,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      marginBottom:
                        -screenProps.theme.spacing.newGutterSize * 3,
                      height: width * 0.15
                    }}
                    onPress={() =>
                      navigation.navigate('IndexCourse', {
                        title: item.name,
                        categoryId: item.id
                      })
                    }
                  />
                  <Spacer />

                  {listCategories[indexEven[index] + 1] ? (
                    <Tile
                      height={width * 0.22}
                      width={width * 0.5}
                      imageSrc={require('../../assets/images/category2.jpg')}
                      title={listCategories[indexEven[index] + 1].name}
                      titleStyle={{
                        fontSize: screenProps.theme.font.size.default * 1.5,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        marginBottom:
                          -screenProps.theme.spacing.newGutterSize * 3,
                        height: width * 0.15
                      }}
                      onPress={() =>
                        navigation.navigate('IndexCourse', {
                          title: listCategories[indexEven[index] + 1].name,
                          categoryId: listCategories[indexEven[index] + 1].id
                        })
                      }
                    />
                  ) : null}
                </Spacer>
              )
            }}
          />
          <Spacer />
        </WrapperContent>
      </ScrollView>
    </Container>
  )
}

BrowserScreen.navigationOptions = ({screenProps}) => {
  return {
    headerStyle: {
      backgroundColor: screenProps.theme.background,
      shadowColor: 'transparent'
    },
    headerTintColor: 'transparent'
  }
}

const styles = StyleSheet.create({})

export default BrowserScreen
