import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import {colors} from './src/component/styles'
//Screen
import InitialScreen from './src/screen/InitialScreen'
import SigninScreen from './src/screen/SigninScreen'
import SignupScreen from './src/screen/SignupScreen'
import BrowserScreen from './src/screen/BrowserScreen'
import DownloadsScreen from './src/screen/DownloadsScreen'
import HomeScreen from './src/screen/HomeScreen'
import SearchScreen from './src/screen/SearchScreen'
import ResolveAuthScreen from './src/screen/ResolveAuthScreen'
//Navigator
import {setNavigator} from './src/navigationRef'

//Provider
import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as UserProvider} from './src/context/UserContext'
import {Provider as CategoryProvider} from './src/context/CategoryContext'
import {Provider as CoursesProvider} from './src/context/CoursesContext'
import ThemeManager from './src/themes'
import {withTheme} from 'styled-components'

//Icon
import {AntDesign} from '@expo/vector-icons'
import {Foundation} from '@expo/vector-icons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Ionicons} from '@expo/vector-icons'
import ModalScreen from './src/screen/ModalScreen'
import ProfileScreen from './src/screen/ProfileScreen'
import SettingScreen from './src/screen/SettingScreen'
import IndexCourseScreen from './src/screen/IndexCourseScreen'
//Flow
const HomeFlow = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Setting: SettingScreen,
  IndexCourse: IndexCourseScreen
})

HomeFlow.navigationOptions = ({screenProps}) => {
  const activeTintColor = screenProps.theme.colors.primary
  const bgColor = screenProps.theme.background
  return {
    title: 'Home',
    tabBarIcon: ({tintColor}) => (
      <AntDesign name='home' size={24} color={tintColor} />
    ),
    tabBarOptions: {
      activeTintColor: activeTintColor,
      style: {
        backgroundColor: bgColor,
        paddingHorizontal: 5
      }
    }
  }
}

const DownloadsFlow = createStackNavigator({
  Downloads: DownloadsScreen
})

DownloadsFlow.navigationOptions = ({screenProps}) => {
  const activeTintColor = screenProps.theme.colors.primary
  const bgColor = screenProps.theme.background
  return {
    title: 'Download',
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons
        name='download-circle-outline'
        size={24}
        color={tintColor}
      />
    ),
    tabBarOptions: {
      activeTintColor: activeTintColor,
      style: {
        backgroundColor: bgColor,
        paddingHorizontal: 5
      }
    }
  }
}

const BrowserFlow = createStackNavigator({
  Browser: BrowserScreen,
  IndexCourse: IndexCourseScreen
})

BrowserFlow.navigationOptions = ({screenProps}) => {
  const activeTintColor = screenProps.theme.colors.primary
  const bgColor = screenProps.theme.background
  return {
    title: 'Browser',
    tabBarIcon: ({tintColor}) => (
      <Foundation name='page-multiple' size={24} color={tintColor} />
    ),
    tabBarOptions: {
      activeTintColor: activeTintColor,
      style: {
        backgroundColor: bgColor,
        paddingHorizontal: 5
      }
    }
  }
}

const SearchFlow = createStackNavigator({
  Search: SearchScreen
})

SearchFlow.navigationOptions = ({screenProps}) => {
  const activeTintColor = screenProps.theme.colors.primary
  const bgColor = screenProps.theme.background
  return {
    title: 'Download',
    tabBarIcon: ({tintColor}) => (
      <Ionicons name='search' size={24} color={tintColor} />
    ),
    tabBarOptions: {
      activeTintColor: activeTintColor,
      style: {
        backgroundColor: bgColor,
        paddingHorizontal: 5
      }
    }
  }
}

const Tabs = createBottomTabNavigator(
  {
    HomeFlow,
    DownloadsFlow,
    BrowserFlow,
    SearchFlow
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary,
      style: {
        backgroundColor: colors.backgroundInput,
        paddingHorizontal: 5
      }
    }
  }
)
Tabs.navigationOptions = () => {
  return {
    headerShown: true
  }
}

const MainStack = createStackNavigator(
  {
    Main: Tabs,
    MyModal: ModalScreen
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFLow: createStackNavigator({
      Init: InitialScreen,
      Signin: SigninScreen,
      Signup: SignupScreen
    }),
    mainFlow: MainStack
  },
  {
    initialRouteName: 'ResolveAuth',
    defaultNavigationOptions: {}
  }
)

const App = createAppContainer(switchNavigator)

const AppWithTheme = withTheme(({theme}) => {
  return (
    <App screenProps={{theme}} ref={(navigator) => setNavigator(navigator)} />
  )
})

export default () => {
  return (
    <CoursesProvider>
      <CategoryProvider>
        <UserProvider>
          <AuthProvider>
            <ThemeManager>
              <AppWithTheme />
            </ThemeManager>
          </AuthProvider>
        </UserProvider>
      </CategoryProvider>
    </CoursesProvider>
  )
}
