const baseColor = {
  yellow: '#ff0',
  darkYellow: '#CCCC00',
  green: '#10C84D',
  blue: '#3FB3EC',
  black: '#24262B',
  lightGrey: '#969696',
  white: '#FFFFFF',
  orange: '#FD7D48',
  lightPurple3: '#d9d5f7',
  customGreen: '#27AE60',
  customRed: '#F23262',
  customOrange: '#FFB400',
  customLightGrey: '#BDC2D0',
  customGrey: '#767885'
}

const normalizeColors = {
  ...baseColor,
  primary: '#0084BD',
  backgroundInput: '#1E2429',
  labelInput: 'rgba(138, 153, 168, 1)',
  backgroundHeader: '#1E2429',
  bgDark: '#0D0F12',
  bgLight: '#EDEDED',
  textHeader: 'rgba(138, 153, 168, 1)'
}

Object.keys(normalizeColors).map((key) => {
  if (
    normalizeColors[key].includes('rgb') ||
    normalizeColors[key].includes('rgba')
  ) {
    return normalizeColors[key]
  }
  return (normalizeColors[key] = normalizeColors[key].toUpperCase())
})

export default normalizeColors
