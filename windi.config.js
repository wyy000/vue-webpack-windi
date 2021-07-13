import {defineConfig} from 'windicss/helpers'
import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

export default defineConfig({
  extract: {
    include: [
      'index.html',
      'src/**/*.vue',
    ],
  },
  theme: {
    extend: {
      // colors,
    },
  },
})
