import type { RouteRecordRaw } from 'vue-router'

interface ExampleRouter {
  [key: string]: RouteRecordRaw[]
}

const menuList: Record<string, any> = import.meta.glob('../views/**/*.vue', {
  eager: true
})
const exampleRoutesMap: ExampleRouter = {}
Object.keys(menuList).map((key) => {
  const paths: string[] = key.match(/\/[^/.]+/g) || []
  const path = paths[1] as string
  if (!paths[2]) return
  // const name = `${paths[1].replace('/', '')}-${paths[2].replace('/', '')}`
  let name = ''
  for (let i = 1; i < paths.length; i++) {
    name += paths[i].replace('/', '')
    if (i < paths.length - 1) name += '-'
  }
  const childrenMap = exampleRoutesMap[path] || []
  const com = menuList[key].default
  childrenMap.push({
    path: `${paths.slice(1).join('')}`,
    name,
    component: com
  })
  exampleRoutesMap[path] = childrenMap
})
export const exampleRoutes = Object.entries(exampleRoutesMap).map((item) => ({
  path: item[0],
  name: item[0].replace('/', ''),
  children: item[1]
}))
