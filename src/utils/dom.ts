import {nanoid} from 'nanoid'

export const clickFnMap = new Map()

let registered = false
function getId (): string {
  return nanoid(4)
}

export function addClickAway (fn: () => void): string {
  const _id = getId()
  clickFnMap.set(_id, fn)
  return _id
}

export function removeClickAway (id: string): boolean {
  return clickFnMap.delete(id)
}

if (!registered) {
  registered = true
  document.addEventListener('click', function (e) {
    clickFnMap.size && clickFnMap.forEach(it => it?.(e))
  })
}
