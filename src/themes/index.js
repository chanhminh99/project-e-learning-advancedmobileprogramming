import React, {useState, useEffect} from 'react'
import {SafeAreaView} from 'react-navigation'
import {StatusBar} from 'react-native'
import {ThemeProvider, withTheme} from 'styled-components/native'
import {
  Appearance,
  AppearanceProvider,
  useColorScheme
} from 'react-native-appearance'

import lightTheme from './light'
import darkTheme from './dark'
import myCustomTheme from './theme'
import {colors} from '../component/styles'

const defaultMode = Appearance.getColorScheme() || 'light'

export const ThemeContext = React.createContext({
  mode: defaultMode,
  setMode: (mode) => console.log(mode)
})

const ManageThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(defaultMode)
  const setMode = (mode) => setTheme(mode)

  useEffect(() => {
    const subscriber = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme)
    })
    // Will UnMount
    return () => subscriber.remove()
  }, [])

  const currentTheme = theme === 'dark' ? darkTheme.theme : lightTheme.theme

  console.log({...myCustomTheme, currentTheme})

  return (
    <ThemeContext.Provider value={{mode: theme, setMode}}>
      <ThemeProvider theme={{...myCustomTheme, ...currentTheme}}>
        <>
          <SafeAreaView
            style={{flex: 1}}
            forceInset={{top: 'always'}}
            backgroundColor={theme === 'dark' ? colors.bgDark : colors.bgLight}>
            <StatusBar
              barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
              translucent={true}
            />
            {children}
          </SafeAreaView>
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const ThemeManager = ({children}) => {
  return (
    <AppearanceProvider>
      <ManageThemeProvider>{children}</ManageThemeProvider>
    </AppearanceProvider>
  )
}

export default ThemeManager
