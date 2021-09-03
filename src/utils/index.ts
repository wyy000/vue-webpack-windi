import {isEmptyObject} from "@/utils/atom";

export * from './atom'
export * from './date'
export * from './dom'

export function randomColor(): string {
  const str = Array.from({length: 10}).map((it, idx) => String(idx)).concat(['a', 'b', 'c', 'd', 'e', 'f'])
  const range = parseInt((73 + Math.random() * (246 - 73)).toString())
  const arr = ['49', 'f6', str[parseInt(String(range / 16))] + str[parseInt(String(range % 16))]]
  const one = Math.random() < 1 / 3 ? arr.splice(0, 1) : Math.random() < (1 / 2) ? arr.splice(1, 1) : arr.splice(2, 1)
  const two = Math.random() > 1 / 2 ? arr.splice(0, 1) : arr.splice(1, 1)
  return `#${one[0]}${two[0]}${arr[0]}`
}

export function serialize (params: {[key: string]: any}): string {
  return isEmptyObject(params) ? '' : `?${Object.entries(params).map(it => `${it[0]}=${it[1]}`).join('&')}`
}
