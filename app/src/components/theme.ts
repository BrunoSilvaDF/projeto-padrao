import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        color: mode('black', 'gray.600')(props),
      },
      h2: {
        color: mode('black', 'gray.400')(props),
      },
    }),
  },
})

export default theme
