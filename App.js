import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './src/screen/Home'
import {colors} from './src/component/styles'
import SignIn from './src/component/signin'
const navigatior = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn: SignIn
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'E-Learning App',
      headerMode: 'screen',
      cardStyle: {backgroundColor: colors.bgDark}
    }
  }
)

export default createAppContainer(navigatior)
