import {nanoid} from 'nanoid'

export const clickFnMap = new Map()

let registered = false
function getId (): string {
  return nanoid(4)
}

export function addClickAway (fn: () => void, target: HTMLElement): string {
  const _id = getId()
  clickFnMap.set(_id, [fn, target])
  return _id
}

export function removeClickAway (id: string): boolean {
  return clickFnMap.delete(id)
}

if (!registered) {
  registered = true
  document.addEventListener('click', function (e) {
    clickFnMap.size && clickFnMap.forEach(it => !it[1]?.contains(e.target) && it[0]?.(e))
  })
}
