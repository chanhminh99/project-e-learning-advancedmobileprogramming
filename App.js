import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import {colors} from './src/component/styles'
import SafeAreaView from './src/component/common/SafeView'
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
import ThemeManager from './src/themes'
import {withTheme} from 'styled-components'
const switchNavigator = withTheme(
  createSwitchNavigator(
    {
      ResolveAuth: ResolveAuthScreen,
      loginFLow: createStackNavigator({
        Init: InitialScreen,
        Signin: SigninScreen,
        Signup: SignupScreen
      }),
      mainFlow: createBottomTabNavigator(
        {
          Home: HomeScreen,
          Downloads: DownloadsScreen,
          Browser: BrowserScreen,
          Search: SearchScreen
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
    },
    {
      initialRouteName: 'ResolveAuth',
      defaultNavigationOptions: {
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }
    }
  )
)

const App = createAppContainer(switchNavigator)

const AppWithTheme = withTheme(({theme}) => {
  return (
    <App screenProps={{theme}} ref={(navigator) => setNavigator(navigator)} />
  )
})

export default () => {
  return (
    <UserProvider>
      <AuthProvider>
        <ThemeManager>
          <AppWithTheme />
        </ThemeManager>
      </AuthProvider>
    </UserProvider>
  )
}
