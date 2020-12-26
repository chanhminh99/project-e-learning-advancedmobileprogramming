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

//Navigator
import {setNavigator} from './src/navigationRef'

//Provider
import {Provider as AuthProvider} from './src/context/AuthContext'

const switchNavigator = createSwitchNavigator({
  loginFLow: createStackNavigator(
    {
      Init: InitialScreen,
      Signin: SigninScreen,
      Signup: SignupScreen
    },
    {
      defaultNavigationOptions: {
        cardStyle: {backgroundColor: colors.bgDark},
        headerStyle: {
          backgroundColor: colors.bgDark
        },
        // headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.white
        }
      }
    }
  ),
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Downloads: DownloadsScreen,
    Browser: BrowserScreen,
    Search: SearchScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </AuthProvider>
  )
}
