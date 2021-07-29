import {defineConfig} from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

export default defineConfig({
  extract: {
    include: [
      'index.html',
      'src/**/*.vue',
    ],
    exclude: [
      'node_modules',
      '.git',
    ],
  },
  theme: {
    extend: {
      colors,
      gridTemplateColumns: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    // require('windicss/plugin/filters'),
    // require('windicss/plugin/forms'),
    // require('windicss/plugin/aspect-ratio'),
    // require('windicss/plugin/line-clamp'),
  ],
})
