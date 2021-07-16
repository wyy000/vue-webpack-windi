import {RouteRecordRaw} from 'vue-router'

export const level: Array<RouteRecordRaw> = []

export default function getLevelRef (): Array<RouteRecordRaw> {
  const path = require.context('.', true, /\.vue$/)
  path.keys().forEach(it => {
    const matches = /^\.\/(.*)\/(.*)\.vue/g.exec(it)
    if (matches) {
      const item = level.find(item => item.name === `${matches[1]}-Index`)
      if (item) {
        if (matches[2] === 'Index') return
        item.children!.push({
          name: matches[2],
          path: matches[2].toLowerCase(),
          component: () => import(`@/views/${matches[1]}/${matches[2]}`)
        })
      }
      else {
        level.push({
          path: `/${matches[1]}`,
          name: `${matches[1]}-Index`,
          component: () => import(`@/views/${matches[1]}/Index`),
          children: [{name: matches[2], path: matches[2].toLowerCase(), component: () => import(`@/views/${matches[1]}/${matches[2]}.vue`)}],
        })
      }
    } else {
      const oneMatches = /^\.\/((.*)\.vue)/g.exec(it)
      if (oneMatches) {
        level.push({
          path: `/${oneMatches[2].toLowerCase()}`,
          name: oneMatches[2],
          component: () => import(`@/views/${oneMatches[2]}.vue`),
        })
      }
    }
  })

  return level
}
